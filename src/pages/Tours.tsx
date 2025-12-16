import { useState } from "react";
import TourCard from "@/components/TourCard";
import SEO from "@/components/SEO";
import { tours } from "@/data/tours";
import { Search, SlidersHorizontal } from "lucide-react";

const Tours = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All" },
    { id: "activity", label: "Activities" },
    { id: "day-trip", label: "Day Trips" },
    { id: "tour", label: "Multi-Day Tours" },
    { id: "trekking", label: "Trekking" },
    { id: "airport-transfer", label: "Transfers" },
  ];

  const filteredTours = tours.filter(tour => {
    const matchesCategory = activeTab === "all" || tour.category === activeTab;
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="All Marrakech Tours & Experiences - Desert, Mountains, Day Trips"
        description="Browse 50+ authentic Morocco tours from Marrakech. Sahara desert adventures, Atlas mountains treks, Essaouira coastal trips, camel rides, quad biking & cultural experiences. Book with best price guarantee!"
        keywords="Marrakech tours list, Morocco excursions, day trips from Marrakech, desert tours Morocco, Atlas mountains tours, Essaouira trip, Ouzoud waterfalls, all Morocco tours, adventure tours Marrakech, cultural tours Morocco, trekking Morocco"
        url="https://www.marrakechdiscover.com/tours"
      />
      
      {/* Header */}
      <section className="relative py-20 bg-[#f1742a] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Experiences
            </h1>
            <p className="text-lg text-white/80">
              Discover Morocco's best adventures, from desert safaris to mountain treks and cultural immersions.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-full bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              />
            </div>
            
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === cat.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results count */}
      <section className="bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <p className="text-muted-foreground text-sm">
            Showing <span className="font-semibold text-foreground">{filteredTours.length}</span> experiences
            {activeTab !== "all" && ` in ${categories.find(c => c.id === activeTab)?.label}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="pb-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredTours.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No experiences found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => { setActiveTab("all"); setSearchQuery(""); }}
                className="text-primary font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour, index) => (
                <div 
                  key={tour.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <TourCard {...tour} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tours;
