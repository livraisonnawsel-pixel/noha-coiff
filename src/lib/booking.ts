import { format } from "date-fns";
import { fr as frLocale } from "date-fns/locale/fr";
import { arMA } from "date-fns/locale/ar-MA";
import type { Dictionary } from "@/lib/dictionaries";
import { CONTACT } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";

export type BookingFormData = {
  service: string;
  category: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
};

export const emptyBooking: BookingFormData = {
  service: "",
  category: "",
  date: "",
  time: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  notes: "",
};

/**
 * Créneaux proposés à titre indicatif. À terme, cette liste devra être
 * remplacée par les disponibilités réelles de NOHA COIFF (agenda connecté).
 */
export const timeSlots: string[] = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export function getDateFnsLocale(locale: Locale) {
  return locale === "ar" ? arMA : frLocale;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string) {
  return /^[0-9+\s().-]{6,20}$/.test(value);
}

export type StepClientErrors = Partial<
  Record<"firstName" | "lastName" | "phone" | "email" | "address" | "city", string>
>;

export function validateClientStep(
  data: BookingFormData,
  messages: Dictionary["booking"]["stepClient"]["errors"],
): StepClientErrors {
  const errors: StepClientErrors = {};
  if (!data.firstName.trim()) errors.firstName = messages.firstNameRequired;
  if (!data.lastName.trim()) errors.lastName = messages.lastNameRequired;
  if (!data.phone.trim()) {
    errors.phone = messages.phoneRequired;
  } else if (!isValidPhone(data.phone)) {
    errors.phone = messages.phoneInvalid;
  }
  if (!data.email.trim()) {
    errors.email = messages.emailRequired;
  } else if (!isValidEmail(data.email)) {
    errors.email = messages.emailInvalid;
  }
  if (!data.address.trim()) errors.address = messages.addressRequired;
  if (!data.city.trim()) errors.city = messages.cityRequired;
  return errors;
}

export function buildWhatsAppUrl(
  data: BookingFormData,
  locale: Locale,
  labels: Dictionary["booking"]["whatsappMessage"],
) {
  const dateLabel = data.date
    ? format(new Date(data.date), "EEEE d MMMM yyyy", { locale: getDateFnsLocale(locale) })
    : "";

  const lines = [
    labels.greeting,
    `${labels.service} : ${data.service}`,
    `${labels.date} : ${dateLabel}`,
    `${labels.time} : ${data.time}`,
    `${labels.name} : ${data.firstName} ${data.lastName}`,
    `${labels.phone} : ${data.phone}`,
    `${labels.address} : ${data.address}, ${data.city}`,
    data.notes ? `${labels.notes} : ${data.notes}` : null,
  ].filter(Boolean);

  return `${CONTACT.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
}
