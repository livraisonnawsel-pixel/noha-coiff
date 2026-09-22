"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { StepProgress } from "@/components/booking/StepProgress";
import { StepService } from "@/components/booking/steps/StepService";
import { StepDate } from "@/components/booking/steps/StepDate";
import { StepTime } from "@/components/booking/steps/StepTime";
import { StepClient } from "@/components/booking/steps/StepClient";
import { StepSummary } from "@/components/booking/steps/StepSummary";
import {
  emptyBooking,
  validateClientStep,
  buildWhatsAppUrl,
  type BookingFormData,
  type StepClientErrors,
} from "@/lib/booking";
import { getLocalizedServiceCategories } from "@/lib/services";
import { CONTACT } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

const TOTAL_STEPS = 5;

export function BookingWizard({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const rtl = locale === "ar";
  const BackIcon = rtl ? ArrowRight : ArrowLeft;
  const NextIcon = rtl ? ArrowLeft : ArrowRight;

  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingFormData>(emptyBooking);
  const [clientErrors, setClientErrors] = useState<StepClientErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const categories = getLocalizedServiceCategories(dict);

  function patch(update: Partial<BookingFormData>) {
    setData((prev) => ({ ...prev, ...update }));
  }

  function canGoNext() {
    if (step === 0) return Boolean(data.service);
    if (step === 1) return Boolean(data.date);
    if (step === 2) return Boolean(data.time);
    return true;
  }

  function goNext() {
    if (step === 3) {
      const errors = validateClientStep(data, dict.booking.stepClient.errors);
      setClientErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit() {
    fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {});
    setSubmitted(true);
  }

  if (submitted) {
    const whatsappUrl = buildWhatsAppUrl(data, locale, dict.booking.whatsappMessage);
    const t = dict.booking.success;
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-3xl border border-gold/30 bg-ivory px-8 py-16 text-center shadow-[0_30px_70px_-40px_rgba(55,38,32,0.6)]">
        <h3 className="font-display text-3xl text-espresso">{t.title}</h3>
        <p className="text-espresso-soft">{t.body}</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <LinkButton href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} />
            {t.whatsapp}
          </LinkButton>
          <LinkButton href={CONTACT.phoneHref} variant="secondary">
            <Phone size={16} />
            {t.call}
          </LinkButton>
        </div>
        <p className="text-xs text-espresso-soft">{t.note}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <StepProgress current={step} steps={dict.reservation.steps} />

      <div className="min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: rtl ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: rtl ? 24 : -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <StepService
                data={data}
                onChange={patch}
                categories={categories}
                dict={dict.booking.stepService}
              />
            )}
            {step === 1 && (
              <StepDate data={data} onChange={patch} locale={locale} dict={dict.booking.stepDate} />
            )}
            {step === 2 && (
              <StepTime data={data} onChange={patch} locale={locale} dict={dict.booking.stepTime} />
            )}
            {step === 3 && (
              <StepClient
                data={data}
                errors={clientErrors}
                onChange={patch}
                dict={dict.booking.stepClient}
              />
            )}
            {step === 4 && (
              <StepSummary data={data} locale={locale} dict={dict.booking.stepSummary} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={goBack}
          disabled={step === 0}
          className="px-6 py-3"
        >
          <BackIcon size={15} />
          {dict.booking.actions.back}
        </Button>

        {step < TOTAL_STEPS - 1 ? (
          <Button
            type="button"
            onClick={goNext}
            disabled={!canGoNext()}
            className="px-8 py-3"
          >
            {dict.booking.actions.next}
            <NextIcon size={15} />
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} className="px-8 py-3">
            {dict.booking.actions.send}
          </Button>
        )}
      </div>
    </div>
  );
}
