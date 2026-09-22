import type { Dictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";

export function getNavLinks(locale: Locale, dict: Dictionary) {
  return [
    { href: href(locale, "#accueil"), label: dict.nav.accueil },
    { href: href(locale, "#prestations"), label: dict.nav.prestations },
    { href: href(locale, "#a-propos"), label: dict.nav.apropos },
    { href: href(locale, "#faq"), label: dict.nav.faq },
    { href: href(locale, "#contact"), label: dict.nav.contact },
  ];
}
