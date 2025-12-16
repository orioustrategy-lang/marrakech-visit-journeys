import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Star, Users, Shield, Clock, Award, ArrowRight, MapPin, Compass } from "lucide-react";
import TourCard from "@/components/TourCard";
import SEO from "@/components/SEO";
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
      avatar: "S",
    },
    {
      name: "Marco Rossi",
      country: "Italy",
      rating: 5,
      text: "Best tour company in Marrakech! Professional, punctual, and great value. Highly recommend!",
      tour: "Atlas Mountains Tour",
      avatar: "M",
    },
    {
      name: "Emma Williams",
      country: "United Kingdom",
      rating: 5,
      text: "The city tour was fantastic. We saw all the highlights and learned so much about Moroccan culture.",
      tour: "Marrakech City Tour",
      avatar: "E",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Local Expertise",
      description: "Authentic experiences led by passionate local guides who know every hidden gem.",
    },
    {
      icon: Shield,
      title: "Best Price Guarantee",
      description: "Competitive rates with no hidden costs. Transparent pricing always.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Always available on WhatsApp for your convenience and peace of mind.",
    },
    {
      icon: Award,
      title: "Top Rated",
      description: "Excellent reviews on TripAdvisor and Trustpilot from happy travelers.",
    },
  ];

  const stats = [
    { value: "6+", label: "Years Experience" },
    { value: "10K+", label: "Happy Travelers" },
    { value: "50+", label: "Unique Experiences" },
    { value: "4.9", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Marrakech Discover - Best Morocco Tours, Sahara Desert Trips & Adventures 2025"
        description="Book unforgettable Marrakech tours with local experts! Sahara desert camping, Atlas mountains hiking, camel rides, Essaouira day trips & more. Best prices guaranteed ✓ 24/7 WhatsApp support ✓ 10,000+ happy travelers"
        keywords="Marrakech tours, Morocco trips, Sahara desert tour from Marrakech, Atlas mountains day trip, camel ride Marrakech, Essaouira day trip, Ouzoud waterfalls tour, Ait Ben Haddou, Merzouga desert camp, hot air balloon Marrakech, quad biking Agafay, best Marrakech tours 2025, Morocco adventure tours, Marrakech excursions, Morocco travel agency, book Morocco tour"
        url="https://www.marrakechdiscover.com/"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Marrakech Desert"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#f1742a]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#e7c779]/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 w-full px-4 py-32 animate-fade-in">
          <div className="container mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-8 animate-slide-down">
              <Compass className="h-4 w-4 text-[#e7c779]" />
              <span>Your Moroccan Adventure Awaits</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Discover the <br />
              <span className="text-gradient">Magic of Morocco</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Unforgettable tours, authentic experiences, and memories that last a lifetime. 
              From desert sunsets to mountain adventures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/tours">
                <Button size="lg" className="gap-2 h-14 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Explore Experiences
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleWhatsApp} 
                className="gap-2 h-14 px-8 text-base rounded-full bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-foreground transition-all"
              >
                <Phone className="h-5 w-5" />
                Book via WhatsApp
              </Button>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f1742a]/5 rounded-l-[100px] -z-10" />
        
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up order-2 lg:order-1">
              <span className="inline-block text-primary font-medium mb-4 tracking-wide uppercase text-sm">About Us</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Welcome to <br />
                <span className="text-gradient">Marrakech Discover</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                My name is <strong className="text-foreground">Youssef Bourahmoun</strong>, a licensed and certified tour guide based in Marrakech. With over six years of distinguished experience, I specialize in delivering refined, seamlessly organized, and culturally immersive experiences.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Born and raised in a Berber village in the Atlas Mountains, I bring an exceptional depth of cultural insight and authentic understanding of Morocco's heritage, traditions, and landscapes.
              </p>
              
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                  <Shield className="h-4 w-4 text-[#73931e]" />
                  <span className="text-sm font-medium">Licensed Guide</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                  <Star className="h-4 w-4 text-[#e7c779]" />
                  <span className="text-sm font-medium">Top Rated</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Local Expert</span>
                </div>
              </div>
              
              <Button onClick={handleWhatsApp} size="lg" className="gap-2 rounded-full">
                <Phone className="h-4 w-4" />
                Start Planning Your Trip
              </Button>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={youssefGuide}
                  alt="Youssef Bourahmoun - Your Marrakech Guide"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-5 rounded-2xl shadow-xl border border-border/50 max-w-[200px]">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#e7c779] text-[#e7c779]" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">"Best guide in Marrakech!"</p>
                <p className="text-xs text-primary mt-1 font-medium">— TripAdvisor Review</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="inline-block text-primary font-medium mb-4 tracking-wide uppercase text-sm">Our Experiences</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Handpicked Adventures
            </h2>
            <p className="text-lg text-muted-foreground">
              From desert safaris to mountain treks, discover Morocco's most unforgettable experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour, index) => (
              <div key={tour.id} className={`animate-slide-up stagger-${index + 1}`}>
                <TourCard {...tour} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/tours">
              <Button size="lg" variant="outline" className="gap-2 rounded-full px-8">
                View All Experiences
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section 
        className="py-24 relative"
        style={{
          backgroundImage: "url('/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Sunset, Camel Ride, and Dinner Show/IMG_5740.JPG')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-background/70"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="inline-block text-primary font-medium mb-4 tracking-wide uppercase text-sm">Why Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Travel with Confidence
            </h2>
            <p className="text-lg text-muted-foreground">
              We're committed to making your Moroccan journey exceptional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card border border-border/50 card-hover text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-medium mb-4 tracking-wide uppercase text-sm">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[#e7c779] text-[#e7c779]" />
              ))}
              <span className="text-xl font-semibold ml-2">4.9 out of 5</span>
            </div>
            <p className="text-muted-foreground">Based on 1,235+ reviews on TripAdvisor</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-2xl border border-border/50 card-hover"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#e7c779] text-[#e7c779]" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">{review.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#f1742a]" />
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
            <rect x="0" y="0" width="100" height="100" fill="url(#pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Your Adventure?
            </h2>
            <p className="text-xl mb-10 text-white/90 leading-relaxed">
              Let's plan your perfect Moroccan experience together. 
              Reach out today and start your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleWhatsApp} 
                className="gap-2 h-14 px-8 text-base rounded-full bg-white text-[#f1742a] hover:bg-white/90 shadow-lg"
              >
                <Phone className="h-5 w-5" />
                WhatsApp Us Now
              </Button>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 text-base rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#f1742a] w-full sm:w-auto"
                >
                  Send a Message
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
