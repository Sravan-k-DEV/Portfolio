"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validateFields(payload: {
  name: string;
  email: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!payload.name.trim()) {
    errors.name = "Name is mandatory";
  }
  if (!payload.email.trim()) {
    errors.email = "Email is mandatory";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    errors.email = "Enter a valid email address";
  }
  if (!payload.message.trim()) {
    errors.message = "Message is mandatory";
  }

  return errors;
}

export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus("idle");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const errors = validateFields(payload);
    setFieldErrors(errors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(errors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setFieldErrors({});
      setTouched({});
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  function onBlurField(name: keyof FieldErrors, value: string) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => {
      const updated = { ...prev };
      if (name === "name") {
        updated.name = !value.trim() ? "Name is mandatory" : undefined;
      }
      if (name === "email") {
        if (!value.trim()) updated.email = "Email is mandatory";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          updated.email = "Enter a valid email address";
        else updated.email = undefined;
      }
      if (name === "message") {
        updated.message = !value.trim() ? "Message is mandatory" : undefined;
      }
      return updated;
    });
  }

  const linkedin = socialLinks.find((l) => l.label === "LinkedIn");
  const github = socialLinks.find((l) => l.label === "GitHub");
  const medium = socialLinks.find((l) => l.label === "Medium");

  return (
    <Section id="contact">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Get In Touch"
            title="Contact"
            subtitle="Building something interesting? Let us talk."
            className="mb-6"
          />
          <p className="max-w-md text-foreground/70">
            Open to AI/ML roles and freelance projects that are a good fit.
            I usually reply within a day.
          </p>
          <div className="mt-8 space-y-5">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-sm text-foreground hover:text-primary"
            >
              <Mail className="size-4 text-primary" />
              {siteConfig.email}
            </a>

            <div className="flex items-center gap-3">
              {linkedin ? (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-sage hover:text-primary"
                >
                  <LinkedInIcon className="size-4" />
                </a>
              ) : null}
              {medium ? (
                <a
                  href={medium.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Medium"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-sage hover:text-primary"
                >
                  <MediumIcon className="size-4" />
                </a>
              ) : null}
              {github ? (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-sage hover:text-primary"
                >
                  <GitHubIcon className="size-4" />
                </a>
              ) : null}
            </div>

            <a
              href={siteConfig.resumePath}
              download
              className="inline-flex h-10 items-center rounded-lg border border-sage px-6 text-sm"
            >
              Download Resume
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 lg:pt-1" noValidate>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm">
              Name <span className="text-red-600">*</span>
            </label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              aria-invalid={Boolean(touched.name && fieldErrors.name)}
              aria-describedby={
                touched.name && fieldErrors.name ? "name-error" : undefined
              }
              className={cn(
                touched.name &&
                  fieldErrors.name &&
                  "border-red-600 focus-visible:ring-red-600",
              )}
              onBlur={(e) => onBlurField("name", e.target.value)}
              onChange={() => {
                if (fieldErrors.name) {
                  setFieldErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
            />
            {touched.name && fieldErrors.name ? (
              <p id="name-error" className="mt-1.5 text-sm text-red-600" role="alert">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm">
              Email <span className="text-red-600">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(touched.email && fieldErrors.email)}
              aria-describedby={
                touched.email && fieldErrors.email ? "email-error" : undefined
              }
              className={cn(
                touched.email &&
                  fieldErrors.email &&
                  "border-red-600 focus-visible:ring-red-600",
              )}
              onBlur={(e) => onBlurField("email", e.target.value)}
              onChange={() => {
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
            />
            {touched.email && fieldErrors.email ? (
              <p
                id="email-error"
                className="mt-1.5 text-sm text-red-600"
                role="alert"
              >
                {fieldErrors.email}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm">
              Message <span className="text-red-600">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              aria-invalid={Boolean(touched.message && fieldErrors.message)}
              aria-describedby={
                touched.message && fieldErrors.message
                  ? "message-error"
                  : undefined
              }
              className={cn(
                touched.message &&
                  fieldErrors.message &&
                  "border-red-600 focus-visible:ring-red-600",
              )}
              onBlur={(e) => onBlurField("message", e.target.value)}
              onChange={() => {
                if (fieldErrors.message) {
                  setFieldErrors((prev) => ({ ...prev, message: undefined }));
                }
              }}
            />
            {touched.message && fieldErrors.message ? (
              <p
                id="message-error"
                className="mt-1.5 text-sm text-red-600"
                role="alert"
              >
                {fieldErrors.message}
              </p>
            ) : null}
          </div>
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send Message"}
          </Button>
          {status === "success" ? (
            <p className="text-sm text-primary" role="status">
              Message sent. I will get back to you soon.
            </p>
          ) : null}
          {status === "error" && error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </div>
    </Section>
  );
}
