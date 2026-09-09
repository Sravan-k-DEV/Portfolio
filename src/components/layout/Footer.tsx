import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer text-footer-foreground">
      <Container className="flex flex-col items-center py-5 text-center">
        <p className="font-serif text-lg font-semibold leading-tight">
          {siteConfig.shortName}
        </p>
        <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-mist">
          {siteConfig.title}
        </p>
      </Container>
      <Container className="border-t border-white/10 py-2.5">
        <p className="text-center text-xs text-mist">
          © {year} {siteConfig.shortName}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
