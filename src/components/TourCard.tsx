import { Link } from "react-router-dom";
import { useState } from "react";
import { Clock, Users, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  
  const displayImages = images && images.length > 0 ? images : (image ? [image] : []);
  const hasMultipleImages = displayImages.length > 1;
  
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
    <Link to={`/tours/${id}`} className="block">
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
        {displayImages.length > 0 && (
          <div 
            className="relative overflow-hidden h-64"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img
              src={displayImages[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold z-10">
              {price}
            </div>
            
            {/* Image Navigation Arrows - Show on hover if multiple images */}
            {hasMultipleImages && isHovering && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {displayImages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "w-6 bg-white"
                          : "w-1.5 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        {displayImages.length === 0 && (
          <div className="relative overflow-hidden h-64 bg-gradient-to-br from-primary/20 to-desert/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🏔️</div>
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                {price}
              </div>
            </div>
          </div>
        )}
        
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {rating && reviews && (
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="font-semibold">{rating}</span>
              <span className="text-muted-foreground text-sm">({reviews} reviews)</span>
            </div>
          )}

          <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{groupSize}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button className="w-full">View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TourCard;
