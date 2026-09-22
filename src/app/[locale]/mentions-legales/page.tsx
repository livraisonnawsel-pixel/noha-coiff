import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/dictionaries";
import { CONTACT } from "@/lib/contact";
import { isValidLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/mentions-legales">): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return { title: dict.legalMentions.title, description: dict.legalMentions.intro };
}

export default async function MentionsLegalesPage({
  params,
}: PageProps<"/[locale]/mentions-legales">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.legalMentions;

  const rows = [
    { label: t.responsibleLabel, value: t.responsible, numeric: false },
    { label: t.tradeNameLabel, value: "NOHA COIFF", numeric: false },
    { label: t.activityLabel, value: t.activity, numeric: false },
    { label: t.zoneLabel, value: dict.location, numeric: false },
    { label: t.phoneLabel, value: CONTACT.phoneDisplay, numeric: true },
    { label: t.whatsappLabel, value: CONTACT.whatsappDisplay, numeric: true },
  ];

  return (
    <section className="bg-ivory py-32 sm:py-40">
      <Container className="mx-auto flex max-w-3xl flex-col gap-8">
        <h1 className="font-display text-4xl text-espresso">{t.title}</h1>
        <p className="text-sm text-espresso-soft">{t.intro}</p>

        <div className="overflow-hidden rounded-2xl border border-espresso/10">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${
                i % 2 === 0 ? "bg-cream" : "bg-ivory"
              }`}
            >
              <span className="text-sm font-semibold text-espresso">{row.label}</span>
              <span
                className="text-sm text-espresso-soft"
                dir={row.numeric ? "ltr" : undefined}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs italic text-espresso-soft">{t.closingNote}</p>
      </Container>
    </section>
  );
}
