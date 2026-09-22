import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getNavLinks } from "@/components/layout/navLinks";
import { CONTACT } from "@/lib/contact";
import { href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const navLinks = getNavLinks(locale, dict);
  const legalLinks = [
    { href: href(locale, "/mentions-legales"), label: dict.footer.mentionsLegales },
    {
      href: href(locale, "/politique-de-confidentialite"),
      label: dict.footer.politiqueConfidentialite,
    },
  ];

  return (
    <footer className="border-t border-espresso/10 bg-espresso text-ivory">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-2">
          <span className="font-display text-2xl tracking-[0.1em]">
            NOHA <span className="text-gold-light">COIFF</span>
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-ivory/70">{dict.footer.brandBlurb}</p>

          <ul className="flex flex-col gap-2.5 text-sm text-ivory/75">
            <li>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-gold-light"
              >
                <Phone size={15} className="text-gold-light" />
                <span dir="ltr">{CONTACT.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold-light"
              >
                <MessageCircle size={15} className="text-gold-light" />
                <span dir="ltr">{CONTACT.whatsappDisplay}</span>
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-gold-light" />
              {dict.location}
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">
            {dict.footer.navHeading}
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-ivory/75">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={href(locale, "/reservation")}
                className="transition-colors hover:text-gold-light"
              >
                {dict.nav.reservation}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">
            {dict.footer.infoHeading}
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-ivory/75">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-ivory/10">
        <Container className="flex flex-col items-center gap-2 py-6 text-xs text-ivory/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {dict.footer.copyrightSuffix}
          </p>
          <p>{dict.footer.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
