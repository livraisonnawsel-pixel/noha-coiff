import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { getDictionary } from "@/lib/dictionaries";
import { locales, isValidLocale, dirOf, type Locale } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://noha-coiff.netlify.app";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.titleDefault,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      url: `${siteUrl}/${locale}`,
      siteName: "NOHA COIFF",
      locale: locale === "ar" ? "ar_MA" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        fr: `${siteUrl}/fr`,
        ar: `${siteUrl}/ar`,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const dir = dirOf(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "NOHA COIFF",
    description: dict.jsonLd.description,
    telephone: "+212664161957",
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.city,
      addressCountry: "MA",
    },
    areaServed: CONTACT.city,
    priceRange: "",
    makesOffer: dict.jsonLd.makesOffer,
  };

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <FloatingWhatsApp ariaLabel={dict.whatsappFloating.ariaLabel} />
      </body>
    </html>
  );
}
