import { useState } from "react";
import { Calendar, Users, MapPin, ChevronRight, ChevronDown, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-shrine.jpg";

const airports = [
  { value: "najaf", label: "Najaf Airport" },
  { value: "baghdad", label: "Baghdad Airport" },
  { value: "basra", label: "Basra Airport" },
];

export const HeroSection = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2026, 0, 4),
    to: new Date(2026, 0, 11),
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [entryPoint, setEntryPoint] = useState("najaf");
  const [exitPoint, setExitPoint] = useState("baghdad");
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);

  const handleSearch = () => {
    navigate("/plan-ziarat");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="hero-gradient absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="animate-fade-in">
          <p className="inline-block px-6 py-2 mb-6 text-sm font-medium tracking-[0.3em] uppercase bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-pulse-glow">
            Iraq's First And Only
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Ziarat Planner And<br />Hotel Portal
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold btn-animated hover:scale-105 transition-transform duration-300"
              onClick={() => navigate("/plan-ziarat")}
            >
              PLAN ZIARAT
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold bg-white/10 border-white/30 text-white hover:bg-white hover:text-foreground hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🔍 SEARCH HOTEL
            </Button>
          </div>
        </div>

        {/* Search Box */}
        <div className="animate-slide-up max-w-5xl mx-auto" style={{ animationDelay: "0.3s" }}>
          <div className="search-box">
            {/* Trip Dates */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="search-field flex items-center gap-3 group cursor-pointer">
                  <Calendar className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <div className="text-left flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Trip Dates</p>
                    <p className="text-sm font-medium text-foreground">
                      {dateRange.from && dateRange.to
                        ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                        : "Select dates"}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                  numberOfMonths={2}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Passengers */}
            <Popover open={isPassengerOpen} onOpenChange={setIsPassengerOpen}>
              <PopoverTrigger asChild>
                <div className="search-field flex items-center gap-3 group cursor-pointer">
                  <Users className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <div className="text-left flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Passengers</p>
                    <p className="text-sm font-medium text-foreground">{adults} Adults, {children} Children</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4" align="start">
                <div className="space-y-4">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Adults</span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        disabled={adults <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{adults}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setAdults(adults + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Children</span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        disabled={children <= 0}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{children}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setChildren(children + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-2" 
                    onClick={() => setIsPassengerOpen(false)}
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Entry Point */}
            <Popover open={isEntryOpen} onOpenChange={setIsEntryOpen}>
              <PopoverTrigger asChild>
                <div className="search-field flex items-center gap-3 group cursor-pointer">
                  <MapPin className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <div className="text-left flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Entry Point</p>
                    <p className="text-sm font-medium text-foreground">
                      {airports.find(a => a.value === entryPoint)?.label}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="start">
                <div className="space-y-1">
                  {airports.map((airport) => (
                    <button
                      key={airport.value}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        entryPoint === airport.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                      onClick={() => {
                        setEntryPoint(airport.value);
                        setIsEntryOpen(false);
                      }}
                    >
                      {airport.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Exit Point */}
            <Popover open={isExitOpen} onOpenChange={setIsExitOpen}>
              <PopoverTrigger asChild>
                <div className="search-field flex items-center gap-3 group cursor-pointer">
                  <MapPin className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <div className="text-left flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Exit Point</p>
                    <p className="text-sm font-medium text-foreground">
                      {airports.find(a => a.value === exitPoint)?.label}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="start">
                <div className="space-y-1">
                  {airports.map((airport) => (
                    <button
                      key={airport.value}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        exitPoint === airport.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                      onClick={() => {
                        setExitPoint(airport.value);
                        setIsExitOpen(false);
                      }}
                    >
                      {airport.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Search Button */}
            <Button 
              size="lg" 
              className="h-14 w-14 rounded-lg p-0 btn-animated hover:scale-110 transition-transform duration-300"
              onClick={handleSearch}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
