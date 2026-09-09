import { ArrowUpRight } from "lucide-react";
import {
  certificates,
  certificatesSection,
} from "@/content/certificates";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Certificates() {
  return (
    <Section id="certificates">
      <SectionHeading
        eyebrow={certificatesSection.eyebrow}
        title={certificatesSection.heading}
        subtitle={certificatesSection.subheading}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((cert) => (
          <a
            key={cert.slug}
            href={cert.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-0.5"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-primary">
              {cert.issuer} · {cert.year}
            </p>
            <h3 className="mt-3 font-serif text-xl font-semibold leading-snug">
              {cert.title}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">{cert.summary}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              {certificatesSection.viewCredentialLabel}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
