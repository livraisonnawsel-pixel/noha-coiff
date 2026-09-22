import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { getDictionary } from "@/lib/dictionaries";
import { isValidLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/reservation">): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return { title: dict.reservation.title, description: dict.reservation.intro };
}

export default async function ReservationPage({
  params,
}: PageProps<"/[locale]/reservation">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.reservation;

  return (
    <section className="bg-ivory py-32 sm:py-40">
      <Container className="flex flex-col gap-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {t.eyebrow}
          </span>
          <h1 className="font-display text-balance text-4xl leading-tight text-espresso sm:text-5xl">
            {t.title}
          </h1>
          <p className="text-balance text-espresso-soft">{t.intro}</p>
        </div>

        <BookingWizard locale={locale} dict={dict} />
      </Container>
    </section>
  );
}
