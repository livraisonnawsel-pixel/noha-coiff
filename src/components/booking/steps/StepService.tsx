import clsx from "clsx";
import type { ServiceCategory } from "@/lib/types";
import type { BookingFormData } from "@/lib/booking";
import type { Dictionary } from "@/lib/dictionaries";

export function StepService({
  data,
  onChange,
  categories,
  dict,
}: {
  data: BookingFormData;
  onChange: (patch: Partial<BookingFormData>) => void;
  categories: ServiceCategory[];
  dict: Dictionary["booking"]["stepService"];
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl text-espresso sm:text-3xl">{dict.heading}</h3>
        <p className="text-sm text-espresso-soft">{dict.subheading}</p>
      </div>

      <div className="flex flex-col gap-8">
        {categories.map((category) => (
          <div key={category.slug} className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {category.title}
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {category.items.map((item) => {
                const selected = data.service === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() =>
                      onChange({ service: item.name, category: category.title })
                    }
                    className={clsx(
                      "rounded-2xl border px-5 py-4 text-left rtl:text-right text-sm font-medium transition-all duration-200",
                      selected
                        ? "border-gold bg-blush/30 text-espresso shadow-[0_10px_30px_-15px_rgba(178,138,78,0.6)]"
                        : "border-espresso/12 bg-ivory text-espresso-soft hover:border-gold/50 hover:text-espresso",
                    )}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
