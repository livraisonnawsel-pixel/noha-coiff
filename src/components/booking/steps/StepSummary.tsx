import type { ReactNode } from "react";
import { format, parseISO } from "date-fns";
import { CalendarDays, Clock, MapPin, Scissors, User } from "lucide-react";
import type { BookingFormData } from "@/lib/booking";
import { getDateFnsLocale } from "@/lib/booking";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Scissors;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-espresso/8 py-4 last:border-none">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush/50 text-espresso">
        <Icon size={17} />
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso-soft">
          {label}
        </span>
        <span className="text-sm text-espresso">{value}</span>
      </div>
    </div>
  );
}

export function StepSummary({
  data,
  locale,
  dict,
}: {
  data: BookingFormData;
  locale: Locale;
  dict: Dictionary["booking"]["stepSummary"];
}) {
  const dateFnsLocale = getDateFnsLocale(locale);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl text-espresso sm:text-3xl">{dict.heading}</h3>
        <p className="text-sm text-espresso-soft">{dict.subheading}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-3xl border border-espresso/10 bg-ivory px-6 shadow-[0_20px_50px_-35px_rgba(55,38,32,0.6)] sm:px-8">
        <Row icon={Scissors} label={dict.service} value={data.service} />
        <Row
          icon={CalendarDays}
          label={dict.date}
          value={
            data.date
              ? format(parseISO(data.date), "EEEE d MMMM yyyy", { locale: dateFnsLocale })
              : ""
          }
        />
        <Row icon={Clock} label={dict.time} value={<span dir="ltr">{data.time}</span>} />
        <Row icon={MapPin} label={dict.address} value={`${data.address}, ${data.city}`} />
        <Row
          icon={User}
          label={dict.client}
          value={
            <>
              {data.firstName} {data.lastName} —{" "}
              <span dir="ltr">{data.phone}</span> — <span dir="ltr">{data.email}</span>
            </>
          }
        />
      </div>

      {data.notes && (
        <p className="mx-auto w-full max-w-xl text-sm text-espresso-soft">
          <span className="font-semibold text-espresso">{dict.notesLabel}</span>
          {data.notes}
        </p>
      )}
    </div>
  );
}
