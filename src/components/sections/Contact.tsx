import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StaggeredText } from "../StaggeredText";

type Status = "idle" | "submitting" | "success";
type FieldName = "name" | "email" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: FieldName, value: string): string | undefined {
  const v = value.trim();
  switch (name) {
    case "name":
      if (!v) return "Name is required";
      if (v.length < 2) return "Name must be at least 2 characters";
      if (v.length > 100) return "Keep it under 100 characters";
      return;
    case "email":
      if (!v) return "Email is required";
      if (!EMAIL_RE.test(v)) return "Enter a valid email (e.g. you@domain.com)";
      if (v.length > 255) return "Email is too long";
      return;
    case "message":
      if (!v) return "Please describe the problem";
      if (v.trim().length < 10) return "Add at least 10 characters of context";
      if (v.length > 2000) return "Max 2000 characters";
      return;
  }
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const errors = useMemo(
    () => ({
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      message: validateField("message", form.message),
    }),
    [form],
  );

  const isValid =
    !errors.name && !errors.email && !errors.message;

  function update(field: FieldName, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function markTouched(field: FieldName) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;
    setStatus("submitting");
    setSubmittedEmail(form.email.trim());
    setSubmittedName(form.name.trim());
    // Simulated submission — no backend wired
    setTimeout(() => setStatus("success"), 800);
  }

  function reset() {
    setForm({ name: "", email: "", message: "" });
    setTouched({ name: false, email: false, message: false });
    setStatus("idle");
  }

  return (
    <section
      id="contact"
      data-section="contact"
      className="section relative flex min-h-screen w-full items-center py-24"
    >
      <div className="grid-12 w-full px-8">
        <div className="col-span-1">
          <div className="font-mono-label text-muted-foreground">04 / Signal</div>
        </div>
        <div className="col-span-10 col-start-2">
          <StaggeredText
            as="h2"
            text="Describe the problem."
            className="font-display text-[clamp(2.5rem,8vw,9rem)] text-foreground leading-[0.95]"
          />
          <StaggeredText
            as="h2"
            text="We answer in signal."
            className="font-display text-[clamp(2.5rem,8vw,9rem)] text-foreground/30 italic leading-[0.95]"
            delay={0.15}
          />
        </div>

        <div className="col-span-10 col-start-2 mt-20">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <SuccessCard
                key="success"
                email={submittedEmail}
                name={submittedName}
                onReset={reset}
              />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 gap-10 md:grid-cols-2"
                noValidate
              >
                <Field
                  label="Name"
                  index="01"
                  error={touched.name ? errors.name : undefined}
                  valid={touched.name && !errors.name}
                  hint="How should we address you?"
                  input={
                    <input
                      type="text"
                      value={form.name}
                      maxLength={100}
                      onChange={(e) => update("name", e.target.value)}
                      onBlur={() => markTouched("name")}
                      aria-invalid={touched.name && !!errors.name}
                      className={inputClass(touched.name, errors.name)}
                      placeholder="Your name"
                    />
                  }
                />
                <Field
                  label="Email"
                  index="02"
                  error={touched.email ? errors.email : undefined}
                  valid={touched.email && !errors.email}
                  hint="We will reply here."
                  input={
                    <input
                      type="email"
                      value={form.email}
                      maxLength={255}
                      onChange={(e) => update("email", e.target.value)}
                      onBlur={() => markTouched("email")}
                      aria-invalid={touched.email && !!errors.email}
                      className={inputClass(touched.email, errors.email)}
                      placeholder="you@domain.com"
                    />
                  }
                />
                <div className="md:col-span-2">
                  <Field
                    label="Describe the problem"
                    index="03"
                    error={touched.message ? errors.message : undefined}
                    valid={touched.message && !errors.message}
                    hint="What needs to be built, fixed, or rearchitected?"
                    input={
                      <textarea
                        value={form.message}
                        maxLength={2000}
                        rows={5}
                        onChange={(e) => update("message", e.target.value)}
                        onBlur={() => markTouched("message")}
                        aria-invalid={touched.message && !!errors.message}
                        className={`${inputClass(touched.message, errors.message)} resize-none font-light text-lg`}
                        placeholder="Context, constraints, deadlines…"
                      />
                    }
                  />
                  <div className="mt-2 flex justify-between font-mono-label text-foreground/40">
                    <span>min 10 characters</span>
                    <span>{form.message.length} / 2000</span>
                  </div>
                </div>

                <div className="md:col-span-2 mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <p className="font-mono-label text-foreground/40 max-w-md">
                    By transmitting, you accept that we may reply to the contact methods above.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative inline-flex items-center gap-3 border border-brand px-8 py-4 font-mono-label text-brand transition-colors hover:bg-brand hover:text-brand-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "submitting" ? "Transmitting…" : "Transmit signal"}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function inputClass(touched: boolean, error: string | undefined) {
  const base =
    "w-full border-b bg-transparent py-3 font-display text-2xl text-foreground placeholder:text-foreground/30 focus:outline-none transition-colors";
  if (touched && error) return `${base} border-destructive focus:border-destructive`;
  if (touched && !error) return `${base} border-brand/60 focus:border-brand`;
  return `${base} border-foreground/20 focus:border-brand`;
}

function Field({
  label,
  index,
  error,
  valid,
  hint,
  input,
}: {
  label: string;
  index: string;
  error?: string;
  valid?: boolean;
  hint?: string;
  input: ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono-label text-muted-foreground">
          {index} / {label}
        </span>
        {valid && !error && (
          <span className="font-mono-label text-brand">✓ ok</span>
        )}
      </div>
      {input}
      <div className="mt-2 min-h-[1.25rem]">
        <AnimatePresence mode="wait" initial={false}>
          {error ? (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="font-mono-label text-destructive"
              role="alert"
            >
              ⚠ {error}
            </motion.p>
          ) : hint ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="font-mono-label text-foreground/40"
            >
              {hint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </label>
  );
}

function SuccessCard({
  email,
  name,
  onReset,
}: {
  email: string;
  name: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden border border-brand/40 bg-brand/5 px-10 py-14"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 h-px w-full origin-left bg-brand"
      />

      <div className="font-mono-label mb-6 flex items-center gap-3 text-brand">
        <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-brand" />
        // transmission received
      </div>

      <h3 className="font-display text-5xl text-foreground leading-[1.05] mb-6">
        Signal locked{name ? `, ${name}` : ""}.
      </h3>

      <p className="font-light text-lg text-foreground/70 max-w-2xl mb-10">
        Your transmission has been logged. Expect a reply within{" "}
        <span className="text-foreground">48 hours</span> at:
      </p>

      <div className="mb-10 inline-flex flex-col gap-2 border-l-2 border-brand pl-6">
        <span className="font-mono-label text-foreground/40">Reply channel</span>
        <span className="font-display text-2xl text-brand break-all">{email}</span>
      </div>

      <div className="grid grid-cols-2 gap-6 border-t border-foreground/10 pt-8 max-w-md mb-10">
        <div>
          <div className="font-mono-label text-foreground/40 mb-1">Status</div>
          <div className="font-display text-foreground">Queued</div>
        </div>
        <div>
          <div className="font-mono-label text-foreground/40 mb-1">Response window</div>
          <div className="font-display text-foreground">≤ 48h</div>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono-label text-foreground/70 transition-colors hover:border-brand hover:text-brand"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        Send another transmission
      </button>
    </motion.div>
  );
}
