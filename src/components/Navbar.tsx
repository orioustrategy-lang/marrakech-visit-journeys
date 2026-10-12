import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, openWhatsApp } from "@/lib/contact";
import { LANGUAGES, useLanguage, type TKey } from "@/i18n";

const NAV_LINKS: { key: TKey; path: string }[] = [
  { key: "nav.home", path: "/" },
  { key: "nav.experiences", path: "/tours" },
  { key: "nav.gallery", path: "/gallery" },
  { key: "nav.about", path: "/about" },
  { key: "nav.contact", path: "/contact" },
];

const LanguageSwitch = ({ light }: { light: boolean }) => {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={`flex items-center rounded-full p-0.5 text-xs font-semibold ${light ? "bg-muted" : "bg-white/10"}`}
      role="group"
      aria-label="Language"
    >
      {LANGUAGES.map((l) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}
          title={l.label}
          className={`px-2.5 py-1.5 rounded-full uppercase transition-colors ${
            lang === l.id
              ? "bg-primary text-white"
              : light
                ? "text-muted-foreground hover:text-foreground"
                : "text-white/80 hover:text-white"
          }`}
        >
          {l.id}
        </button>
      ))}
    </div>
  );
};

const Navbar = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Only the home page has a dark hero behind the navbar.
  const hasDarkHero = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleWhatsApp = () => openWhatsApp(t("common.whatsappGreeting"));
  const isActive = (path: string) => (path === "/" ? location.pathname === "/" : location.pathname.startsWith(path));
  const useLightTheme = scrolled || !hasDarkHero || isOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useLightTheme && (scrolled || isOpen) ? "glass border-b border-border/50 shadow-sm" : hasDarkHero ? "bg-transparent" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group" aria-label="Marrakech Discover">
            <img
              src={useLightTheme ? "/assets/logo.png" : "/assets/whitelogo.png"}
              alt="Marrakech Discover"
              className="h-11 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive(link.path) ? "page" : undefined}
                className={`relative px-4 py-2.5 rounded-full font-medium text-[15px] transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : useLightTheme
                      ? "text-foreground hover:text-primary hover:bg-muted/50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitch light={useLightTheme} />
            <Button
              asChild
              variant="ghost"
              size="icon"
              className={`rounded-full transition-all duration-300 ${useLightTheme ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"}`}
            >
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label={t("nav.emailUs")}>
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button onClick={handleWhatsApp} className="gap-2 rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Phone className="h-4 w-4" />
              {t("nav.bookNow")}
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitch light={useLightTheme} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? t("common.close") : t("nav.menu")}
              className={`p-2.5 rounded-full transition-all duration-300 ${useLightTheme ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 glass border-b border-border/50 shadow-lg transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none invisible"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 ${
                  isActive(link.path) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                }`}
              >
                {t(link.key)}
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border grid gap-3">
              <Button onClick={handleWhatsApp} className="gap-2 w-full rounded-xl h-12">
                <Phone className="h-4 w-4" />
                {t("common.bookWhatsapp")}
              </Button>
              <Button asChild variant="outline" className="gap-2 w-full rounded-xl h-12">
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail className="h-4 w-4" />
                  {t("nav.emailUs")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
