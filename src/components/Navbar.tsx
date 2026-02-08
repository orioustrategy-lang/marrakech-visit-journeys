import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Pages that have dark hero backgrounds where white logo should be used
  // Only the home page has a dark hero that extends behind the navbar
  const darkHeroPages = ["/"];
  const hasDarkHero = darkHeroPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Experiences", path: "/tours" },
    { name: "Contact", path: "/contact" },
  ];

  const handleWhatsApp = () => {
    window.open("https://wa.me/212637988023?text=Hello, I'm interested in your tours!", "_blank");
  };

  const isActive = (path: string) => location.pathname === path;

  // Determine if we should use light theme (dark logo, dark text)
  const useLightTheme = scrolled || !hasDarkHero;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "glass border-b border-border/50 shadow-sm"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={useLightTheme ? "/assets/logo.png" : "/assets/whitelogo.png"}
              alt="Marrakech Discover"
              className="h-11 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2.5 rounded-full font-medium text-[15px] transition-all duration-300 ${isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : useLightTheme
                      ? "text-foreground hover:text-primary hover:bg-muted/50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.location.href = "mailto:marrakechdiscover11@gmail.com"}
              className={`rounded-full transition-all duration-300 hover:scale-105 ${useLightTheme
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/10"
                }`}
            >
              <Mail className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleWhatsApp}
              className="gap-2 rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Phone className="h-4 w-4" />
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2.5 rounded-full transition-all duration-300 ${useLightTheme
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
              }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 glass border-b border-border/50 shadow-lg transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 ${isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                  }`}
              >
                {link.name}
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border grid gap-3">
              <Button onClick={handleWhatsApp} className="gap-2 w-full rounded-xl h-12">
                <Phone className="h-4 w-4" />
                Book via WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = "mailto:marrakechdiscover11@gmail.com"}
                className="gap-2 w-full rounded-xl h-12"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
