import TourCard from "@/components/TourCard";
import { getDayTrips } from "@/data/tours";

const DayTrips = () => {
  const dayTrips = getDayTrips();

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary via-desert to-gold text-white py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Day Trips from Marrakech</h1>
          <p className="text-xl opacity-90">
            Explore Morocco's stunning landscapes and authentic villages
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <p className="text-lg text-muted-foreground">
            Escape the city for a day and discover the diverse beauty surrounding Marrakech. 
            From majestic mountains to serene valleys and dramatic deserts, our day trips offer 
            the perfect balance of adventure, culture, and relaxation.
          </p>
        </div>
      </section>

      {/* Day Trips Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dayTrips.map((trip) => (
              <TourCard key={trip.id} {...trip} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DayTrips;
