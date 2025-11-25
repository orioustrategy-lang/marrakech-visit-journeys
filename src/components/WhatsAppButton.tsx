import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/212637988023?text=Hello, I'm interested in your tours!",
      "_blank"
    );
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Contact via WhatsApp"
    >
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      
      {/* Button */}
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
        <MessageCircle className="h-6 w-6" />
      </span>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;
