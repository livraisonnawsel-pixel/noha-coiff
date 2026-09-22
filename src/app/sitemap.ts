import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const siteUrl = "https://noha-coiff.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/reservation", "/mentions-legales", "/politique-de-confidentialite"];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
    })),
  );
}
