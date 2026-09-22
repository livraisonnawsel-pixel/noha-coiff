"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getNavLinks } from "@/components/layout/navLinks";
import { LinkButton } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type { Dictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import clsx from "clsx";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navLinks = getNavLinks(locale, dict);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(55,38,32,0.08)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link href={href(locale, "#accueil")} className="font-display text-2xl tracking-[0.1em] text-espresso">
          NOHA <span className="text-gold">COIFF</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.2em] text-espresso-soft transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher locale={locale} />
          <LinkButton href={href(locale, "/reservation")} className="px-6 py-2.5 text-xs">
            {dict.nav.reserver}
          </LinkButton>
        </div>

        <button
          type="button"
          aria-label={open ? dict.nav.fermerMenu : dict.nav.ouvrirMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 text-espresso lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-espresso/10 bg-ivory lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3.5 text-base font-medium text-espresso transition-colors hover:bg-sand/60"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={href(locale, "/reservation")}
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-espresso px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-ivory"
              >
                {dict.nav.reservation}
              </Link>
              <div className="mt-4 flex justify-center">
                <LanguageSwitcher locale={locale} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
