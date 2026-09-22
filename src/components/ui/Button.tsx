import Link from "next/link";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-espresso text-ivory hover:bg-gold hover:text-espresso shadow-[0_8px_30px_-10px_rgba(55,38,32,0.5)]",
  secondary:
    "bg-transparent text-espresso border border-espresso/30 hover:border-gold hover:text-gold",
  ghost: "bg-white/10 text-ivory border border-ivory/40 hover:bg-ivory hover:text-espresso",
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
  target,
  rel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={clsx(base, variants[variant], className)}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
