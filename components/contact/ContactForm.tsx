"use client";

import { useState, type FormEvent } from "react";
import { personal } from "@/data/personal";
import { Button } from "@/components/ui/Button";
import { IconCheck, IconLoader, IconSend } from "@/components/icons";

type Status = "idle" | "loading" | "success" | "error";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
  form?: string;
}

const LIMITS = { name: 100, email: 200, message: 2000 };
const mailtoHref = `mailto:${personal.email}`;

function validate(fields: { name: string; email: string; message: string }) {
  const errors: Errors = {};

  if (!fields.name.trim()) errors.name = "Please enter your name.";
  else if (fields.name.trim().length < 2) errors.name = "Name is too short.";
  else if (fields.name.length > LIMITS.name) errors.name = `Max ${LIMITS.name} characters.`;

  if (!fields.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim()))
    errors.email = "Enter a valid email address.";
  else if (fields.email.length > LIMITS.email) errors.email = `Max ${LIMITS.email} characters.`;

  if (!fields.message.trim()) errors.message = "Please enter a message.";
  else if (fields.message.trim().length < 10) errors.message = "Add a little more detail (10+ characters).";
  else if (fields.message.length > LIMITS.message) errors.message = `Max ${LIMITS.message} characters.`;

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const update = (field: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setServerMessage(null);

    if (Object.keys(found).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setServerMessage(
          payload.error ??
            "The message could not be sent right now. Please try again or email me directly.",
        );
        return;
      }

      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setServerMessage("Network error — please email me directly if this keeps happening.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-2xl border border-success/30 bg-success/[0.06] p-8 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-success/40 bg-success/15 text-success">
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl font-semibold">Message sent</h3>
        <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-fg-muted">
          Thanks for reaching out — I’ll get back to you as soon as I can.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const fieldClass = (hasError?: string) =>
    [
      "w-full rounded-xl border bg-ink-deep/60 px-4 py-3 text-[14.5px] text-fg placeholder:text-fg-dim",
      "transition-all duration-300 focus:border-primary/60 focus:bg-ink-deep focus:outline-none focus:ring-2 focus:ring-primary/25",
      hasError ? "border-red-500/60" : "border-line hover:border-line-strong",
    ].join(" ");

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-[13px] font-medium text-fg-muted">
          Name <span className="text-primary-light">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name}
          placeholder="Your name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={fieldClass(errors.name)}
        />
        {errors.name ? (
          <p id="contact-name-error" role="alert" className="mt-1.5 text-[12.5px] text-red-400">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-[13px] font-medium text-fg-muted">
          Email <span className="text-primary-light">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={LIMITS.email}
          placeholder="you@company.com"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={fieldClass(errors.email)}
        />
        {errors.email ? (
          <p id="contact-email-error" role="alert" className="mt-1.5 text-[12.5px] text-red-400">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <div className="mb-1.5 flex items-baseline justify-between">
          <label
            htmlFor="contact-message"
            className="block text-[13px] font-medium text-fg-muted"
          >
            Message <span className="text-primary-light">*</span>
          </label>
          <span className="font-mono text-2xs text-fg-dim">
            {values.message.length}/{LIMITS.message}
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          placeholder="Tell me about the project, timeline or role…"
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${fieldClass(errors.message)} resize-y`}
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="mt-1.5 text-[12.5px] text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      {errors.form || status === "error" ? (
        <div
          role="alert"
          className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13px] leading-relaxed text-red-300"
        >
          {serverMessage ?? errors.form}
          <a href={mailtoHref} className="ml-1 font-semibold underline underline-offset-2">
            Email me directly
          </a>
        </div>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={status === "loading"}
        icon={
          status === "loading" ? (
            <IconLoader className="h-4 w-4" />
          ) : (
            <IconSend className="h-4 w-4" />
          )
        }
        iconPosition="right"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </Button>

      <p className="text-center text-[12px] text-fg-dim">
        Prefer email?{" "}
        <a href={mailtoHref} className="text-primary-light hover:text-white">
          {personal.email}
        </a>
      </p>
    </form>
  );
}
