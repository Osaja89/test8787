import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Users, MapPin, ChevronRight, ChevronDown, ChevronLeft, Plus, List, Grid, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, addDays, eachDayOfInterval, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const airports = [
  { value: "najaf", label: "Najaf Airport" },
  { value: "baghdad", label: "Baghdad Airport" },
  { value: "basra", label: "Basra Airport" },
];

const ziaratsByCity = {
  Karbala: [
    { id: 1, name: "NEHR E AL QAMA", transport: "By walk", city: "Karbala", stayTime: "15 min" },
    { id: 2, name: "IMAM HUSSAIN SHRINE", transport: "By walk", city: "Karbala", stayTime: "2 hrs" },
    { id: 3, name: "HAZRAT ABBAS SHRINE", transport: "By walk", city: "Karbala", stayTime: "2 hrs" },
    { id: 4, name: "TILL E ZAINABIA", transport: "By walk", city: "Karbala", stayTime: "30 min" },
  ],
  Najaf: [
    { id: 5, name: "IMAM ALI SHRINE", transport: "By walk", city: "Najaf", stayTime: "3 hrs" },
    { id: 6, name: "WADI-US-SALAAM", transport: "By car", city: "Najaf", stayTime: "1 hr" },
    { id: 7, name: "MASJID KUFA", transport: "By car", city: "Najaf", stayTime: "2 hrs" },
  ],
  Baghdad: [
    { id: 8, name: "KAZMAIN SHRINE", transport: "By car", city: "Baghdad", stayTime: "2 hrs" },
    { id: 9, name: "ABU HANIFA MOSQUE", transport: "By car", city: "Baghdad", stayTime: "1 hr" },
  ],
  Kazmain: [
    { id: 10, name: "IMAM MUSA KAZIM SHRINE", transport: "By walk", city: "Kazmain", stayTime: "2 hrs" },
    { id: 11, name: "IMAM JAWAD SHRINE", transport: "By walk", city: "Kazmain", stayTime: "2 hrs" },
  ],
  Samarra: [
    { id: 12, name: "IMAM HADI SHRINE", transport: "By walk", city: "Samarra", stayTime: "2 hrs" },
    { id: 13, name: "IMAM ASKARI SHRINE", transport: "By walk", city: "Samarra", stayTime: "2 hrs" },
  ],
};

const cities = ["Karbala", "Najaf", "Baghdad", "Kazmain", "Samarra"];

const getIslamicDate = (date: Date) => {
  // Simplified Islamic date calculation (approximation)
  const gregorianDiff = Math.floor((date.getTime() - new Date(2026, 0, 3).getTime()) / (1000 * 60 * 60 * 24));
  const baseRajab = 14;
  return `Rajab ${baseRajab + gregorianDiff}, 1447 AH`;
};

