import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Star, Users, Shield, Clock, Award, ArrowRight, MapPin, Compass } from "lucide-react";
import TourCard, { TourCardSkeleton } from "@/components/TourCard";
import SEO from "@/components/SEO";
import { useTours } from "@/hooks/use-tours";
import { openWhatsApp, SITE_URL } from "@/lib/contact";
import { useT } from "@/i18n";
import heroImage from "@/assets/optimized/hero-desert.webp";
import youssefGuide from "@/assets/optimized/youssef-guide.webp";

const WHY_US_BACKGROUND = "/images/tours/marrakech-agafay-desert-sunset-camel-ride-and-dinner-show-img-5740.webp";

// Guest quotes are kept in the language they were written in.
const reviews = [
  {
    name: "Sarah Johnson",
    country: "United States",
    text: "Absolutely incredible experience! Our guide was knowledgeable and friendly. The desert sunset was magical.",
  },
  {
    name: "Marco Rossi",
    country: "Italy",
    text: "Best tour company in Marrakech! Professional, punctual, and great value. Highly recommend!",
  },
  {
    name: "Emma Williams",
    country: "United Kingdom",
    text: "The city tour was fantastic. We saw all the highlights and learned so much about Moroccan culture.",
  },
];

const Index = () => {
  const t = useT();
  const { data: tours, isLoading } = useTours();

  const handleWhatsApp = () => openWhatsApp(t("common.whatsappGreeting"));

  const featured = (tours ?? []).filter((tour) => tour.featured);
  const featuredTours = (featured.length > 0 ? featured : tours ?? []).slice(0, 6);

  const features = [
    { icon: Users, title: t("home.features.localTitle"), description: t("home.features.localBody") },
    { icon: Shield, title: t("home.features.priceTitle"), description: t("home.features.priceBody") },
    { icon: Clock, title: t("home.features.supportTitle"), description: t("home.features.supportBody") },
    { icon: Award, title: t("home.features.ratedTitle"), description: t("home.features.ratedBody") },
  ];

  const stats = [
    { value: "6+", label: t("home.stats.years") },
    { value: "10K+", label: t("home.stats.travelers") },
    { value: tours ? String(tours.length) : "30+", label: t("home.stats.experiences") },
    { value: "4.9", label: t("home.stats.rating") },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={t("home.seoTitle")}
        description={t("home.seoDescription")}
        keywords="Marrakech tours, Morocco trips, Sahara desert tour from Marrakech, Atlas mountains day trip, camel ride Marrakech, Essaouira day trip, Ouzoud waterfalls tour, Ait Ben Haddou, Merzouga desert camp, hot air balloon Marrakech, quad biking Agafay, Morocco adventure tours, Marrakech excursions"
        url={`${SITE_URL}/`}
      />

      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" {...{ fetchpriority: "high" }} className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/75" />
        </div>

        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#f1742a]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#e7c779]/20 rounded-full blur-3xl" />

        <div className="relative z-10 w-full px-4 pt-28 pb-24 animate-fade-in">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-8 animate-slide-down">
              <Compass className="h-4 w-4 text-[#e7c779]" />
              <span>{t("home.badge")}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              {t("home.heroLine1")} <br />
              <span className="text-gradient">{t("home.heroLine2")}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">{t("home.heroSubtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="gap-2 h-14 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <Link to="/tours">
                  {t("home.explore")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleWhatsApp}
                className="gap-2 h-14 px-8 text-base rounded-full bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-foreground transition-all"
              >
                <Phone className="h-5 w-5" />
                {t("common.bookWhatsapp")}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-14 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float hidden sm:block" aria-hidden>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f1742a]/5 rounded-l-[100px] -z-10" />
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-primary font-medium mb-4 tracking-wide uppercase text-sm">{t("home.aboutEyebrow")}</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t("home.aboutTitle")} <br />
                <span className="text-gradient">Marrakech Discover</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{t("home.aboutP1")}</p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{t("home.aboutP2")}</p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: Shield, color: "text-[#73931e]", label: t("home.badges.licensed") },
                  { icon: Star, color: "text-[#deb85c]", label: t("home.badges.topRated") },
                  { icon: MapPin, color: "text-primary", label: t("home.badges.local") },
                ].map(({ icon: Icon, color, label }) => (
                  <div key={label} className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button onClick={handleWhatsApp} size="lg" className="gap-2 rounded-full">
                  <Phone className="h-4 w-4" />
                  {t("home.startPlanning")}
                </Button>
                <Button asChild size="lg" variant="ghost" className="gap-2 rounded-full">
                  <Link to="/about">
                    {t("home.ourStory")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={youssefGuide}
                  alt={t("home.guideAlt")}
                  loading="lazy"
                  className="w-full h-[420px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 left-4 sm:-left-6 bg-card p-5 rounded-2xl shadow-xl border border-border/50 max-w-[220px]">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#e7c779] text-[#e7c779]" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">"Best guide in Marrakech!"</p>
                <p className="text-xs text-primary mt-1 font-medium">— TripAdvisor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured tours */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="inline-block text-primary font-medium mb-4 tracking-wide uppercase text-sm">{t("home.featuredEyebrow")}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("home.featuredTitle")}</h2>
            <p className="text-lg text-muted-foreground">{t("home.featuredSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array.from({ length: 6 }, (_, i) => <TourCardSkeleton key={i} />)
              : featuredTours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="gap-2 rounded-full px-8">
              <Link to="/tours">
                {t("home.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 md:py-24 relative bg-cover bg-center md:bg-fixed" style={{ backgroundImage: `url('${WHY_US_BACKGROUND}')` }}>
        <div className="absolute inset-0 bg-background/80" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="inline-block text-primary font-medium mb-4 tracking-wide uppercase text-sm">{t("home.whyEyebrow")}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("home.whyTitle")}</h2>
            <p className="text-lg text-muted-foreground">{t("home.whySubtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="group p-8 rounded-2xl bg-card border border-border/50 card-hover text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-medium mb-4 tracking-wide uppercase text-sm">{t("home.reviewsEyebrow")}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("home.reviewsTitle")}</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[#e7c779] text-[#e7c779]" />
              ))}
              <span className="text-xl font-semibold ml-2">{t("home.ratingOutOf")}</span>
            </div>
            <a href="https://www.tripadvisor.fr/Attraction_Review-g293734-d26386802-Reviews-J_K-Marrakech_Marrakech_Safi.html" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline">
              {t("home.reviewsSource")}
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {reviews.map((review) => (
              <figure key={review.name} className="bg-card p-8 rounded-2xl border border-border/50 card-hover flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#e7c779] text-[#e7c779]" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-6 leading-relaxed flex-1">"{review.text}"</blockquote>
                <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">{review.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.country}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f1742a]" />
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="cta-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
            <rect x="0" y="0" width="100" height="100" fill="url(#cta-dots)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("home.ctaTitle")}</h2>
            <p className="text-xl mb-10 text-white/90 leading-relaxed">{t("home.ctaBody")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleWhatsApp} className="gap-2 h-14 px-8 text-base rounded-full bg-white text-[#c4520f] hover:bg-white/90 shadow-lg">
                <Phone className="h-5 w-5" />
                {t("home.ctaWhatsapp")}
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#c4520f]"
              >
                <Link to="/contact">{t("home.ctaMessage")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
