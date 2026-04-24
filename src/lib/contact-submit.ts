import { createClient } from "@libsql/client";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

const MAX_DAILY_REQUESTS = 5;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(2000),
  deviceKey: z.string().trim().min(12).max(128).optional(),
});

type ContactInput = z.infer<typeof contactSchema>;

const dbUrl = process.env.TURSO_DATABASE_URL;
const dbToken = process.env.TURSO_AUTH_TOKEN;

function getDbClient() {
  if (!dbUrl || !dbToken) {
    throw new Error("Contact service is not configured");
  }

  return createClient({
    url: dbUrl,
    authToken: dbToken,
  });
}

function getRequestDay(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function hashIdentity(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash +=
      (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return `rq_${(hash >>> 0).toString(16)}`;
}

function resolveRequesterIdentity(input: ContactInput) {
  const ip =
    getRequestIP({ xForwardedFor: true }) ??
    getRequestHeader("cf-connecting-ip") ??
    getRequestHeader("x-real-ip");
  const ua = getRequestHeader("user-agent") ?? "na";
  const email = input.email.trim().toLowerCase();
  const device = input.deviceKey?.trim();

  if (ip) {
    return {
      requesterKey: hashIdentity(`ip:${ip}|ua:${ua}`),
      limiterSource: "ip" as const,
    };
  }

  if (device) {
    return {
      requesterKey: hashIdentity(`device:${device}|ua:${ua}`),
      limiterSource: "device" as const,
    };
  }

  return {
    requesterKey: hashIdentity(`email:${email}|ua:${ua}`),
    limiterSource: "email_fallback" as const,
  };
}

async function ensureSchema(client: ReturnType<typeof createClient>) {
  await client.batch(
    [
      `CREATE TABLE IF NOT EXISTS daily_limits (
        requester_key TEXT NOT NULL,
        request_day TEXT NOT NULL,
        request_count INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (requester_key, request_day)
      )`,
      `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        requester_key TEXT NOT NULL,
        limiter_source TEXT NOT NULL,
        request_day TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE INDEX IF NOT EXISTS idx_contacts_day_key
        ON contacts (request_day, requester_key)`,
    ],
    "write",
  );

  const contactsInfo = await client.execute("PRAGMA table_info(contacts)");
  const hasLimiterSource = contactsInfo.rows.some(
    (row) => row.name === "limiter_source",
  );

  if (!hasLimiterSource) {
    await client.execute(
      "ALTER TABLE contacts ADD COLUMN limiter_source TEXT NOT NULL DEFAULT 'email_fallback'",
    );
  }
}

async function storeContact(input: ContactInput) {
  let client: ReturnType<typeof createClient> | undefined;
  const { requesterKey, limiterSource } = resolveRequesterIdentity(input);
  const requestDay = getRequestDay();

  try {
    client = getDbClient();
    // await ensureSchema(client);

    const countResult = await client.execute({
      sql: `SELECT request_count
            FROM daily_limits
            WHERE requester_key = ? AND request_day = ?`,
      args: [requesterKey, requestDay],
    });

    const currentCount = Number(countResult.rows[0]?.request_count ?? 0);

    if (currentCount >= MAX_DAILY_REQUESTS) {
      return {
        ok: false as const,
        code: "DAILY_LIMIT_REACHED" as const,
        message: "Daily limit reached. You can only submit 5 requests per day.",
      };
    }

    await client.execute({
      sql: `INSERT INTO daily_limits (requester_key, request_day, request_count)
            VALUES (?, ?, 1)
            ON CONFLICT(requester_key, request_day)
            DO UPDATE SET request_count = ?`,
      args: [requesterKey, requestDay, currentCount + 1],
    });

    await client.execute({
      sql: `INSERT INTO contacts (name, email, message, requester_key, limiter_source, request_day)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        input.name,
        input.email,
        input.message,
        requesterKey,
        limiterSource,
        requestDay,
      ],
    });

    return { ok: true as const };
  } catch (error) {
    console.error("Failed to submit contact", error);
    return {
      ok: false as const,
      code: "SUBMIT_FAILED" as const,
      message: "We could not save your request right now. Please try again.",
    };
  } finally {
    client?.close();
  }
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    return storeContact(data);
  });
