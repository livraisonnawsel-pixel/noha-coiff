import clsx from "clsx";
import type { BookingFormData, StepClientErrors } from "@/lib/booking";
import type { Dictionary } from "@/lib/dictionaries";

type FieldName = keyof Pick<
  BookingFormData,
  "firstName" | "lastName" | "phone" | "email" | "address" | "city"
>;

export function StepClient({
  data,
  errors,
  onChange,
  dict,
}: {
  data: BookingFormData;
  errors: StepClientErrors;
  onChange: (patch: Partial<BookingFormData>) => void;
  dict: Dictionary["booking"]["stepClient"];
}) {
  const fields: { name: FieldName; label: string; type?: string; full?: boolean }[] = [
    { name: "firstName", label: dict.firstName },
    { name: "lastName", label: dict.lastName },
    { name: "phone", label: dict.phone, type: "tel" },
    { name: "email", label: dict.email, type: "email" },
    { name: "address", label: dict.address, full: true },
    { name: "city", label: dict.city },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl text-espresso sm:text-3xl">{dict.heading}</h3>
        <p className="text-sm text-espresso-soft">{dict.subheading}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={clsx("flex flex-col gap-1.5", field.full && "sm:col-span-2")}
          >
            <label
              htmlFor={field.name}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-espresso-soft"
            >
              {field.label} <span className="text-gold">*</span>
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              value={data[field.name]}
              onChange={(e) => onChange({ [field.name]: e.target.value })}
              className={clsx(
                "rounded-xl border bg-ivory px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-gold",
                errors[field.name] ? "border-red-400" : "border-espresso/15",
              )}
            />
            {errors[field.name] && (
              <span className="text-xs text-red-500">{errors[field.name]}</span>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="notes"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-espresso-soft"
          >
            {dict.notesLabel}
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={data.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder={dict.notesPlaceholder}
            className="resize-none rounded-xl border border-espresso/15 bg-ivory px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-gold"
          />
        </div>
      </div>
    </div>
  );
}
