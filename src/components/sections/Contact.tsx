import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StaggeredText } from "../StaggeredText";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    else if (form.name.trim().length > 100) e.name = "Too long";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Invalid email";
    else if (form.email.length > 255) e.email = "Too long";
    if (form.contact.length > 200) e.contact = "Too long";
    if (!form.message.trim()) e.message = "Required";
    else if (form.message.trim().length > 2000) e.message = "Max 2000 characters";
    return e;
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStatus("submitting");
    // Simulated submission — no backend wired
    setTimeout(() => {
      setStatus("success");
    }, 800);
  }

  function reset() {
    setForm({ name: "", email: "", contact: "", message: "" });
    setErrors({});
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
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="border border-brand/30 bg-brand/5 px-10 py-16"
              >
                <div className="font-mono-label mb-4 text-brand">// transmission received</div>
                <h3 className="font-display text-4xl text-foreground mb-4">
                  We will contact you soon.
                </h3>
                <p className="font-light text-foreground/70 max-w-xl mb-8">
                  Thank you, {form.name || "operator"}. Your signal has been logged. Expect a
                  reply at <span className="text-brand">{form.email}</span> within 48 hours.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="font-mono-label text-foreground/60 transition-colors hover:text-brand"
                >
                  ← Send another transmission
                </button>
              </motion.div>
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
                  error={errors.name}
                  input={
                    <input
                      type="text"
                      value={form.name}
                      maxLength={100}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border-b border-foreground/20 bg-transparent py-3 font-display text-2xl text-foreground placeholder:text-foreground/30 focus:border-brand focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  }
                />
                <Field
                  label="Email"
                  index="02"
                  error={errors.email}
                  input={
                    <input
                      type="email"
                      value={form.email}
                      maxLength={255}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border-b border-foreground/20 bg-transparent py-3 font-display text-2xl text-foreground placeholder:text-foreground/30 focus:border-brand focus:outline-none transition-colors"
                      placeholder="you@domain.com"
                    />
                  }
                />
                <div className="md:col-span-2">
                  <Field
                    label="Other channel (optional)"
                    index="03"
                    error={errors.contact}
                    input={
                      <input
                        type="text"
                        value={form.contact}
                        maxLength={200}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        className="w-full border-b border-foreground/20 bg-transparent py-3 font-display text-2xl text-foreground placeholder:text-foreground/30 focus:border-brand focus:outline-none transition-colors"
                        placeholder="LinkedIn, Telegram, phone…"
                      />
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Field
                    label="Describe the problem"
                    index="04"
                    error={errors.message}
                    input={
                      <textarea
                        value={form.message}
                        maxLength={2000}
                        rows={5}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full resize-none border-b border-foreground/20 bg-transparent py-3 font-light text-lg text-foreground placeholder:text-foreground/30 focus:border-brand focus:outline-none transition-colors"
                        placeholder="What needs to be built, fixed, or rearchitected…"
                      />
                    }
                  />
                  <div className="mt-2 font-mono-label text-foreground/40">
                    {form.message.length} / 2000
                  </div>
                </div>

                <div className="md:col-span-2 mt-6 flex items-center justify-between">
                  <p className="font-mono-label text-foreground/40 max-w-md">
                    By transmitting, you accept that we may reply to the contact methods above.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative inline-flex items-center gap-3 border border-brand px-8 py-4 font-mono-label text-brand transition-colors hover:bg-brand hover:text-brand-foreground disabled:opacity-50"
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

function Field({
  label,
  index,
  error,
  input,
}: {
  label: string;
  index: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono-label text-muted-foreground">
          {index} / {label}
        </span>
        {error && <span className="font-mono-label text-destructive">{error}</span>}
      </div>
      {input}
    </label>
  );
}
