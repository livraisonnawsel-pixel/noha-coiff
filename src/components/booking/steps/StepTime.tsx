import clsx from "clsx";
import { format, parseISO } from "date-fns";
import { timeSlots, getDateFnsLocale, type BookingFormData } from "@/lib/booking";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export function StepTime({
  data,
  onChange,
  locale,
  dict,
}: {
  data: BookingFormData;
  onChange: (patch: Partial<BookingFormData>) => void;
  locale: Locale;
  dict: Dictionary["booking"]["stepTime"];
}) {
  const dateFnsLocale = getDateFnsLocale(locale);
  const subheading = data.date
    ? dict.subheadingWithDate.replace(
        "{date}",
        format(parseISO(data.date), "EEEE d MMMM", { locale: dateFnsLocale }),
      )
    : dict.subheadingNoDate;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl text-espresso sm:text-3xl">{dict.heading}</h3>
        <p className="text-sm text-espresso-soft">{subheading}</p>
      </div>

      <div className="mx-auto grid w-full max-w-2xl grid-cols-3 gap-3 sm:grid-cols-4">
        {timeSlots.map((slot) => {
          const selected = data.time === slot;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => onChange({ time: slot })}
              className={clsx(
                "rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200",
                selected
                  ? "border-gold bg-espresso text-ivory shadow-md"
                  : "border-espresso/12 bg-ivory text-espresso hover:border-gold hover:text-gold",
              )}
            >
              {slot}
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs italic text-espresso-soft">{dict.note}</p>
    </div>
  );
}
