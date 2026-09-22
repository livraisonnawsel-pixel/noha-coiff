import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/contact";

export function FloatingWhatsApp({ ariaLabel }: { ariaLabel: string }) {
  return (
    <a
      href={CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-ivory shadow-[0_15px_35px_-10px_rgba(55,38,32,0.6)] ring-1 ring-gold/30 transition-transform duration-300 hover:scale-105 hover:bg-gold hover:text-espresso"
    >
      <MessageCircle size={24} />
    </a>
  );
}
