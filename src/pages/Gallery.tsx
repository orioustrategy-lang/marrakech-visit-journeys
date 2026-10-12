import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import SEO from "@/components/SEO";
import { useTours } from "@/hooks/use-tours";
import { TOUR_CATEGORIES } from "@/lib/tours";
import { thumbnailOf } from "@/lib/images";
import { SITE_URL } from "@/lib/contact";
import { useT, type TKey } from "@/i18n";

const PHOTOS_PER_TOUR = 3;

const Gallery = () => {
  const t = useT();
  const { data: tours } = useTours();
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<number | null>(null);

  const photos = useMemo(
    () =>
      (tours ?? [])
        .filter((tour) => category === "all" || tour.category === category)
        .flatMap((tour) =>
          (tour.images?.length ? tour.images : tour.image ? [tour.image] : [])
            .slice(0, PHOTOS_PER_TOUR)
            .map((src) => ({ src, tourId: tour.id, title: tour.title }))
        ),
    [tours, category]
  );

  const count = photos.length;
  const current = selected !== null ? photos[selected] : null;

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") setSelected((i) => (i === null ? i : (i + 1) % count));
      if (e.key === "ArrowLeft") setSelected((i) => (i === null ? i : (i - 1 + count) % count));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, count]);

  return (
    <div className="min-h-screen pt-20">
      <SEO title={t("gallery.seoTitle")} description={t("gallery.seoDescription")} url={`${SITE_URL}/gallery`} />

      <section className="relative py-16 md:py-20 bg-[#f1742a] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("gallery.title")}</h1>
            <p className="text-lg text-white/85">{t("gallery.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8 -mx-4 px-4 lg:mx-0 lg:px-0">
            {[{ id: "all", key: "categories.all" }, ...TOUR_CATEGORIES.map((c) => ({ id: c.id, key: `categories.${c.id}` }))].map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                aria-pressed={category === c.id}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  category === c.id ? "bg-primary text-white shadow-md" : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {t(c.key as TKey)}
              </button>
            ))}
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4">
            {photos.map((photo, index) => (
              <button
                key={`${photo.src}-${index}`}
                onClick={() => setSelected(index)}
                className="relative block w-full overflow-hidden rounded-xl group break-inside-avoid bg-muted"
                aria-label={photo.title}
              >
                <img
                  src={thumbnailOf(photo.src)}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-left">
                  <span className="text-white text-sm font-medium line-clamp-2">{photo.title}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {current && selected !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" role="dialog" aria-modal="true" aria-label={current.title}>
          <div className="flex items-center justify-between gap-4 p-4 text-white">
            <span className="text-sm text-white/70 tabular-nums">
              {selected + 1} / {count}
            </span>
            <button onClick={() => setSelected(null)} className="p-2 rounded-full hover:bg-white/10" aria-label={t("common.close")} autoFocus>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 min-h-0 relative flex items-center justify-center px-4" onClick={() => setSelected(null)}>
            <img
              src={current.src}
              alt={current.title}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected((selected - 1 + count) % count);
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label={t("common.previousImage")}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected((selected + 1) % count);
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label={t("common.nextImage")}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <p className="text-white font-medium">{current.title}</p>
            <Link to={`/tours/${current.tourId}`} className="inline-flex items-center gap-1 text-[#e7c779] hover:underline text-sm">
              {t("gallery.viewTour")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
