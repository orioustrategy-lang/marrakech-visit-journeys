import TourCard from "@/components/TourCard";
import ourikaValley from "@/assets/ourika-valley.jpg";
import atlasMountains from "@/assets/atlas-mountains.jpg";
import agafayDesert from "@/assets/agafay-desert.jpg";
import marrakechCity from "@/assets/marrakech-city.jpg";

const DayTrips = () => {
  const dayTrips = [
    {
      id: "ourika-valley",
      title: "Ourika Valley Day Trip",
      image: ourikaValley,
      duration: "Full Day",
      groupSize: "2-15 people",
      price: "From €40",
      rating: 4.7,
      reviews: 198,
      description: "Experience lush green valleys, waterfalls, and traditional Berber hospitality in the Atlas foothills.",
    },
    {
      id: "atlas-mountains",
      title: "Atlas Mountains & Berber Villages",
      image: atlasMountains,
      duration: "Full Day",
      groupSize: "2-12 people",
      price: "From €45",
      rating: 4.8,
      reviews: 267,
      description: "Discover stunning mountain landscapes and authentic Berber culture in traditional villages.",
    },
    {
      id: "agafay-desert-day",
      title: "Agafay Desert Day Experience",
      image: agafayDesert,
      duration: "Full Day",
      groupSize: "2-20 people",
      price: "From €50",
      rating: 4.9,
      reviews: 341,
      description: "Explore the rocky Agafay desert with camel riding, lunch, and panoramic views.",
    },
    {
      id: "essaouira",
      title: "Essaouira Coastal Town",
      image: marrakechCity,
      duration: "Full Day",
      groupSize: "2-15 people",
      price: "From €45",
      rating: 4.6,
      reviews: 213,
      description: "Visit the charming coastal town of Essaouira with its historic medina and Atlantic beaches.",
    },
    {
      id: "ouzoud-waterfalls",
      title: "Ouzoud Waterfalls",
      image: ourikaValley,
      duration: "Full Day",
      groupSize: "2-15 people",
      price: "From €40",
      rating: 4.8,
      reviews: 286,
      description: "Marvel at Morocco's highest waterfalls with optional boat rides and local wildlife spotting.",
    },
    {
      id: "imlil-valley",
      title: "Imlil Valley & Mount Toubkal Base",
      image: atlasMountains,
      duration: "Full Day",
      groupSize: "2-10 people",
      price: "From €50",
      rating: 4.9,
      reviews: 167,
      description: "Trek to the base of North Africa's highest peak through picturesque Berber villages.",
    },
  ];

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
