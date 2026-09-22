import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/dictionaries";
import { isValidLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/politique-de-confidentialite">): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return { title: dict.privacy.title };
}

/** Isole les numéros de téléphone (groupes de chiffres) pour éviter leur
 * inversion visuelle lorsqu'ils sont intégrés dans une phrase RTL. */
function withIsolatedNumbers(text: string) {
  const parts = text.split(/(\d{2}(?: \d{2}){2,4})/g);
  return parts.map((part, i) =>
    /^\d{2}( \d{2}){2,4}$/.test(part) ? (
      <span key={i} dir="ltr" className="inline-block">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default async function PolitiqueConfidentialitePage({
  params,
}: PageProps<"/[locale]/politique-de-confidentialite">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale).privacy;

  return (
    <section className="bg-ivory py-32 sm:py-40">
      <Container className="mx-auto flex max-w-3xl flex-col gap-10">
        <h1 className="font-display text-4xl text-espresso">{t.title}</h1>

        <div className="flex flex-col gap-8">
          {t.sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <h2 className="font-display text-2xl text-espresso">{section.title}</h2>
              <p className="text-sm leading-relaxed text-espresso-soft">
                {withIsolatedNumbers(section.text)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
