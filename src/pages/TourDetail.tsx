import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Users, MapPin, Star, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import marrakechCity from "@/assets/marrakech-city.jpg";

const TourDetail = () => {
  const { id } = useParams();

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/212600000000?text=Hello, I'm interested in the tour: ${tourData.title}`,
      "_blank"
    );
  };

  // Mock data - in a real app, this would come from an API or database
  const tourData = {
    title: "Marrakech City Tour",
    image: marrakechCity,
    rating: 4.9,
    reviews: 342,
    duration: "Full Day (8 hours)",
    groupSize: "2-15 people",
    description:
      "Immerse yourself in the vibrant culture and rich history of Marrakech on this comprehensive city tour. Visit the most iconic landmarks, explore bustling souks, and discover hidden gems with our expert local guide.",
    itinerary: [
      "Pick up from your accommodation in Marrakech",
      "Visit the stunning Bahia Palace with its beautiful gardens",
      "Explore the historic Saadian Tombs",
      "Discover the vibrant souks and traditional crafts",
      "Visit the iconic Koutoubia Mosque",
      "Experience the lively Jemaa el-Fnaa square",
      "Enjoy traditional Moroccan lunch (optional)",
      "Return to your accommodation",
    ],
    included: [
      "Professional local guide",
      "Air-conditioned transportation",
      "Hotel pickup and drop-off",
      "Entry fees to monuments",
      "Bottled water",
    ],
    excluded: [
      "Lunch and drinks",
      "Personal expenses",
      "Tips and gratuities",
    ],
    pricing: [
      { people: "2 people", price: "€45 per person" },
      { people: "3-4 people", price: "€40 per person" },
      { people: "5-7 people", price: "€35 per person" },
      { people: "8+ people", price: "€30 per person" },
    ],
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={tourData.image}
          alt={tourData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tourData.title}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-gold text-gold" />
                <span className="font-semibold">{tourData.rating}</span>
                <span className="opacity-80">({tourData.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{tourData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{tourData.groupSize}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Tour Description</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {tourData.description}
                </p>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Tour Itinerary</h2>
                <ul className="space-y-3">
                  {tourData.itinerary.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground pt-1">{item}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* What's Included/Excluded */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {tourData.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <X className="h-5 w-5 text-destructive" />
                    What's Not Included
                  </h3>
                  <ul className="space-y-2">
                    {tourData.excluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Pricing</h3>
                <div className="space-y-4 mb-6">
                  {tourData.pricing.map((tier, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 rounded-lg bg-muted"
                    >
                      <span className="font-medium">{tier.people}</span>
                      <span className="text-primary font-bold">{tier.price}</span>
                    </div>
                  ))}
                </div>

                <Button onClick={handleWhatsApp} size="lg" className="w-full gap-2 mb-4">
                  <Phone className="h-5 w-5" />
                  Book via WhatsApp
                </Button>

                <div className="border-t border-border pt-6 space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Pickup from your hotel in Marrakech
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Free cancellation up to 24h before
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Private and small group options
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
