import { unsplash } from "@/lib/unsplash";
import type { ServiceCategoryBase } from "@/lib/types";

/**
 * Structure des catégories de prestations NOHA COIFF (slug + visuel).
 * Les titres, taglines et intitulés de prestations sont fournis par
 * chaque dictionnaire de langue (src/lib/dictionaries) dans le même ordre.
 */
export const serviceCategoriesBase: ServiceCategoryBase[] = [
  { slug: "coupe-coiffage", image: unsplash("1634449571010-02389ed0f9b0") },
  { slug: "coloration", image: unsplash("1617391654484-2894196c2cc9") },
  { slug: "coiffure-evenementielle", image: unsplash("1603792184332-ad08fe241cb0") },
  { slug: "tresses", image: unsplash("1572954889228-2b12a55144d1") },
  { slug: "soins", image: unsplash("1613754773306-532ec48b0de5") },
];
