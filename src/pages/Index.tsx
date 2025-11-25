import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Star, CheckCircle, Users, Shield, Clock, Award } from "lucide-react";
import TourCard from "@/components/TourCard";
import SearchBar from "@/components/SearchBar";
import { tours } from "@/data/tours";
import heroImage from "@/assets/hero-desert.jpg";
import youssefGuide from "@/assets/youssef-guide.jpg";

const Index = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/212637988023?text=Hello, I'm interested in your tours!", "_blank");
  };

  // Get featured tours (top-rated tours from different categories)
  const featuredTours = [
    tours.find(t => t.id === "atlas-mountains-hiking"),
    tours.find(t => t.id === "agafay-sunset-camel-dinner"),
    tours.find(t => t.id === "3-day-merzouga-desert"),
    tours.find(t => t.id === "paragliding-agafay"),
    tours.find(t => t.id === "ouarzazate-ait-ben-haddou"),
    tours.find(t => t.id === "hot-air-balloon"),
  ].filter(Boolean).slice(0, 6);

  const reviews = [
    {
      name: "Sarah Johnson",
      country: "United States",
      rating: 5,
      text: "Absolutely incredible experience! Our guide was knowledgeable and friendly. The desert sunset was magical.",
      tour: "Agafay Desert Experience",
    },
    {
      name: "Marco Rossi",
      country: "Italy",
      rating: 5,
      text: "Best tour company in Marrakech! Professional, punctual, and great value. Highly recommend!",
      tour: "Atlas Mountains Tour",
    },
    {
      name: "Emma Williams",
      country: "United Kingdom",
      rating: 5,
      text: "The city tour was fantastic. We saw all the highlights and learned so much about Moroccan culture.",
      tour: "Marrakech City Tour",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Local Expertise",
      description: "Authentic experiences led by passionate local guides",
    },
    {
      icon: Shield,
      title: "Best Price Guarantee",
      description: "Competitive rates with no hidden costs",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Always available on WhatsApp for your convenience",
    },
    {
      icon: Award,
      title: "Top Rated",
      description: "Excellent reviews on TripAdvisor and Trustpilot",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Marrakech Desert"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 w-full px-4 py-12 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Discover the Magic of Marrakech
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Unforgettable tours, day trips, and authentic experiences across Morocco
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar />
          </div>
          
          <div className="text-center">
            <p className="text-white/80 text-sm mb-4">Or contact us directly</p>
            <Button size="lg" onClick={handleWhatsApp} className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
              <Phone className="h-5 w-5" />
              Book via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold mb-6">Welcome to Morocco</h2>
              <p className="text-lg text-muted-foreground mb-4">
                My name is <strong>Youssef Bourahmoun</strong>, a licensed and certified tour guide based in Marrakech. With over six years of distinguished experience, I specialize in delivering refined, seamlessly organized, and culturally immersive guidance for travelers seeking to explore the true essence of Morocco.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Born and raised in a Berber village in the Atlas Mountains, I bring an exceptional depth of cultural insight and authentic understanding of Morocco's heritage, traditions, and landscapes. This background allows me to curate journeys that are meaningful, genuine, and thoughtfully crafted.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Supported by a dedicated and professional team, I uphold the highest standards of service, discretion, and reliability from the moment of inquiry to the completion of each personalized journey.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                At <strong>Marrakech Discover</strong>, our commitment is to provide an elevated, memorable, and truly exceptional travel experience.
              </p>
              <p className="text-lg font-semibold text-primary mb-8">
                Thank you for choosing Morocco. Your discovery begins here.
              </p>
              <Link to="/about">
                <Button variant="outline" size="lg">Learn More About Us</Button>
              </Link>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={youssefGuide}
                alt="Youssef Bourahmoun - Your Marrakech Guide"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Top Experiences</h2>
            <p className="text-xl text-muted-foreground">
              Handpicked tours and activities for an authentic Moroccan adventure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/tours">
              <Button size="lg">View All Tours</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Guests Say</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-gold text-gold" />
              ))}
              <span className="text-xl font-semibold ml-2">4.9 out of 5</span>
            </div>
            <p className="text-muted-foreground">Based on 1,235+ reviews on TripAdvisor</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{review.text}</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.country}</p>
                  <p className="text-sm text-primary mt-1">{review.tour}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Marrakech Discover</h2>
            <p className="text-xl text-muted-foreground">
              Your trusted partner for unforgettable Moroccan experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-desert to-gold text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Marrakech Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today and let's plan your perfect Moroccan experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleWhatsApp} variant="secondary" className="gap-2 text-lg">
              <Phone className="h-5 w-5" />
              WhatsApp Us Now
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-foreground w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