const PlanZiarat = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2026, 0, 4),
    to: new Date(2026, 0, 11),
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [entryPoint, setEntryPoint] = useState("najaf");
  const [exitPoint, setExitPoint] = useState("baghdad");
  const [selectedTab, setSelectedTab] = useState<"all" | Date>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [openCities, setOpenCities] = useState<string[]>(["Karbala"]);
  const [dayPlans, setDayPlans] = useState<Record<string, { stayCity: string; ziarats: number[] }>>({});
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);

  // Calculate trip stats
  const tripDuration = dateRange.from && dateRange.to 
    ? differenceInDays(dateRange.to, dateRange.from) + 1 
    : 0;
  const totalTravelers = adults + children;
  const uniqueCities = new Set(Object.values(dayPlans).map(p => p.stayCity).filter(Boolean));
  const totalActivities = Object.values(dayPlans).reduce((acc, p) => acc + (p.ziarats?.length || 0), 0);

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        tripData: {
          duration: tripDuration,
          cities: uniqueCities.size || 2,
          activities: totalActivities,
          travelers: totalTravelers,
        },
        dateRange,
        dayPlans,
      },
    });
  };

  const tripDays = dateRange.from && dateRange.to
    ? eachDayOfInterval({ start: addDays(dateRange.from, -1), end: dateRange.to })
    : [];

  const toggleCity = (city: string) => {
    setOpenCities(prev => 
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const handleStayCityChange = (dateKey: string, city: string) => {
    setDayPlans(prev => ({
      ...prev,
      [dateKey]: { ...prev[dateKey], stayCity: city, ziarats: prev[dateKey]?.ziarats || [] }
    }));
  };

  const addZiaratToDay = (dateKey: string, ziaratId: number) => {
    setDayPlans(prev => ({
      ...prev,
      [dateKey]: {
        stayCity: prev[dateKey]?.stayCity || "Karbala",
        ziarats: [...(prev[dateKey]?.ziarats || []), ziaratId]
      }
    }));
  };

  const removeZiaratFromDay = (dateKey: string, ziaratId: number) => {
    setDayPlans(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        ziarats: prev[dateKey]?.ziarats.filter(id => id !== ziaratId) || []
      }
    }));
  };

  const getAllZiarats = () => Object.values(ziaratsByCity).flat();

  const getZiaratById = (id: number) => getAllZiarats().find(z => z.id === id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Search Bar */}
      <div className="bg-header pt-28 pb-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-2 flex flex-wrap items-center gap-2">
            {/* Trip Dates */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="search-field flex items-center gap-3 group cursor-pointer">
                  <Calendar className="w-5 h-5 text-primary" />
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
                  <Users className="w-5 h-5 text-primary" />
                  <div className="text-left flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Passengers</p>
                    <p className="text-sm font-medium text-foreground">{adults} Adults, {children} Children</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4" align="start">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Adults</span>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(Math.max(1, adults - 1))} disabled={adults <= 1}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{adults}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(adults + 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Children</span>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(Math.max(0, children - 1))} disabled={children <= 0}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{children}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(children + 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full mt-2" onClick={() => setIsPassengerOpen(false)}>Done</Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Entry Point */}
            <Popover open={isEntryOpen} onOpenChange={setIsEntryOpen}>
              <PopoverTrigger asChild>
                <div className="search-field flex items-center gap-3 group cursor-pointer">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="text-left flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Entry Point</p>
                    <p className="text-sm font-medium text-foreground">{airports.find(a => a.value === entryPoint)?.label}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="start">
                {airports.map((airport) => (
                  <button key={airport.value} className={cn("w-full text-left px-3 py-2 rounded-md text-sm transition-colors", entryPoint === airport.value ? "bg-primary text-primary-foreground" : "hover:bg-muted")} onClick={() => { setEntryPoint(airport.value); setIsEntryOpen(false); }}>
                    {airport.label}
                  </button>
                ))}
              </PopoverContent>
            </Popover>

            {/* Exit Point */}
            <Popover open={isExitOpen} onOpenChange={setIsExitOpen}>
              <PopoverTrigger asChild>
                <div className="search-field flex items-center gap-3 group cursor-pointer">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="text-left flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Exit Point</p>
                    <p className="text-sm font-medium text-foreground">{airports.find(a => a.value === exitPoint)?.label}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="start">
                {airports.map((airport) => (
                  <button key={airport.value} className={cn("w-full text-left px-3 py-2 rounded-md text-sm transition-colors", exitPoint === airport.value ? "bg-primary text-primary-foreground" : "hover:bg-muted")} onClick={() => { setExitPoint(airport.value); setIsExitOpen(false); }}>
                    {airport.label}
                  </button>
                ))}
              </PopoverContent>
            </Popover>

            <Button size="lg" className="h-14 w-14 rounded-lg p-0">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Date Tabs */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <button
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                selectedTab === "all" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
              onClick={() => setSelectedTab("all")}
            >
              ALL TRIP
            </button>

            {tripDays.map((day) => (
              <button
                key={day.toISOString()}
                className={cn(
                  "px-4 py-2 rounded-lg text-center whitespace-nowrap transition-all min-w-[100px]",
                  selectedTab instanceof Date && selectedTab.toDateString() === day.toDateString()
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
                onClick={() => setSelectedTab(day)}
              >
                <div className="text-xs font-medium">{format(day, "MMM d")}</div>
                <div className="text-[10px] opacity-70">{getIslamicDate(day)}</div>
              </button>
            ))}

            <Button variant="ghost" size="icon" className="shrink-0">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Ziarat Selection */}
          <div className="lg:w-80 shrink-0">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Select Ziarat</h2>
            
            <div className="space-y-2">
              {cities.map((city) => (
                <Collapsible key={city} open={openCities.includes(city)} onOpenChange={() => toggleCity(city)}>
                  <CollapsibleTrigger className="w-full">
                    <div className={cn(
                      "flex items-center justify-between p-4 rounded-lg transition-all",
                      openCities.includes(city) ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    )}>
                      <span className="font-semibold uppercase">{city}</span>
                      <ChevronDown className={cn("w-5 h-5 transition-transform", openCities.includes(city) && "rotate-180")} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-2 mt-2">
                      {ziaratsByCity[city as keyof typeof ziaratsByCity]?.map((ziarat) => (
                        <div
                          key={ziarat.id}
                          className="p-4 bg-card border rounded-lg hover:border-primary/50 transition-all cursor-pointer group"
                          draggable
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                {ziarat.name}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {ziarat.transport} | {ziarat.city}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {ziarat.stayTime} Stay time
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Right Content - Journey Overview */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-muted-foreground">
                Whole Journey Overview
              </h3>
              <div className="flex items-center gap-2">
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors",
                    viewMode === "list" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                  LIST
                </button>
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors",
                    viewMode === "grid" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                  GRID
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {tripDays.map((day) => {
                const dateKey = day.toISOString();
                const dayPlan = dayPlans[dateKey];

                return (
                  <div key={dateKey} className="bg-card border rounded-xl p-6 transition-all hover:shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">
                          {format(day, "EEEE, MMMM d, yyyy")}
                        </h4>
                        <p className="text-sm text-muted-foreground">{getIslamicDate(day)}</p>
                      </div>
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                        LOW
                      </span>
                    </div>

                    {/* Stay City Selection */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-5 h-5 border rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-primary/20 rounded" />
                        </div>
                        <span className="text-sm font-medium uppercase">Stay City:</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {cities.map((city) => (
                          <label key={city} className="flex items-center gap-2 cursor-pointer group">
                            <div className={cn(
                              "w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center",
                              dayPlan?.stayCity === city ? "border-primary" : "border-muted-foreground/30 group-hover:border-primary/50"
                            )}>
                              {dayPlan?.stayCity === city && (
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <span className={cn(
                              "text-sm transition-colors",
                              dayPlan?.stayCity === city ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground"
                            )}>
                              {city}
                            </span>
                            <input
                              type="radio"
                              name={`stayCity-${dateKey}`}
                              value={city}
                              checked={dayPlan?.stayCity === city}
                              onChange={() => handleStayCityChange(dateKey, city)}
                              className="sr-only"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Added Ziarats */}
                    {dayPlan?.ziarats && dayPlan.ziarats.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {dayPlan.ziarats.map((ziaratId) => {
                          const ziarat = getZiaratById(ziaratId);
                          if (!ziarat) return null;
                          return (
                            <div key={ziaratId} className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <div>
                                  <p className="font-medium text-sm">{ziarat.name}</p>
                                  <p className="text-xs text-muted-foreground">{ziarat.stayTime}</p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => removeZiaratFromDay(dateKey, ziaratId)}
                              >
                                Remove
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Add Ziarat Button */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="w-full border-2 border-dashed border-primary/30 rounded-lg py-8 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all group">
                          <Plus className="w-6 h-6 text-primary" />
                          <span className="text-primary font-medium text-sm uppercase">Add Ziarat</span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72 p-2" align="start">
                        <div className="space-y-1 max-h-64 overflow-y-auto">
                          {getAllZiarats().map((ziarat) => (
                            <button
                              key={ziarat.id}
                              className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                              onClick={() => addZiaratToDay(dateKey, ziarat.id)}
                            >
                              <p className="font-medium">{ziarat.name}</p>
                              <p className="text-xs text-muted-foreground">{ziarat.city} • {ziarat.stayTime}</p>
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                );
              })}
            </div>

            {/* Continue Button */}
            <div className="mt-8 flex justify-end">
              <Button size="lg" className="px-8">
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="outline" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Ziarat
          </Button>
          <Button size="lg" className="px-8" onClick={handleCheckout}>
            Checkout
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      <div className="pb-24" />
      <Footer />
    </div>
  );
};

export default PlanZiarat;
