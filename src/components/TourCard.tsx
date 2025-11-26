import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Clock, Users, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface TourCardProps {
  id: string;
  title: string;
  image?: string;
  images?: string[];
  duration: string;
  groupSize: string;
  price: string;
  rating?: number;
  reviews?: number;
  description: string;
}

const TourCard = ({
  id,
  title,
  image,
  images,
  duration,
  groupSize,
  price,
  rating,
  reviews,
  description,
}: TourCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const displayImages = images && images.length > 0 ? images : (image ? [image] : []);
  const hasMultipleImages = displayImages.length > 1;

  // Auto-scroll images when hovering
  useEffect(() => {
    if (isHovering && hasMultipleImages) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, hasMultipleImages, displayImages.length]);
  
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <Link to={`/tours/${id}`} className="block group">
      <article className="relative bg-card rounded-2xl overflow-hidden border border-border/50 card-hover h-full flex flex-col">
        {/* Image Container */}
        <div 
          className="relative aspect-[4/3] overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setCurrentImageIndex(0); // Reset to first image when not hovering
          }}
        >
          {displayImages.length > 0 ? (
            <>
              {displayImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${title} - Image ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </>
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <div className="text-muted-foreground text-center p-4">
                <span className="text-4xl block mb-2">🏔</span>
                <span className="text-sm">No image available</span>
              </div>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Price badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-white/95 text-foreground shadow-lg backdrop-blur-sm">
              {price}
            </span>
          </div>

          {/* Rating badge */}
          {rating && reviews && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-sm font-medium bg-black/70 text-white backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-[#e7c779] text-[#e7c779]" />
                {rating}
              </span>
            </div>
          )}
          
          {/* Image Navigation */}
          {hasMultipleImages && isHovering && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-2 transition-all shadow-lg z-10 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-2 transition-all shadow-lg z-10 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              
              {/* Image dots with progress */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {displayImages.slice(0, 5).map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 overflow-hidden ${
                      index === currentImageIndex
                        ? "w-6 bg-white/40"
                        : "w-1.5 bg-white/60"
                    }`}
                  >
                    {index === currentImageIndex && isHovering && (
                      <span 
                        className="block h-full bg-white rounded-full"
                        style={{
                          animation: 'progress 2s linear infinite'
                        }}
                      />
                    )}
                  </span>
                ))}
                {displayImages.length > 5 && (
                  <span className="text-white text-xs ml-1">+{displayImages.length - 5}</span>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
            {description}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              {duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" />
              {groupSize}
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <span className="text-sm text-muted-foreground">
              {reviews ? `${reviews} reviews` : "New experience"}
            </span>
            <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all duration-300">
              View Details
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default TourCard;
