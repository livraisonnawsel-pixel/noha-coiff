import { NextResponse } from "next/server";
import { isValidEmail, isValidPhone, type BookingFormData } from "@/lib/booking";

/**
 * Point d'entrée de la demande de réservation.
 *
 * Actuellement : valide la demande et la journalise côté serveur.
 *
 * À connecter plus tard :
 * - Envoi WhatsApp (ex. API Cloud WhatsApp Business) vers NOHA COIFF
 * - Envoi email de confirmation à la cliente + notification à NOHA COIFF
 * - Vérification de disponibilité sur un calendrier (Google Calendar, etc.)
 * - Enregistrement en base de données / CRM
 * - Confirmation automatique (SMS / email) une fois le créneau validé
 */
export async function POST(request: Request) {
  let data: Partial<BookingFormData>;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Corps de requête invalide." },
      { status: 400 },
    );
  }

  const requiredFields: (keyof BookingFormData)[] = [
    "service",
    "date",
    "time",
    "firstName",
    "lastName",
    "phone",
    "email",
    "address",
    "city",
  ];

  for (const field of requiredFields) {
    if (!data[field] || !String(data[field]).trim()) {
      return NextResponse.json(
        { ok: false, error: `Champ manquant : ${field}` },
        { status: 400 },
      );
    }
  }

  if (!isValidEmail(String(data.email))) {
    return NextResponse.json(
      { ok: false, error: "Adresse email invalide." },
      { status: 400 },
    );
  }

  if (!isValidPhone(String(data.phone))) {
    return NextResponse.json(
      { ok: false, error: "Numéro de téléphone invalide." },
      { status: 400 },
    );
  }

  // TODO(intégration) : brancher ici WhatsApp / email / calendrier.
  console.log("[NOHA COIFF] Nouvelle demande de réservation :", data);

  const bookingId = `NC-${Date.now().toString(36).toUpperCase()}`;

  return NextResponse.json({ ok: true, bookingId });
}
