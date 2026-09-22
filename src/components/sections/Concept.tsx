import { CalendarCheck, Home, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [Sparkles, CalendarCheck, Home];

export function Concept({ dict }: { dict: Dictionary }) {
  const t = dict.concept;
  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />

        <div className="grid gap-8 sm:grid-cols-3">
          {t.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                key={step.number}
                delay={i * 0.12}
                className="group relative flex flex-col items-center gap-5 rounded-3xl border border-espresso/8 bg-ivory px-8 py-12 text-center shadow-[0_20px_50px_-35px_rgba(55,38,32,0.6)] transition-transform duration-500 hover:-translate-y-2"
              >
                <span className="font-display text-6xl text-sand transition-colors duration-500 group-hover:text-gold-light">
                  {step.number}
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-ivory">
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-2xl text-espresso">{step.title}</h3>
                <p className="text-sm leading-relaxed text-espresso-soft">
                  {step.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
