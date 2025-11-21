import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Star, CheckCircle, Users, Shield, Clock, Award } from "lucide-react";
import TourCard from "@/components/TourCard";
import heroImage from "@/assets/hero-desert.jpg";
import youssefGuide from "@/assets/youssef-guide.jpg";

// Cooking Workshop
import cookingImg1 from "@/assets/Experiences/Depuis Marrakech  atelier culinaire et excursion d'une journée dans l'Atlas/012ab7a7cbfa9ca66f338c441c8f65ecd8a2e50191e4ed8212601aca6e28f802.avif";

// Agafay Sunset
import agafaySunsetImg1 from "@/assets/Experiences/Marrakech  Coucher de soleil dans le désert d'Agafay, balade à dos de chameau et dîner-spectacle/1861442009a86767d47645175c487c0f7863ddb904760dadbef03890f07fcd0.avif";

// Agafay Desert Dinner
import agafayDinnerImg1 from "@/assets/Experiences/Marrakech Agafay Desert Dinner Show, Camel Ride, 1 Quad/40c668de93f5ba133dd0788af8e7d6fc0a62d2083dcee7b5b23a20a34e1ac231.avif";

// Paragliding
import paraglidingImg1 from "@/assets/Experiences/Marrakech Paragliding over Agafay Desert & Atlas Mnt Views/28fb20d9691b341dd9495acef7ca084d6543a1de8925e841630134e90fc4fe8f.avif";

// Airport Transfer
import airportImg1 from "@/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/494926692d21999f77adced882342d586e04432066fd6210a555f93ae556a2fb.avif";

// Zip-Line
import ziplineImg1 from "@/assets/Experiences/Marrakech Zip-Line in the Atlas Mountains & Berber villages/5566e9157d95c740a63efb23ee5670f791c7bfece3434a570871a4a51d06d71f.avif";

const Index = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/212637988023?text=Hello, I'm interested in your tours!", "_blank");
  };

  const featuredTours = [
    {
      id: "cooking-workshop-atlas",
      title: "From Marrakech: Cooking Workshop and Full-Day Atlas Mountain Excursion",
      image: cookingImg1,
      duration: "7 hours",
      groupSize: "2-15 people",
      price: "From €45",
      rating: 4.9,
      reviews: 320,
      description: "Discover Moroccan flavors with a hands-on cooking class in the Atlas Mountains. Learn traditional Berber dishes with fresh local ingredients.",
    },
    {
      id: "agafay-sunset-camel-dinner",
      title: "Marrakech: Agafay Desert Sunset, Camel Ride & Dinner Show",
      image: agafaySunsetImg1,
      duration: "Half Day",
      groupSize: "2-20 people",
      price: "From €55",
      rating: 4.8,
      reviews: 450,
      description: "Enjoy a magical sunset with camel ride and traditional Moroccan dinner show in the stunning Agafay desert.",
    },
    {
      id: "agafay-dinner-quad",
      title: "Marrakech Agafay Desert Dinner Show, Camel Ride, 1 Quad",
      image: agafayDinnerImg1,
      duration: "Half Day",
      groupSize: "2-20 people",
      price: "From €65",
      rating: 4.9,
      reviews: 380,
      description: "Experience the ultimate Agafay adventure with quad biking, camel ride, and dinner show under the stars.",
    },
    {
      id: "paragliding-agafay",
      title: "Marrakech Paragliding over Agafay Desert & Atlas Mnt Views",
      image: paraglidingImg1,
      duration: "3-4 hours",
      groupSize: "1-8 people",
      price: "From €95",
      rating: 5.0,
      reviews: 215,
      description: "Soar above the stunning Agafay Desert and enjoy breathtaking views of the Atlas Mountains on this unforgettable paragliding experience.",
    },
  ];

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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Marrakech Desert"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover the Magic of Marrakech
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Unforgettable tours, day trips, and authentic experiences across Morocco
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleWhatsApp} className="gap-2 text-lg">
              <Phone className="h-5 w-5" />
              Book via WhatsApp
            </Button>
            <Link to="/tours">
              <Button size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-foreground w-full sm:w-auto">
                Explore Our Tours
              </Button>
            </Link>
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
