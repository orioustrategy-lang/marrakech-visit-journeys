import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Clock, Users, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { thumbnailOf } from "@/lib/images";
import { useT } from "@/i18n";
import type { Tour } from "@/lib/tours";

interface TourCardProps {
  tour: Tour;
  /** Above-the-fold cards load eagerly. */
  priority?: boolean;
}

const MAX_HOVER_IMAGES = 5;

const TourCard = ({ tour, priority = false }: TourCardProps) => {
  const t = useT();
  const { id, title, image, images, duration, groupSize, rating, reviews, description } = tour;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Only a handful of thumbnails cycle on hover; the full gallery lives on the tour page.
  const displayImages = (images && images.length > 0 ? images : image ? [image] : [])
    .slice(0, MAX_HOVER_IMAGES)
    .map(thumbnailOf);
  const hasMultipleImages = displayImages.length > 1;

  useEffect(() => {
    if (!isHovering || !hasMultipleImages) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovering, hasMultipleImages, displayImages.length]);

  const step = (delta: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + delta + displayImages.length) % displayImages.length);
  };

  return (
    <Link to={`/tours/${id}`} className="block group h-full">
      <article className="relative bg-card rounded-2xl overflow-hidden border border-border/50 card-hover h-full flex flex-col">
        <div
          className="relative aspect-[4/3] overflow-hidden bg-muted"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setCurrentImageIndex(0);
          }}
        >
          {displayImages.length > 0 ? (
            displayImages.map((img, index) =>
              // The first image always renders; the rest mount once the card is hovered.
              index === 0 || isHovering ? (
                <img
                  key={img}
                  src={img}
                  alt={index === 0 ? title : ""}
                  loading={priority && index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.03] ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : null
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              {t("tours.noImage")}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-white/95 text-foreground shadow-lg backdrop-blur-sm">
              {tour.price}
            </span>
          </div>

          {rating && reviews ? (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-sm font-medium bg-black/70 text-white backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-[#e7c779] text-[#e7c779]" />
                {rating}
              </span>
            </div>
          ) : null}

          {hasMultipleImages && isHovering && (
            <>
              <button
                onClick={step(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-2 transition-all shadow-lg z-10"
                aria-label={t("common.previousImage")}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={step(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-2 transition-all shadow-lg z-10"
                aria-label={t("common.nextImage")}
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {displayImages.map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 overflow-hidden ${
                      index === currentImageIndex ? "w-6 bg-white/40" : "w-1.5 bg-white/60"
                    }`}
                  >
                    {index === currentImageIndex && (
                      <span className="block h-full bg-white rounded-full" style={{ animation: "progress 2s linear infinite" }} />
                    )}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3
            className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">{description}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              {duration}
            </span>
            {groupSize && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" />
                {groupSize}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <span className="text-sm text-muted-foreground">
              {reviews ? t("tours.reviewsCount", { count: reviews }) : t("tours.newExperience")}
            </span>
            <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all duration-300">
              {t("tours.viewDetails")}
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export const TourCardSkeleton = () => (
  <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
    <div className="aspect-[4/3] bg-muted animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-muted rounded animate-pulse w-4/5" />
      <div className="h-4 bg-muted rounded animate-pulse" />
      <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
    </div>
  </div>
);

export default TourCard;
