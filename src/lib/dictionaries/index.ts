import type { Locale } from "@/lib/i18n";
import { fr } from "./fr";
import { ar } from "./ar";

export type { Dictionary } from "./fr";

const dictionaries = { fr, ar };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
