import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/212637988023?text=Hello, I'm interested in your tours!",
      "_blank"
    );
  };

  return (
    <Button
      onClick={handleWhatsApp}
      size="lg"
      className="fixed bottom-6 right-6 z-40 rounded-full h-14 w-14 p-0 shadow-lg hover:shadow-xl transition-all"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};

export default WhatsAppButton;
