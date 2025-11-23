import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Users, MapPin, Star, Check, X, Plus, Minus, ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTourById } from "@/data/tours";

const TourDetail = () => {
  const { id } = useParams();
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  
  const tour = getTourById(id || "");
  
  if (!tour) {
    return <Navigate to="/tours" replace />;
  }

  const displayImages = tour.images && tour.images.length > 0 ? tour.images : (tour.image ? [tour.image] : []);
  const hasImages = displayImages.length > 0;

  // Extract price number from price string
  const extractPrice = (priceStr: string) => {
    const match = priceStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 50;
  };

  const basePrice = extractPrice(tour.price);
  
  const getPricePerPerson = (people: number) => {
    // Apply group discounts
    if (people === 1) return basePrice * 1.5;
    if (people === 2) return basePrice;
    if (people >= 3 && people <= 4) return basePrice * 0.9;
    if (people >= 5 && people <= 7) return basePrice * 0.8;
    if (people >= 8) return basePrice * 0.7;
    return basePrice;
  };

  const pricePerPerson = Math.round(getPricePerPerson(numberOfPeople));
  const totalPrice = pricePerPerson * numberOfPeople;

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/212637988023?text=Hello, I'm interested in the tour: ${tour.title} for ${numberOfPeople} people (€${totalPrice} total)`,
      "_blank"
    );
  };

  const incrementPeople = () => {
    if (numberOfPeople < 20) {
      setNumberOfPeople(numberOfPeople + 1);
    }
  };

  const decrementPeople = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(numberOfPeople - 1);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Image Gallery */}
      <div className="relative h-[400px] md:h-[500px]">
        {hasImages ? (
          <>
            <img
              src={displayImages[currentImageIndex]}
              alt={`${tour.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* View All Images Button */}
                <button
                  onClick={() => setShowAllImages(true)}
                  className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-all z-10"
                >
                  <Grid className="h-4 w-4" />
                  <span>{currentImageIndex + 1} / {displayImages.length}</span>
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "w-8 bg-white"
                          : "w-2 bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-desert/30 to-gold/30 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-8xl mb-4">🏔️</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              {tour.rating && tour.reviews && (
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-gold text-gold" />
                  <span className="font-semibold">{tour.rating}</span>
                  <span className="opacity-80">({tour.reviews} reviews)</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{tour.groupSize}</span>
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
                  {tour.description}
                </p>
              </CardContent>
            </Card>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                  <ul className="space-y-3">
                    {tour.highlights.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <Star className="h-5 w-5 text-gold fill-gold mt-1 flex-shrink-0" />
                        <p className="text-muted-foreground">{item}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Tour Itinerary</h2>
                  <ul className="space-y-3">
                    {tour.itinerary.map((item, index) => (
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
            )}

            {/* What's Included/Excluded */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {tour.notIncluded && tour.notIncluded.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <X className="h-5 w-5 text-destructive" />
                      What's Not Included
                    </h3>
                    <ul className="space-y-2">
                      {tour.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Pricing</h3>
                
                {/* Number of People Selector */}
                <div className="mb-3">
                  <label className="text-sm font-medium mb-2 block">Number of People</label>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted h-[60px]">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementPeople}
                      disabled={numberOfPeople <= 1}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold">{numberOfPeople}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementPeople}
                      disabled={numberOfPeople >= 20}
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Pricing Display */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-4 rounded-lg bg-muted h-[60px]">
                    <span className="font-medium">Price per person</span>
                    <span className="text-primary font-bold text-xl">€{pricePerPerson}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-primary text-primary-foreground h-[60px]">
                    <span className="font-medium">Total Price</span>
                    <span className="font-bold text-2xl">€{totalPrice}</span>
                  </div>
                </div>

                {/* Pricing Tiers Reference */}
                <div className="mb-6 p-4 rounded-lg bg-muted/50">
                  <p className="text-xs font-semibold mb-2 text-muted-foreground">PRICING TIERS</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">1 person</span>
                      <span className="font-medium">€{Math.round(basePrice * 1.5)}/person</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">2 people</span>
                      <span className="font-medium">€{basePrice}/person</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">3-4 people</span>
                      <span className="font-medium">€{Math.round(basePrice * 0.9)}/person</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">5-7 people</span>
                      <span className="font-medium">€{Math.round(basePrice * 0.8)}/person</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">8+ people</span>
                      <span className="font-medium">€{Math.round(basePrice * 0.7)}/person</span>
                    </div>
                  </div>
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
      
      {/* Full Screen Image Gallery Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowAllImages(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
            aria-label="Close gallery"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="w-full max-w-6xl">
            {/* Main Image */}
            <div className="relative mb-6">
              <img
                src={displayImages[currentImageIndex]}
                alt={`${tour.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-[60vh] object-contain"
              />
              
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg">
                    {currentImageIndex + 1} / {displayImages.length}
                  </div>
                </>
              )}
            </div>
            
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-32 overflow-y-auto">
              {displayImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
                    index === currentImageIndex
                      ? "ring-2 ring-white scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetail;
