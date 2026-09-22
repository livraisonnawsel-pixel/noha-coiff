import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <Reveal
      className={clsx(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
      )}
    >
      {eyebrow ? (
        <span
          className={clsx(
            "text-xs font-semibold uppercase tracking-[0.3em]",
            light ? "text-gold-light" : "text-gold",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={clsx(
          "gold-rule font-display text-balance text-4xl leading-tight sm:text-5xl",
          light ? "text-ivory" : "text-espresso",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={clsx(
            "max-w-2xl text-balance text-base leading-relaxed sm:text-lg",
            align === "center" ? "mx-auto" : "",
            light ? "text-ivory/80" : "text-espresso-soft",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
