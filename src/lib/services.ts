import { serviceCategoriesBase } from "@/data/services";
import type { ServiceCategory } from "@/lib/types";
import type { Dictionary } from "@/lib/dictionaries";

export function getLocalizedServiceCategories(dict: Dictionary): ServiceCategory[] {
  return serviceCategoriesBase.map((base, i) => {
    const text = dict.services.categories[i];
    return {
      slug: base.slug,
      image: base.image,
      title: text.title,
      tagline: text.tagline,
      imageAlt: text.imageAlt,
      items: text.items.map((name) => ({ name })),
    };
  });
}
