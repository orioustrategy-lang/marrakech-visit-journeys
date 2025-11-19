import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Star } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Marrakech Discover</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted local partner for unforgettable experiences in Marrakech and beyond.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Star className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/tours" className="text-muted-foreground hover:text-primary transition-colors">Tours</Link></li>
              <li><Link to="/day-trips" className="text-muted-foreground hover:text-primary transition-colors">Day Trips</Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <span>+212 600 000 000</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <span>info@marrakechvisit.com</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span>Marrakech, Morocco</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} Marrakech Discover. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
