import { MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { CONTACT } from "@/lib/contact";
import { href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.contact;

  const contactChannels = [
    {
      icon: Phone,
      label: t.channelPhone,
      value: CONTACT.phoneDisplay,
      href: CONTACT.phoneHref,
      numeric: true,
    },
    {
      icon: MessageCircle,
      label: t.channelWhatsapp,
      value: CONTACT.whatsappDisplay,
      href: CONTACT.whatsappHref,
      external: true,
      numeric: true,
    },
    {
      icon: MapPin,
      label: t.channelLocation,
      value: dict.location,
    },
  ];

  return (
    <section id="contact" className="bg-espresso py-24 text-ivory sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} light />

        <Reveal className="flex flex-col justify-center gap-4 sm:flex-row">
          <LinkButton href={CONTACT.phoneHref}>{t.call}</LinkButton>
          <LinkButton
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            {t.whatsapp}
          </LinkButton>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-3">
          {contactChannels.map((channel, i) => {
            const content = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory/10 text-gold-light">
                  <channel.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory/60">
                  {channel.label}
                </span>
                <span className="text-sm text-ivory/80" dir={channel.numeric ? "ltr" : undefined}>
                  {channel.value}
                </span>
              </>
            );

            const cardClassName =
              "flex flex-col items-center gap-3 rounded-2xl border border-ivory/15 bg-ivory/5 px-5 py-8 text-center transition-colors";

            return (
              <Reveal key={channel.label} delay={i * 0.06}>
                {channel.href ? (
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className={`${cardClassName} hover:border-gold/40 hover:bg-ivory/10`}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={cardClassName}>{content}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="flex justify-center">
          <LinkButton href={href(locale, "/reservation")} variant="ghost">
            {t.cta}
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
