import { useState } from "react";
import TourCard from "@/components/TourCard";
import { Button } from "@/components/ui/button";

// Cooking Workshop
import cookingImg1 from "@/assets/Experiences/Depuis Marrakech  atelier culinaire et excursion d'une journée dans l'Atlas/012ab7a7cbfa9ca66f338c441c8f65ecd8a2e50191e4ed8212601aca6e28f802.avif";

// Agafay Sunset
import agafaySunsetImg1 from "@/assets/Experiences/Marrakech  Coucher de soleil dans le désert d'Agafay, balade à dos de chameau et dîner-spectacle/1861442009a86767d47645175c487c0f7863ddb904760dadbef03890f07fcd0.avif";

// Agafay Desert Dinner
import agafayDinnerImg1 from "@/assets/Experiences/Marrakech Agafay Desert Dinner Show, Camel Ride, 1 Quad/40c668de93f5ba133dd0788af8e7d6fc0a62d2083dcee7b5b23a20a34e1ac231.avif";

// Paragliding
import paraglidingImg1 from "@/assets/Experiences/Marrakech Paragliding over Agafay Desert & Atlas Mnt Views/28fb20d9691b341dd9495acef7ca084d6543a1de8925e841630134e90fc4fe8f.avif";

// Airport Transfer
import airportImg1 from "@/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/494926692d21999f77adced882342d586e04432066fd6210a555f93ae556a2fb.avif";

// Zip-Line
import ziplineImg1 from "@/assets/Experiences/Marrakech Zip-Line in the Atlas Mountains & Berber villages/5566e9157d95c740a63efb23ee5670f791c7bfece3434a570871a4a51d06d71f.avif";

const Tours = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tours = [
    {
      id: "cooking-workshop-atlas",
      title: "Depuis Marrakech : atelier culinaire et excursion d'une journée dans l'Atlas",
      image: cookingImg1,
      duration: "7 hours",
      groupSize: "2-15 people",
      price: "From €45",
      rating: 4.9,
      reviews: 320,
      description: "Discover Moroccan flavors with a hands-on cooking class in the Atlas Mountains. Learn to prepare traditional Berber dishes with fresh local ingredients.",
      category: "day-trip",
    },
    {
      id: "agafay-sunset-camel-dinner",
      title: "Marrakech : Coucher de soleil dans le désert d'Agafay, balade à dos de chameau et dîner-spectacle",
      image: agafaySunsetImg1,
      duration: "Half Day",
      groupSize: "2-20 people",
      price: "From €55",
      rating: 4.8,
      reviews: 450,
      description: "Enjoy a magical sunset with camel ride and traditional Moroccan dinner show in the stunning Agafay desert.",
      category: "activity",
    },
    {
      id: "agafay-dinner-quad",
      title: "Marrakech Agafay Desert Dinner Show, Camel Ride, 1 Quad",
      image: agafayDinnerImg1,
      duration: "Half Day",
      groupSize: "2-20 people",
      price: "From €65",
      rating: 4.9,
      reviews: 380,
      description: "Experience the ultimate Agafay adventure with quad biking, camel ride, and dinner show under the stars.",
      category: "activity",
    },
    {
      id: "paragliding-agafay",
      title: "Marrakech Paragliding over Agafay Desert & Atlas Mnt Views",
      image: paraglidingImg1,
      duration: "3-4 hours",
      groupSize: "1-8 people",
      price: "From €95",
      rating: 5.0,
      reviews: 215,
      description: "Soar above the stunning Agafay Desert and enjoy breathtaking views of the Atlas Mountains on this unforgettable paragliding experience.",
      category: "activity",
    },
    {
      id: "airport-transfer",
      title: "Marrakech Private One Way to/from Marrakech Airport",
      image: airportImg1,
      duration: "30-45 minutes",
      groupSize: "1-8 people",
      price: "From €15",
      rating: 4.7,
      reviews: 520,
      description: "Reliable and comfortable private transfer service between Marrakech Airport and your accommodation.",
      category: "activity",
    },
    {
      id: "zipline-atlas",
      title: "Marrakech Zip-Line in the Atlas Mountains & Berber villages",
      image: ziplineImg1,
      duration: "Half Day",
      groupSize: "2-12 people",
      price: "From €50",
      rating: 4.8,
      reviews: 280,
      description: "Experience an adrenaline-pumping zip-line adventure through the stunning Atlas Mountains and visit authentic Berber villages.",
      category: "activity",
    },
  ];

  const filteredTours = activeTab === "all" 
    ? tours 
    : tours.filter(tour => tour.category === activeTab);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary via-desert to-gold text-white py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tours & Experiences</h1>
          <p className="text-xl opacity-90">
            Discover the best of Morocco with our carefully curated tours
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-background border-b border-border sticky top-20 z-30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex gap-4 py-6 overflow-x-auto">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              onClick={() => setActiveTab("all")}
            >
              All Tours
            </Button>
            <Button
              variant={activeTab === "day-trip" ? "default" : "outline"}
              onClick={() => setActiveTab("day-trip")}
            >
              Day Trips
            </Button>
            <Button
              variant={activeTab === "multi-day" ? "default" : "outline"}
              onClick={() => setActiveTab("multi-day")}
            >
              Multi-Day Tours
            </Button>
            <Button
              variant={activeTab === "activity" ? "default" : "outline"}
              onClick={() => setActiveTab("activity")}
            >
              Activities
            </Button>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
