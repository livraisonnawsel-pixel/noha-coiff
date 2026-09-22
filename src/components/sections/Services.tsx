import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { getLocalizedServiceCategories } from "@/lib/services";
import { href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.services;
  const categories = getLocalizedServiceCategories(dict);

  return (
    <section id="prestations" className="bg-ivory py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="flex flex-col gap-14">
          {categories.map((category, index) => (
            <Reveal
              key={category.slug}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(55,38,32,0.5)]">
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-3xl text-espresso sm:text-4xl">
                    {category.title}
                  </h3>
                  <p className="text-espresso-soft">{category.tagline}</p>
                </div>

                <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-3 text-sm text-espresso"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush/60 text-espresso">
                        <Check size={13} />
                      </span>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center pt-4">
          <LinkButton href={href(locale, "/reservation")}>{t.cta}</LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
