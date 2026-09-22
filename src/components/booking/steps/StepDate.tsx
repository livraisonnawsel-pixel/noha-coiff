"use client";

import { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import type { BookingFormData } from "@/lib/booking";
import { getDateFnsLocale } from "@/lib/booking";
import type { Dictionary } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n";

export function StepDate({
  data,
  onChange,
  locale,
  dict,
}: {
  data: BookingFormData;
  onChange: (patch: Partial<BookingFormData>) => void;
  locale: Locale;
  dict: Dictionary["booking"]["stepDate"];
}) {
  const dateFnsLocale = getDateFnsLocale(locale);
  const rtl = locale === "ar";
  const today = startOfDay(new Date());
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today));

  const monthStart = startOfMonth(visibleMonth);
  const monthEnd = endOfMonth(visibleMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const leadingBlanks = (getDay(monthStart) + 6) % 7; // lundi = 0

  const selectedDate = data.date ? startOfDay(parseISO(data.date)) : null;
  const isCurrentMonth = isSameMonth(visibleMonth, today);

  const PrevIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl text-espresso sm:text-3xl">{dict.heading}</h3>
        <p className="text-sm text-espresso-soft">{dict.subheading}</p>
      </div>

      <div className="mx-auto w-full max-w-md rounded-3xl border border-espresso/10 bg-ivory p-6 shadow-[0_20px_50px_-35px_rgba(55,38,32,0.6)]">
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            aria-label={dict.prevMonth}
            disabled={isCurrentMonth}
            onClick={() => setVisibleMonth((m) => addMonths(m, -1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
          >
            <PrevIcon size={16} />
          </button>
          <span className="font-display text-lg capitalize text-espresso">
            {format(visibleMonth, "MMMM yyyy", { locale: dateFnsLocale })}
          </span>
          <button
            type="button"
            aria-label={dict.nextMonth}
            onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-colors hover:border-gold hover:text-gold"
          >
            <NextIcon size={16} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-espresso-soft">
          {dict.weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1">
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {days.map((day) => {
            const disabled = isBefore(day, today);
            const selected = selectedDate ? isSameDay(day, selectedDate) : false;
            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={disabled}
                onClick={() => onChange({ date: format(day, "yyyy-MM-dd") })}
                className={clsx(
                  "flex aspect-square items-center justify-center rounded-full text-sm transition-all duration-200",
                  disabled && "cursor-not-allowed text-espresso/20",
                  !disabled && !selected && "text-espresso hover:bg-blush/40",
                  selected && "bg-espresso text-ivory shadow-md",
                )}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>

      {data.date && (
        <p className="text-center text-sm text-espresso-soft">
          {dict.selectedDatePrefix}{" "}
          <span className="font-semibold text-espresso">
            {format(parseISO(data.date), "EEEE d MMMM yyyy", { locale: dateFnsLocale })}
          </span>
        </p>
      )}
    </div>
  );
}
