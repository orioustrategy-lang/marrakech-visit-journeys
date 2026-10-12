import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Star } from "lucide-react";
import { CONTACT_EMAIL, PHONE_NUMBERS, SOCIAL } from "@/lib/contact";
import { TOUR_CATEGORIES } from "@/lib/tours";
import { useT, type TKey } from "@/i18n";

const Footer = () => {
  const t = useT();
  const currentYear = new Date().getFullYear();

  const quickLinks: { key: TKey; to: string }[] = [
    { key: "nav.home", to: "/" },
    { key: "nav.experiences", to: "/tours" },
    { key: "nav.gallery", to: "/gallery" },
    { key: "nav.about", to: "/about" },
    { key: "nav.contact", to: "/contact" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="sm:col-span-2">
            <Link to="/" className="inline-flex items-center mb-6">
              <img src="/assets/whitelogo.png" alt="Marrakech Discover" className="h-12" loading="lazy" />
            </Link>
            <p className="text-background/70 mb-6 max-w-md leading-relaxed">{t("footer.tagline")}</p>
            <div className="flex gap-3">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a href={SOCIAL.tripadvisor} target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Star className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("footer.explore")}
            </h3>
            <ul className="space-y-3">
              {TOUR_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link to={`/tours?category=${c.id}`} className="text-background/70 hover:text-primary transition-colors">
                    {t(`categories.${c.id}` as TKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-background/70 hover:text-primary transition-colors">
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("footer.contact")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div className="text-background/70">
                  {PHONE_NUMBERS.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-primary">
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-background/70 hover:text-primary break-all">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-background/70">Marrakech, Morocco</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-background/60">
            <p>
              &copy; {currentYear} Marrakech Discover. {t("footer.rights")}
            </p>
            <p className="flex items-center gap-1">
              {t("footer.developedBy")}{" "}
              <a href="https://www.instagram.com/itsmeussa" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                @itsmeussa
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
