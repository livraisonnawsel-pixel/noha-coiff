import { Check } from "lucide-react";
import clsx from "clsx";

export function StepProgress({ current, steps }: { current: number; steps: readonly string[] }) {
  return (
    <ol className="flex w-full items-center justify-between gap-2">
      {steps.map((label, index) => {
        const isDone = index < current;
        const isActive = index === current;
        return (
          <li key={label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-center">
              {index > 0 && (
                <span
                  className={clsx(
                    "h-px flex-1",
                    isDone || isActive ? "bg-gold" : "bg-espresso/15",
                  )}
                />
              )}
              <span
                className={clsx(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  isDone
                    ? "border-gold bg-gold text-espresso"
                    : isActive
                      ? "border-espresso bg-espresso text-ivory"
                      : "border-espresso/20 bg-transparent text-espresso-soft",
                )}
              >
                {isDone ? <Check size={14} /> : index + 1}
              </span>
              {index < steps.length - 1 && (
                <span
                  className={clsx(
                    "h-px flex-1",
                    isDone ? "bg-gold" : "bg-espresso/15",
                  )}
                />
              )}
            </div>
            <span
              className={clsx(
                "hidden text-center text-[11px] font-medium uppercase tracking-[0.1em] sm:block",
                isActive ? "text-espresso" : "text-espresso-soft",
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
