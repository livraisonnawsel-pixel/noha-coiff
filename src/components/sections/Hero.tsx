import Image from "next/image";
import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { unsplash } from "@/lib/unsplash";
import { CONTACT } from "@/lib/contact";
import { href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.hero;
  return (
    <section id="accueil" className="relative overflow-hidden bg-ivory pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blush/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sand/50 blur-3xl"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col items-start gap-7">
          <Reveal className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-espresso-soft">
            <Sparkles size={14} className="text-gold" />
            {t.badge}
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-balance text-5xl leading-[1.08] text-espresso sm:text-6xl lg:text-[4rem]">
              {t.title}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-xl text-balance text-lg leading-relaxed text-espresso-soft">
              {t.paragraph}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col gap-4 sm:flex-row">
            <LinkButton href={href(locale, "/reservation")}>{t.ctaPrimary}</LinkButton>
            <LinkButton href={href(locale, "#prestations")} variant="secondary">
              {t.ctaSecondary}
            </LinkButton>
          </Reveal>

          <Reveal
            delay={0.35}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-espresso-soft"
          >
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-gold"
            >
              <Phone size={16} className="text-gold" />
              {t.call}
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-gold"
            >
              <MessageCircle size={16} className="text-gold" />
              {t.whatsapp}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-30px_rgba(55,38,32,0.45)] sm:max-w-lg">
            <Image
              src={unsplash("1701976333339-1d41dad8138b", 1200)}
              alt={t.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-gold/20 bg-white/80 px-6 py-4 shadow-lg backdrop-blur sm:block rtl:left-auto rtl:-right-6">
            <p className="font-display text-3xl text-espresso">{t.statNumber}</p>
            <p className="text-xs uppercase tracking-[0.15em] text-espresso-soft">
              {t.statLabel}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
