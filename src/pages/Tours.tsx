import { useState } from "react";
import TourCard from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import { tours } from "@/data/tours";

const Tours = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTours = activeTab === "all" 
    ? tours 
    : tours.filter(tour => {
        if (activeTab === "activity") return tour.category === "activity";
        if (activeTab === "airport-transfer") return tour.category === "airport-transfer";
        if (activeTab === "day-trip") return tour.category === "day-trip";
        if (activeTab === "tour") return tour.category === "tour";
        if (activeTab === "trekking") return tour.category === "trekking";
        return false;
      });

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
              variant={activeTab === "activity" ? "default" : "outline"}
              onClick={() => setActiveTab("activity")}
            >
              Activities
            </Button>
            <Button
              variant={activeTab === "airport-transfer" ? "default" : "outline"}
              onClick={() => setActiveTab("airport-transfer")}
            >
              Airport Transfer
            </Button>
            <Button
              variant={activeTab === "day-trip" ? "default" : "outline"}
              onClick={() => setActiveTab("day-trip")}
            >
              Day Trips
            </Button>
            <Button
              variant={activeTab === "tour" ? "default" : "outline"}
              onClick={() => setActiveTab("tour")}
            >
              Tours
            </Button>
            <Button
              variant={activeTab === "trekking" ? "default" : "outline"}
              onClick={() => setActiveTab("trekking")}
            >
              Trekking
            </Button>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredTours.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No tours found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tours;
