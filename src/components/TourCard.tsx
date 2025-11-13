import { Link } from "react-router-dom";
import { Clock, Users, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TourCardProps {
  id: string;
  title: string;
  image: string;
  duration: string;
  groupSize: string;
  price: string;
  rating: number;
  reviews: number;
  description: string;
}

const TourCard = ({
  id,
  title,
  image,
  duration,
  groupSize,
  price,
  rating,
  reviews,
  description,
}: TourCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
          {price}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-gold text-gold" />
          <span className="font-semibold">{rating}</span>
          <span className="text-muted-foreground text-sm">({reviews} reviews)</span>
        </div>

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
        <Link to={`/tours/${id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
