import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { unsplash } from "@/lib/unsplash";
import type { Dictionary } from "@/lib/dictionaries";

export function About({ dict }: { dict: Dictionary }) {
  const t = dict.about;

  return (
    <section id="a-propos" className="bg-cream py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-30px_rgba(55,38,32,0.5)]">
            <Image
              src={unsplash("1700760934268-8aa0ef52ce0a", 1000)}
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {t.eyebrow}
            </span>
            <h2 className="gold-rule font-display text-balance text-4xl leading-tight text-espresso sm:text-5xl">
              {t.title}
            </h2>
            <p className="max-w-xl text-espresso-soft">{t.paragraph}</p>
          </Reveal>

          <div className="flex flex-col gap-5">
            {t.highlights.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.1}
                className="rounded-2xl border border-espresso/8 bg-ivory p-6"
              >
                <h3 className="font-display text-xl text-espresso">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso-soft">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
