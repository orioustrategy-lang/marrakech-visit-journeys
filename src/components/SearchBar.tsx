import { useState } from "react";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    // Navigate to tours page with search parameters
    navigate("/tours");
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-card rounded-2xl shadow-2xl p-2 border border-border/50 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Destination */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
            <MapPin className="h-5 w-5" />
          </div>
          <Input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-10 h-14 border-0 bg-background/50 focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          />
        </div>

        {/* Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-14 justify-start text-left font-normal border-0 bg-background/50 hover:bg-background rounded-xl",
                !date && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {date ? format(date, "PPP") : "When?"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {/* Guests */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
            <Users className="h-5 w-5" />
          </div>
          <Input
            type="number"
            min="1"
            max="20"
            placeholder="Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="pl-10 h-14 border-0 bg-background/50 focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          />
        </div>

        {/* Search Button */}
        <Button
          size="lg"
          onClick={handleSearch}
          className="h-14 gap-2 text-base font-semibold rounded-xl"
        >
          <Search className="h-5 w-5" />
          Search
        </Button>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 mt-4 px-2">
        <button
          onClick={() => {
            setDestination("Atlas Mountains");
            navigate("/tours");
          }}
          className="px-3 py-1.5 text-sm bg-secondary/20 hover:bg-secondary/30 rounded-full text-foreground transition-colors"
        >
          Atlas Mountains
        </button>
        <button
          onClick={() => {
            setDestination("Agafay Desert");
            navigate("/tours");
          }}
          className="px-3 py-1.5 text-sm bg-secondary/20 hover:bg-secondary/30 rounded-full text-foreground transition-colors"
        >
          Agafay Desert
        </button>
        <button
          onClick={() => {
            setDestination("Merzouga");
            navigate("/tours");
          }}
          className="px-3 py-1.5 text-sm bg-secondary/20 hover:bg-secondary/30 rounded-full text-foreground transition-colors"
        >
          Sahara Desert
        </button>
        <button
          onClick={() => {
            setDestination("Essaouira");
            navigate("/tours");
          }}
          className="px-3 py-1.5 text-sm bg-secondary/20 hover:bg-secondary/30 rounded-full text-foreground transition-colors"
        >
          Essaouira
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
