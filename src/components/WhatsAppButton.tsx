import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { openWhatsApp } from "@/lib/contact";
import { useT } from "@/i18n";

const WhatsAppButton = () => {
  const t = useT();
  // Tour pages have a sticky booking bar at the bottom on mobile.
  const onTourPage = /^\/tours\/[^/]+/.test(useLocation().pathname);

  return (
    <button
      onClick={() => openWhatsApp(t("common.whatsappGreeting"))}
      className={`fixed right-6 z-40 group ${onTourPage ? "bottom-24 lg:bottom-6" : "bottom-6"}`}
      aria-label={t("common.chatWithUs")}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 motion-reduce:hidden" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
        <MessageCircle className="h-6 w-6" />
      </span>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {t("common.chatWithUs")}
      </span>
    </button>
  );
};

export default WhatsAppButton;
