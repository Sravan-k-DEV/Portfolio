import Image from "next/image";
import { heroContent } from "@/config/site";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section
      id="home"
      className="pb-8 pt-24 md:pb-10 md:pt-28"
    >
      <Container>
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          <div className="animate-fade-up flex flex-col gap-5 md:gap-6">
            <span className="text-eyebrow">{heroContent.eyebrow}</span>
            <h1 className="font-serif text-4xl font-semibold leading-[1.1] md:text-[2.75rem] lg:text-5xl">
              {heroContent.headline}
            </h1>
            <p className="max-w-[52ch] text-base leading-relaxed text-foreground/70">
              {heroContent.body}
            </p>
            <div className="flex flex-nowrap items-start gap-4 border-t border-border pt-5 sm:gap-6">
              {heroContent.stats.map((stat) => (
                <div key={stat.label} className="min-w-0 flex-1">
                  <p className="font-serif text-xl font-semibold text-primary sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="text-[11px] leading-snug text-foreground/60 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait: 1:1 square — matches source photo */}
          <div className="animate-fade-in relative mx-auto aspect-square w-full max-w-[22rem] overflow-hidden rounded-2xl border border-border shadow-sm lg:max-w-md">
            <Image
              src={heroContent.portrait.src}
              alt={heroContent.portrait.alt}
              fill
              priority
              quality={95}
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 560px"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
