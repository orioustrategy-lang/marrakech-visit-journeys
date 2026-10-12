export const WHATSAPP_NUMBER = "212637988023";
export const PHONE_NUMBERS = ["+212 606 844 910", "+212 637 988 023"];
export const CONTACT_EMAIL = "marrakechdiscover11@gmail.com";
export const SITE_URL = "https://www.marrakechdiscover.com";

export const SOCIAL = {
  instagram: "https://www.instagram.com/marrakechdiscover.official",
  tiktok: "https://www.tiktok.com/@marrakech.discove6",
  tripadvisor: "https://www.tripadvisor.fr/Attraction_Review-g293734-d26386802-Reviews-J_K-Marrakech_Marrakech_Safi.html",
};

export const whatsappUrl = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const openWhatsApp = (text: string) => window.open(whatsappUrl(text), "_blank", "noopener");
