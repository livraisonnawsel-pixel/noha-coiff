import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Concept } from "@/components/sections/Concept";
import { Services } from "@/components/sections/Services";
import { AtHome } from "@/components/sections/AtHome";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { getDictionary } from "@/lib/dictionaries";
import { isValidLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) notFound();
  const dict = getDictionary(rawLocale);

  return (
    <>
      <Hero locale={rawLocale} dict={dict} />
      <Concept dict={dict} />
      <Services locale={rawLocale} dict={dict} />
      <AtHome locale={rawLocale} dict={dict} />
      <About dict={dict} />
      <FAQ dict={dict} />
      <Contact locale={rawLocale} dict={dict} />
    </>
  );
}
