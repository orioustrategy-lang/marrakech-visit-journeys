import { useState } from "react";
import TourCard from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import marrakechCity from "@/assets/marrakech-city.jpg";
import atlasMountains from "@/assets/atlas-mountains.jpg";
import agafayDesert from "@/assets/agafay-desert.jpg";
import ourikaValley from "@/assets/ourika-valley.jpg";
import heroDesert from "@/assets/hero-desert.jpg";

const Tours = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tours = [
    {
      id: "marrakech-city-tour",
      title: "Marrakech City Tour",
      image: marrakechCity,
      duration: "Full Day",
      groupSize: "2-15 people",
      price: "From €35",
      rating: 4.9,
      reviews: 342,
      description: "Explore the vibrant souks, historic palaces, and iconic Jemaa el-Fnaa square with an expert local guide.",
      category: "day-trip",
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
      category: "day-trip",
    },
    {
      id: "agafay-desert",
      title: "Agafay Desert Sunset Experience",
      image: agafayDesert,
      duration: "Half Day",
      groupSize: "2-20 people",
      price: "From €55",
      rating: 5.0,
      reviews: 428,
      description: "Enjoy a magical sunset with camel ride and traditional Moroccan dinner under the stars.",
      category: "activity",
    },
    {
      id: "ourika-valley",
      title: "Ourika Valley Day Trip",
      image: ourikaValley,
      duration: "Full Day",
      groupSize: "2-15 people",
      price: "From €40",
      rating: 4.7,
      reviews: 198,
      description: "Experience lush green valleys, waterfalls, and traditional Berber hospitality.",
      category: "day-trip",
    },
    {
      id: "sahara-desert-3day",
      title: "3-Day Sahara Desert Adventure",
      image: heroDesert,
      duration: "3 Days",
      groupSize: "2-8 people",
      price: "From €280",
      rating: 4.9,
      reviews: 156,
      description: "Epic journey to the Sahara dunes with camel trek, overnight in desert camp, and stunning landscapes.",
      category: "multi-day",
    },
    {
      id: "essaouira-day-trip",
      title: "Essaouira Coastal Day Trip",
      image: marrakechCity,
      duration: "Full Day",
      groupSize: "2-15 people",
      price: "From €45",
      rating: 4.6,
      reviews: 213,
      description: "Visit the charming coastal town of Essaouira with its historic medina and Atlantic beaches.",
      category: "day-trip",
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
