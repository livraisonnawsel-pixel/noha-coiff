"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { locales, localeLabels, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({
  locale,
  light,
  className,
}: {
  locale: Locale;
  light?: boolean;
  className?: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border p-1 text-[11px] font-semibold",
        light ? "border-ivory/25" : "border-espresso/15",
        className,
      )}
    >
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ""}`}
          className={clsx(
            "rounded-full px-3 py-1.5 transition-colors",
            l === locale
              ? light
                ? "bg-ivory text-espresso"
                : "bg-espresso text-ivory"
              : light
                ? "text-ivory/70 hover:text-ivory"
                : "text-espresso-soft hover:text-espresso",
          )}
        >
          {localeLabels[l]}
        </Link>
      ))}
    </div>
  );
}
