import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Instagram, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/212637988023?text=Hello, I have a question about your tours!", "_blank");
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+212 606 844 910", "+212 637 988 023"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["marrakechdiscover11@gmail.com"],
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Marrakech, Morocco"],
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Daily: 8:00 AM - 8:00 PM"],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Contact Us - Book Your Morocco Tour | Marrakech Discover"
        description="Contact Marrakech Discover for tour bookings and inquiries. WhatsApp: +212 637 988 023. Available 24/7 for Sahara desert tours, Atlas mountains trips, and all Morocco adventures. Quick response guaranteed!"
        keywords="contact Marrakech tours, book Morocco tour, Marrakech travel agency contact, WhatsApp Morocco tours, Morocco tour booking, Marrakech Discover contact"
        url="https://www.marrakechdiscover.com/contact"
      />
      
      {/* Header */}
      <section className="relative py-20 bg-[#f1742a] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-white/80">
              We're here to help plan your perfect Moroccan adventure. Reach out anytime!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* WhatsApp Card */}
              <div className="bg-[#73931e] rounded-2xl p-8 text-white">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Quick Response</h3>
                <p className="text-white/80 mb-6">
                  Get instant answers to your questions via WhatsApp. We typically respond within minutes!
                </p>
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-white text-[#73931e] hover:bg-white/90 rounded-xl h-12 font-semibold"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>

              {/* Contact Details */}
              <div className="bg-card rounded-2xl border border-border/50 p-8">
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">{item.title}</p>
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">Follow us on social media</p>
                  <div className="flex gap-3">
                    <a 
                      href="https://www.instagram.com/marrakechdiscover.official" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://www.tiktok.com/@marrakech.discove6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.tripadvisor.fr/Attraction_Review-g293734-d26386802-Reviews-J_K-Marrakech_Marrakech_Safi.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    >
                      <Star className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl border border-border/50 p-8 md:p-10">
                <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required 
                        className="h-12 rounded-xl border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        className="h-12 rounded-xl border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+1 234 567 8900" 
                        className="h-12 rounded-xl border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input 
                        id="subject" 
                        placeholder="Tour inquiry" 
                        required 
                        className="h-12 rounded-xl border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your travel plans, interests, and any questions you have..."
                      rows={6}
                      required
                      className="rounded-xl border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-xl h-12 gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-border/50 shadow-lg">
            <div className="h-[400px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429134.39854906546!2d-8.160650939804688!3d31.634573226960174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakesh%2C%20Morocco!5e0!3m2!1sen!2sus!4v1638888888888!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Marrakech Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
