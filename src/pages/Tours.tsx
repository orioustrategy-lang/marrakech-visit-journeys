import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import TourCard, { TourCardSkeleton } from "@/components/TourCard";
import SEO from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTours } from "@/hooks/use-tours";
import { TOUR_CATEGORIES } from "@/lib/tours";
import { getStartingPrice } from "@/lib/pricing";
import { SITE_URL } from "@/lib/contact";
import { useT, type TKey } from "@/i18n";

type Sort = "recommended" | "price-asc" | "price-desc" | "rating";

const Tours = () => {
  const t = useT();
  const { data: tours, isLoading } = useTours();
  const [params, setParams] = useSearchParams();

  const category = params.get("category") ?? "all";
  const query = params.get("q") ?? "";
  const sort = (params.get("sort") as Sort) ?? "recommended";

  const setParam = (key: string, value: string, defaultValue: string) => {
    const next = new URLSearchParams(params);
    if (value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const categories = [{ id: "all", label: t("categories.all") }, ...TOUR_CATEGORIES.map((c) => ({ id: c.id, label: t(`categories.${c.id}` as TKey) }))];

  const filteredTours = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = (tours ?? []).filter(
      (tour) =>
        (category === "all" || tour.category === category) &&
        (!q || `${tour.title} ${tour.description} ${tour.highlights.join(" ")}`.toLowerCase().includes(q))
    );
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => getStartingPrice(a) - getStartingPrice(b));
      case "price-desc":
        return [...list].sort((a, b) => getStartingPrice(b) - getStartingPrice(a));
      case "rating":
        return [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.reviews ?? 0) - (a.reviews ?? 0));
      default:
        return list;
    }
  }, [tours, category, query, sort]);

  const countFor = (id: string) => (tours ?? []).filter((x) => id === "all" || x.category === id).length;
  const activeLabel = categories.find((c) => c.id === category)?.label;

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title={t("toursPage.seoTitle")}
        description={t("toursPage.seoDescription")}
        keywords="Marrakech tours, Morocco excursions, day trips from Marrakech, desert tours Morocco, Atlas mountains tours, Essaouira trip, Ouzoud waterfalls, trekking Morocco"
        url={`${SITE_URL}/tours`}
      />

      <section className="relative py-16 md:py-20 bg-[#f1742a] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("toursPage.title")}</h1>
            <p className="text-lg text-white/85">{t("toursPage.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="flex gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder={t("toursPage.searchPlaceholder")}
                  value={query}
                  onChange={(e) => setParam("q", e.target.value, "")}
                  aria-label={t("toursPage.searchPlaceholder")}
                  className="w-full h-11 pl-11 pr-4 rounded-full bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                />
              </div>
              <Select value={sort} onValueChange={(v) => setParam("sort", v, "recommended")}>
                <SelectTrigger className="w-40 sm:w-48 h-11 rounded-full bg-muted/50 border-border/50" aria-label={t("toursPage.sortBy")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">{t("toursPage.sort.recommended")}</SelectItem>
                  <SelectItem value="price-asc">{t("toursPage.sort.priceAsc")}</SelectItem>
                  <SelectItem value="price-desc">{t("toursPage.sort.priceDesc")}</SelectItem>
                  <SelectItem value="rating">{t("toursPage.sort.rating")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 lg:ml-auto scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground mr-1 flex-shrink-0 hidden sm:block" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setParam("category", cat.id, "all")}
                  aria-pressed={category === cat.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    category === cat.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {cat.label}
                  {tours && <span className={`ml-1.5 text-xs ${category === cat.id ? "text-white/80" : "opacity-60"}`}>{countFor(cat.id)}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex items-center gap-3 flex-wrap">
          <p className="text-muted-foreground text-sm" aria-live="polite">
            {t("toursPage.showing", { count: filteredTours.length })}
            {category !== "all" && ` · ${activeLabel}`}
            {query && ` · “${query}”`}
          </p>
          {(category !== "all" || query) && (
            <button onClick={() => setParams({}, { replace: true })} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              <X className="h-3.5 w-3.5" />
              {t("toursPage.clearFilters")}
            </button>
          )}
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }, (_, i) => (
                <TourCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
              <h3 className="text-xl font-semibold mb-2">{t("toursPage.emptyTitle")}</h3>
              <p className="text-muted-foreground mb-6">{t("toursPage.emptyBody")}</p>
              <button onClick={() => setParams({}, { replace: true })} className="text-primary font-medium hover:underline">
                {t("toursPage.clearFilters")}
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour, index) => (
                <div key={tour.id} className="animate-fade-in" style={{ animationDelay: `${Math.min(index, 8) * 0.04}s` }}>
                  <TourCard tour={tour} priority={index < 3} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tours;
