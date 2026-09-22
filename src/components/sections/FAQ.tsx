"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/dictionaries";

export function FAQ({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = dict.faq;

  return (
    <section id="faq" className="bg-cream py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {t.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal
                key={item.question}
                delay={index * 0.03}
                className="overflow-hidden rounded-2xl border border-espresso/10 bg-ivory"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left rtl:text-right"
                >
                  <span className="font-display text-lg text-espresso sm:text-xl">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={clsx(
                      "shrink-0 text-gold transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={clsx(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-espresso-soft">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
