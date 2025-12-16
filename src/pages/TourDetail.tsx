import { useParams, Navigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Users, MapPin, Star, Check, X, Plus, Minus, ChevronLeft, ChevronRight, ArrowLeft, Calendar, Shield, Heart, Share2, Camera, Sparkles } from "lucide-react";
import { getTourById, tours } from "@/data/tours";
import TourCard from "@/components/TourCard";
import SEO from "@/components/SEO";

const TourDetail = () => {
  const { id } = useParams();
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // Touch/swipe handling for mobile
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Scroll to top when component mounts or tour ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0); // Reset image index when tour changes
  }, [id]);
  
  const tour = getTourById(id || "");
  
  if (!tour) {
    return <Navigate to="/tours" replace />;
  }

  const displayImages = tour.images && tour.images.length > 0 ? tour.images : (tour.image ? [tour.image] : []);
  const hasImages = displayImages.length > 0;

  // Auto-scroll images every 4 seconds
  useEffect(() => {
    if (displayImages.length <= 1 || showAllImages) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [displayImages.length, showAllImages]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next image
        setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
      } else {
        // Swipe right - previous image
        setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
      }
    }
  };

  // Get related tours (same category, excluding current)
  const relatedTours = tours
    .filter(t => t.category === tour.category && t.id !== tour.id)
    .slice(0, 3);

  // Get price per person based on priceTiers or fallback to old logic
  const getPricePerPerson = (people: number) => {
    if (tour.priceTiers && tour.priceTiers.length > 0) {
      for (const tier of tour.priceTiers) {
        if (tier.max !== undefined) {
          if (people >= tier.min && people <= tier.max) {
            return tier.price;
          }
        } else {
          if (people >= tier.min) {
            return tier.price;
          }
        }
      }
      return tour.priceTiers[tour.priceTiers.length - 1].price;
    } else {
      const match = tour.price.match(/(\d+)/);
      const basePrice = match ? parseInt(match[1]) : 50;
      
      if (people === 1) return basePrice * 1.5;
      if (people === 2) return basePrice;
      if (people >= 3 && people <= 4) return basePrice * 0.9;
      if (people >= 5 && people <= 7) return basePrice * 0.8;
      if (people >= 8) return basePrice * 0.7;
      return basePrice;
    }
  };

  const pricePerPerson = Math.round(getPricePerPerson(numberOfPeople));
  const totalPrice = pricePerPerson * numberOfPeople;
  
  const getPricingTiersDisplay = () => {
    if (tour.priceTiers && tour.priceTiers.length > 0) {
      return tour.priceTiers.map(tier => {
        let label = '';
        if (tier.max !== undefined) {
          label = tier.min === tier.max ? `${tier.min} person` : `${tier.min}-${tier.max} people`;
        } else {
          label = `${tier.min}+ people`;
        }
        return { label, price: tier.price };
      });
    } else {
      const match = tour.price.match(/(\d+)/);
      const basePrice = match ? parseInt(match[1]) : 50;
      return [
        { label: '1 person', price: Math.round(basePrice * 1.5) },
        { label: '2 people', price: basePrice },
        { label: '3-4 people', price: Math.round(basePrice * 0.9) },
        { label: '5-7 people', price: Math.round(basePrice * 0.8) },
        { label: '8+ people', price: Math.round(basePrice * 0.7) },
      ];
    }
  };

  const pricingTiers = getPricingTiersDisplay();

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/212637988023?text=Hello, I'm interested in the tour: ${tour.title} for ${numberOfPeople} people (€${totalPrice} total)`,
      "_blank"
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: tour.title,
        text: tour.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const incrementPeople = () => {
    if (numberOfPeople < 20) setNumberOfPeople(numberOfPeople + 1);
  };

  const decrementPeople = () => {
    if (numberOfPeople > 1) setNumberOfPeople(numberOfPeople - 1);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  // Generate SEO-friendly image URL
  const seoImage = tour.image?.startsWith('http') 
    ? tour.image 
    : `https://www.marrakechdiscover.com${tour.image}`;

  return (
    <div className="min-h-screen bg-background pt-20">
      <SEO 
        title={`${tour.title} - Book Now from ${tour.price}`}
        description={`${tour.description.substring(0, 155)}... Duration: ${tour.duration}. Group size: ${tour.groupSize}. Book your ${tour.title} with Marrakech Discover - best prices guaranteed!`}
        keywords={`${tour.title}, ${tour.category} Marrakech, Morocco ${tour.category}, book ${tour.title}, ${tour.title} price, Marrakech ${tour.duration} tour`}
        url={`https://www.marrakechdiscover.com/tours/${tour.id}`}
        image={seoImage}
        type="product"
        tourData={{
          name: tour.title,
          description: tour.description,
          image: seoImage,
          price: tour.price,
          duration: tour.duration,
          rating: tour.rating,
          reviews: tour.reviews
        }}
      />
      
      {/* Hero Image Gallery - Full Width */}
      <div 
        className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {hasImages ? (
          <>
            {/* Fade Animation - All images stacked */}
            {displayImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${tour.title} - Image ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
                }`}
              />
            ))}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none z-10" />
            
            {/* Top Actions */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start z-20">
              <Link 
                to="/tours" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-sm font-medium hover:bg-white transition-all shadow-lg"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full backdrop-blur-sm transition-all shadow-lg ${
                    isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-foreground hover:bg-white'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-foreground hover:bg-white transition-all shadow-lg"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Image Navigation */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-3 transition-all shadow-lg z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-3 transition-all shadow-lg z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            
            {/* Bottom Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  {/* Title & Meta on Image */}
                  <div className="text-white max-w-2xl">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      {tour.rating && tour.reviews && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                          <Star className="h-4 w-4 fill-[#e7c779] text-[#e7c779]" />
                          {tour.rating} ({tour.reviews})
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                        <Clock className="h-4 w-4" />
                        {tour.duration}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      {tour.title}
                    </h1>
                  </div>
                  
                  {/* View Photos Button */}
                  {displayImages.length > 1 && (
                    <button
                      onClick={() => setShowAllImages(true)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-foreground font-medium hover:bg-white/90 transition-all shadow-lg self-start md:self-auto"
                    >
                      <Camera className="h-5 w-5" />
                      View all {displayImages.length} photos
                    </button>
                  )}
                </div>
                
                {/* Image Dots with Progress Animation */}
                {displayImages.length > 1 && (
                  <div className="flex gap-2 mt-4">
                    {displayImages.slice(0, 8).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 overflow-hidden ${
                          index === currentImageIndex
                            ? "w-10 bg-white/30"
                            : "w-3 bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      >
                        {index === currentImageIndex && (
                          <div 
                            className="h-full bg-white rounded-full animate-progress"
                            style={{
                              animation: 'progress 4s linear infinite'
                            }}
                          />
                        )}
                      </button>
                    ))}
                    {displayImages.length > 8 && (
                      <span className="text-white/60 text-xs ml-2">+{displayImages.length - 8} more</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <span>No images available</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-2xl border border-border/50 p-5 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{tour.duration}</p>
              </div>
              <div className="bg-card rounded-2xl border border-border/50 p-5 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Group Size</p>
                <p className="font-semibold">{tour.groupSize}</p>
              </div>
              <div className="bg-card rounded-2xl border border-border/50 p-5 text-center">
                <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Pickup</p>
                <p className="font-semibold">Hotel</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                <Sparkles className="h-5 w-5 text-primary" />
                About This Experience
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {tour.description}
              </p>
            </div>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div className="bg-[#f1742a]/5 rounded-2xl border border-[#f1742a]/10 p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Star className="h-5 w-5 text-[#f1742a]" />
                  Highlights
                </h2>
                <ul className="grid md:grid-cols-2 gap-4">
                  {tour.highlights.map((item, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <div className="w-7 h-7 rounded-full bg-[#f1742a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-[#f1742a]" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="bg-card rounded-2xl border border-border/50 p-8">
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Tour Itinerary
                </h2>
                <div className="space-y-0">
                  {tour.itinerary.map((item, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                        {index < tour.itinerary!.length - 1 && (
                          <div className="w-0.5 h-full bg-primary/20 my-2" />
                        )}
                      </div>
                      <div className="pb-8">
                        <p className="text-muted-foreground leading-relaxed pt-2">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included/Excluded */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#73931e]/5 rounded-2xl p-6 border border-[#73931e]/10">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <div className="w-9 h-9 rounded-full bg-[#73931e] flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#73931e] mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {tour.notIncluded && tour.notIncluded.length > 0 && (
                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                  <h3 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center">
                      <X className="h-5 w-5 text-white" />
                    </div>
                    Not Included
                  </h3>
                  <ul className="space-y-3">
                    {tour.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Main Booking Card */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-xl">
                {/* Price Header */}
                <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-border/50">
                  <div>
                    <span className="text-sm text-muted-foreground">From</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">€{pricePerPerson}</span>
                      <span className="text-muted-foreground">/ person</span>
                    </div>
                  </div>
                  {tour.rating && (
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-[#e7c779]/20 rounded-full">
                      <Star className="h-4 w-4 fill-[#e7c779] text-[#e7c779]" />
                      <span className="font-semibold text-sm">{tour.rating}</span>
                    </div>
                  )}
                </div>
                
                {/* Number of People */}
                <div className="mb-5">
                  <label className="text-sm font-semibold mb-3 block">Number of Travelers</label>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-muted/50 border border-border/50">
                    <button
                      onClick={decrementPeople}
                      disabled={numberOfPeople <= 1}
                      className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <div className="text-center">
                      <span className="text-2xl font-bold">{numberOfPeople}</span>
                      <span className="text-muted-foreground text-sm ml-1">travelers</span>
                    </div>
                    <button
                      onClick={incrementPeople}
                      disabled={numberOfPeople >= 20}
                      className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="space-y-3 mb-6 p-4 rounded-xl bg-muted/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">€{pricePerPerson} × {numberOfPeople} travelers</span>
                    <span className="font-medium">€{totalPrice}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">€{totalPrice}</span>
                  </div>
                </div>

                <Button onClick={handleWhatsApp} size="lg" className="w-full gap-2 mb-4 rounded-xl h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                  <Phone className="h-5 w-5" />
                  Book via WhatsApp
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Instant confirmation · Free cancellation up to 24h
                </p>
              </div>

              {/* Group Pricing Card */}
              <div className="bg-card rounded-2xl border border-border/50 p-5">
                <p className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Group Discounts
                </p>
                <div className="space-y-2">
                  {pricingTiers.map((tier, index) => (
                    <div key={index} className="flex justify-between text-sm py-2 border-b border-border/30 last:border-0">
                      <span className="text-muted-foreground">{tier.label}</span>
                      <span className="font-semibold">€{tier.price}/person</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Signals */}
              <div className="bg-[#73931e]/5 rounded-2xl border border-[#73931e]/10 p-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#73931e]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-[#73931e]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Free Hotel Pickup</p>
                      <p className="text-xs text-muted-foreground">In Marrakech city center</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#73931e]/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-[#73931e]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Free Cancellation</p>
                      <p className="text-xs text-muted-foreground">Up to 24 hours before</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#73931e]/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-[#73931e]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Licensed Guides</p>
                      <p className="text-xs text-muted-foreground">Certified & insured</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tours */}
        {relatedTours.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">You Might Also Like</h2>
              <Link to="/tours" className="text-primary font-medium hover:underline">
                View all
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTours.map((relatedTour) => (
                <TourCard key={relatedTour.id} {...relatedTour} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Full Screen Image Gallery Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-white font-medium">
              {currentImageIndex + 1} / {displayImages.length}
            </span>
            <button
              onClick={() => setShowAllImages(false)}
              className="text-white hover:text-white/80 transition-colors p-2 hover:bg-white/10 rounded-full"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl">
              <img
                src={displayImages[currentImageIndex]}
                alt={`${tour.title} - Image ${currentImageIndex + 1}`}
                className="w-full max-h-[70vh] object-contain"
              />
              
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Thumbnail Strip */}
          <div className="p-4 border-t border-white/10 bg-black/50">
            <div className="flex gap-2 overflow-x-auto justify-center pb-2">
              {displayImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                    index === currentImageIndex
                      ? "ring-2 ring-white scale-105"
                      : "opacity-50 hover:opacity-80"
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
