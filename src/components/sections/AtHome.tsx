import Image from "next/image";
import { Clock, Heart, MapPin, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { unsplash } from "@/lib/unsplash";
import { href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [Clock, Heart, Sparkles];

export function AtHome({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.athome;

  return (
    <section className="bg-ivory py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-30px_rgba(55,38,32,0.5)]">
            <Image
              src={unsplash("1712641966810-611ff1503c6d", 1200)}
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <Reveal className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {t.eyebrow}
            </span>
            <h2 className="gold-rule font-display text-balance text-4xl leading-tight text-espresso sm:text-5xl">
              {t.title}
            </h2>
            <p className="max-w-xl text-espresso-soft">{t.paragraph}</p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-3">
            {t.advantages.map((item, i) => {
              const Icon = icons[i];
              return (
                <Reveal
                  key={item.title}
                  delay={i * 0.1}
                  className="flex flex-col gap-3 rounded-2xl border border-espresso/8 bg-cream p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-ivory">
                    <Icon size={17} />
                  </span>
                  <h3 className="text-sm font-semibold text-espresso">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-espresso-soft">
                    {item.description}
                  </p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="flex flex-col gap-3 rounded-2xl border border-dashed border-gold/40 bg-blush/20 p-6">
            <span className="flex items-center gap-2 text-sm font-semibold text-espresso">
              <MapPin size={16} className="text-gold" />
              {t.zonesLabel}
            </span>
            {t.zones.length > 0 ? (
              <ul className="flex flex-wrap gap-2 text-sm text-espresso-soft">
                {t.zones.map((zone) => (
                  <li
                    key={zone}
                    className="rounded-full bg-ivory px-3 py-1 border border-espresso/10"
                  >
                    {zone}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-espresso-soft">{t.zonesEmpty}</p>
            )}
          </Reveal>

          <Reveal>
            <LinkButton href={href(locale, "/reservation")} variant="secondary">
              {t.cta}
            </LinkButton>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
