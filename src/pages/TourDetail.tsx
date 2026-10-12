import { useParams, Navigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  MapPin,
  Star,
  Check,
  X,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Shield,
  Share2,
  Camera,
  Sparkles,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import TourCard from "@/components/TourCard";
import BookingDialog from "@/components/BookingDialog";
import SEO from "@/components/SEO";
import PageLoader from "@/components/PageLoader";
import { useTour, useTours } from "@/hooks/use-tours";
import { getPricePerPerson, getPricingTiers, formatEuro } from "@/lib/pricing";
import { thumbnailOf } from "@/lib/images";
import { openWhatsApp, SITE_URL } from "@/lib/contact";
import { useT } from "@/i18n";

const MAX_PEOPLE = 20;

const TourDetail = () => {
  const { id } = useParams();
  const t = useT();
  const { tour, isLoading } = useTour(id);
  const { data: allTours } = useTours();

  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const displayImages = tour ? (tour.images?.length ? tour.images : tour.image ? [tour.image] : []) : [];
  const imageCount = displayImages.length;

  useEffect(() => {
    setCurrentImageIndex(0);
    setShowAllImages(false);
  }, [id]);

  // Auto-advance the hero every 5 seconds (paused while the full gallery is open).
  useEffect(() => {
    if (imageCount <= 1 || showAllImages || bookingOpen) return;
    const interval = setInterval(() => setCurrentImageIndex((prev) => (prev + 1) % imageCount), 5000);
    return () => clearInterval(interval);
  }, [imageCount, showAllImages, bookingOpen]);

  // Keyboard navigation in the full-screen gallery.
  useEffect(() => {
    if (!showAllImages) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowAllImages(false);
      if (e.key === "ArrowRight") setCurrentImageIndex((p) => (p + 1) % imageCount);
      if (e.key === "ArrowLeft") setCurrentImageIndex((p) => (p - 1 + imageCount) % imageCount);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showAllImages, imageCount]);

  if (isLoading) return <PageLoader />;
  if (!tour) return <Navigate to="/tours" replace />;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % imageCount);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (touchEndX.current && Math.abs(diff) > 50) (diff > 0 ? nextImage : prevImage)();
    touchEndX.current = 0;
  };

  const relatedTours = (allTours ?? []).filter((x) => x.category === tour.category && x.id !== tour.id).slice(0, 3);

  const pricePerPerson = getPricePerPerson(tour, numberOfPeople);
  const totalPrice = pricePerPerson * numberOfPeople;
  const pricingTiers = getPricingTiers(tour);
  const tierLabel = (min: number, max?: number) =>
    max === undefined
      ? t("tour.peoplePlus", { min })
      : min === max
        ? min === 1
          ? t("tour.onePerson")
          : t("tour.nPeople", { count: min })
        : t("tour.peopleRange", { min, max });

  const handleWhatsApp = () =>
    openWhatsApp(
      t("tour.whatsappMessage", { title: tour.title, count: numberOfPeople, total: formatEuro(totalPrice) })
    );

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: tour.title, text: tour.description, url });
      } catch {
        // User dismissed the share sheet.
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success(t("tour.linkCopied"));
    }
  };

  const heroImage = displayImages[0];
  const seoImage = heroImage?.startsWith("http") ? heroImage : `${SITE_URL}${heroImage ?? "/hero-desert.jpg"}`;

  // Only the current slide and its neighbours are mounted, so a 20-photo tour
  // doesn't download 20 full-size images on load.
  const isNear = (index: number) => {
    if (imageCount <= 3) return true;
    const d = Math.abs(index - currentImageIndex);
    return d <= 1 || d === imageCount - 1;
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <SEO
        title={`${tour.title} - ${tour.price}`}
        description={`${tour.description.substring(0, 150)}… ${tour.duration}. Marrakech Discover.`}
        keywords={`${tour.title}, ${tour.category} Marrakech, Morocco ${tour.category}, ${tour.duration} tour Marrakech`}
        url={`${SITE_URL}/tours/${tour.id}`}
        image={seoImage}
        type="product"
        tourData={{
          name: tour.title,
          description: tour.description,
          image: seoImage,
          price: tour.price,
          duration: tour.duration,
          rating: tour.rating,
          reviews: tour.reviews,
        }}
      />

      {/* Hero gallery */}
      <div
        className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden bg-muted"
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchMove={(e) => (touchEndX.current = e.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        {imageCount > 0 ? (
          <>
            {displayImages.map((image, index) =>
              isNear(index) ? (
                <img
                  key={image}
                  src={image}
                  alt={index === 0 ? tour.title : ""}
                  loading={index === 0 ? "eager" : "lazy"}
                  {...{ fetchpriority: index === 0 ? "high" : "auto" }}
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : null
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 pointer-events-none z-10" />

            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start z-20">
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-sm font-medium hover:bg-white transition-all shadow-lg"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("common.back")}
              </Link>
              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-foreground hover:bg-white transition-all shadow-lg"
                aria-label={t("tour.share")}
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {imageCount > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="hidden sm:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-3 transition-all shadow-lg z-20"
                  aria-label={t("common.previousImage")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="hidden sm:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-3 transition-all shadow-lg z-20"
                  aria-label={t("common.nextImage")}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="text-white max-w-3xl">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {tour.rating && tour.reviews ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                          <Star className="h-4 w-4 fill-[#e7c779] text-[#e7c779]" />
                          {tour.rating} ({tour.reviews})
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                        <Clock className="h-4 w-4" />
                        {tour.duration}
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{tour.title}</h1>
                  </div>

                  {imageCount > 1 && (
                    <button
                      onClick={() => setShowAllImages(true)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-foreground font-medium hover:bg-white/90 transition-all shadow-lg self-start md:self-auto whitespace-nowrap"
                    >
                      <Camera className="h-5 w-5" />
                      {t("tour.viewAllPhotos", { count: imageCount })}
                    </button>
                  )}
                </div>

                {imageCount > 1 && (
                  <div className="flex items-center gap-2 mt-4">
                    {displayImages.slice(0, 8).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 overflow-hidden ${
                          index === currentImageIndex ? "w-10 bg-white/30" : "w-3 bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={t("tour.goToImage", { n: index + 1 })}
                      >
                        {index === currentImageIndex && (
                          <div key={currentImageIndex} className="h-full bg-white rounded-full" style={{ animation: "progress 5s linear" }} />
                        )}
                      </button>
                    ))}
                    {imageCount > 8 && <span className="text-white/70 text-xs ml-2">+{imageCount - 8}</span>}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <MapPin className="h-16 w-16 opacity-30" />
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: Clock, label: t("tour.duration"), value: tour.duration },
                { icon: Users, label: t("tour.groupSize"), value: tour.groupSize || "—" },
                { icon: MapPin, label: t("tour.pickup"), value: t("tour.hotel") },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-card rounded-2xl border border-border/50 p-3 sm:p-5 text-center">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
                  <p className="font-semibold text-sm sm:text-base">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "Inter, sans-serif" }}>
                <Sparkles className="h-5 w-5 text-primary" />
                {t("tour.about")}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">{tour.description}</p>
            </div>

            {tour.highlights && tour.highlights.length > 0 && (
              <div className="bg-[#f1742a]/5 rounded-2xl border border-[#f1742a]/10 p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: "Inter, sans-serif" }}>
                  <Star className="h-5 w-5 text-[#f1742a]" />
                  {t("tour.highlights")}
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

            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                  {t("tour.itinerary")}
                </h2>
                <ol>
                  {tour.itinerary.map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md">
                          {index + 1}
                        </div>
                        {index < tour.itinerary!.length - 1 && <div className="w-0.5 flex-1 bg-primary/20 my-2" />}
                      </div>
                      <p className="text-muted-foreground leading-relaxed pt-2 pb-8">{item}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {tour.included.length > 0 && (
                <div className="bg-[#73931e]/5 rounded-2xl p-6 border border-[#73931e]/10">
                  <h3 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ fontFamily: "Inter, sans-serif" }}>
                    <div className="w-9 h-9 rounded-full bg-[#73931e] flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    {t("tour.included")}
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
              )}

              {tour.notIncluded && tour.notIncluded.length > 0 && (
                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                  <h3 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ fontFamily: "Inter, sans-serif" }}>
                    <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center">
                      <X className="h-5 w-5 text-white" />
                    </div>
                    {t("tour.notIncluded")}
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

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div id="book" className="bg-card rounded-2xl border border-border/50 p-6 shadow-xl">
                <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-border/50">
                  <div>
                    <span className="text-sm text-muted-foreground">{t("tour.pricePerPerson")}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">{formatEuro(pricePerPerson)}</span>
                      <span className="text-muted-foreground">{t("tour.perPersonShort")}</span>
                    </div>
                  </div>
                  {tour.rating ? (
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-[#e7c779]/20 rounded-full">
                      <Star className="h-4 w-4 fill-[#e7c779] text-[#e7c779]" />
                      <span className="font-semibold text-sm">{tour.rating}</span>
                    </div>
                  ) : null}
                </div>

                <div className="mb-5">
                  <span className="text-sm font-semibold mb-3 block" id="travelers-label">
                    {t("tour.travelers")}
                  </span>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-muted/50 border border-border/50" aria-labelledby="travelers-label">
                    <button
                      onClick={() => setNumberOfPeople((n) => Math.max(1, n - 1))}
                      disabled={numberOfPeople <= 1}
                      aria-label={t("tour.fewerTravelers")}
                      className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <div className="text-center" aria-live="polite">
                      <span className="text-2xl font-bold">{numberOfPeople}</span>
                      <span className="text-muted-foreground text-sm ml-1">
                        {numberOfPeople === 1 ? t("tour.traveler") : t("tour.travelersLower")}
                      </span>
                    </div>
                    <button
                      onClick={() => setNumberOfPeople((n) => Math.min(MAX_PEOPLE, n + 1))}
                      disabled={numberOfPeople >= MAX_PEOPLE}
                      aria-label={t("tour.moreTravelers")}
                      className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-6 p-4 rounded-xl bg-muted/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {formatEuro(pricePerPerson)} × {numberOfPeople}
                    </span>
                    <span className="font-medium">{formatEuro(totalPrice)}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t("tour.total")}</span>
                    <span className="text-primary">{formatEuro(totalPrice)}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setBookingOpen(true)}
                  size="lg"
                  className="w-full gap-2 mb-3 rounded-xl h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <CalendarCheck className="h-5 w-5" />
                  {t("tour.requestToBook")}
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 mb-4 rounded-xl h-12 text-base border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/10 hover:text-[#128C7E]"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t("tour.askWhatsapp")}
                </Button>

                <p className="text-center text-xs text-muted-foreground">{t("tour.bookingReassurance")}</p>
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-5">
                <p className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  {t("tour.groupPricing")}
                </p>
                <div className="space-y-1">
                  {pricingTiers.map((tier, index) => {
                    const active =
                      numberOfPeople >= tier.min && (tier.max === undefined || numberOfPeople <= tier.max);
                    return (
                      <div
                        key={index}
                        className={`flex justify-between text-sm py-2 px-2 -mx-2 rounded-lg ${active ? "bg-primary/10 text-foreground" : ""}`}
                      >
                        <span className={active ? "font-medium" : "text-muted-foreground"}>{tierLabel(tier.min, tier.max)}</span>
                        <span className="font-semibold">
                          {formatEuro(tier.price)}
                          {t("tour.perPersonShort")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#73931e]/5 rounded-2xl border border-[#73931e]/10 p-5 space-y-4">
                {[
                  { icon: MapPin, title: t("tour.trust.pickupTitle"), body: t("tour.trust.pickupBody") },
                  { icon: Calendar, title: t("tour.trust.cancelTitle"), body: t("tour.trust.cancelBody") },
                  { icon: Shield, title: t("tour.trust.guidesTitle"), body: t("tour.trust.guidesBody") },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#73931e]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-[#73931e]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{title}</p>
                      <p className="text-xs text-muted-foreground">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {relatedTours.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">{t("tour.related")}</h2>
              <Link to={`/tours?category=${tour.category}`} className="text-primary font-medium hover:underline">
                {t("common.viewAll")}
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTours.map((related) => (
                <TourCard key={related.id} tour={related} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky booking bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur border-t border-border/60 px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground">{t("tour.pricePerPerson")}</p>
          <p className="font-bold text-primary text-lg leading-tight">{formatEuro(pricePerPerson)}</p>
        </div>
        <Button onClick={() => setBookingOpen(true)} className="rounded-xl h-11 px-5">
          {t("tour.requestToBook")}
        </Button>
      </div>
      <div className="lg:hidden h-20" />

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        tourId={tour.id}
        tourTitle={tour.title}
        people={numberOfPeople}
        pricePerPerson={pricePerPerson}
      />

      {showAllImages && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col" role="dialog" aria-modal="true" aria-label={t("tour.gallery")}>
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-white font-medium">
              {currentImageIndex + 1} / {imageCount}
            </span>
            <button
              onClick={() => setShowAllImages(false)}
              className="text-white hover:text-white/80 transition-colors p-2 hover:bg-white/10 rounded-full"
              aria-label={t("common.close")}
              autoFocus
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className="flex-1 flex items-center justify-center p-4 min-h-0"
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchMove={(e) => (touchEndX.current = e.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
              <img
                src={displayImages[currentImageIndex]}
                alt={`${tour.title} ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              {imageCount > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 sm:p-4 transition-all"
                    aria-label={t("common.previousImage")}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 sm:p-4 transition-all"
                    aria-label={t("common.nextImage")}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-white/10 bg-black/50">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {displayImages.map((img, index) => (
                <button
                  key={img}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                    index === currentImageIndex ? "ring-2 ring-white" : "opacity-50 hover:opacity-80"
                  }`}
                  aria-label={t("tour.goToImage", { n: index + 1 })}
                >
                  <img src={thumbnailOf(img)} alt="" loading="lazy" className="w-full h-full object-cover" />
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
