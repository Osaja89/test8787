import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Calendar,
  Users,
  Clock,
  Star,
  Check,
  Plane,
  Hotel,
  Bus,
  Utensils,
  SlidersHorizontal,
  Grid3X3,
  List
} from "lucide-react";

const destinations = ["All Destinations", "Karbala", "Najaf", "Baghdad", "Kazmain", "Samarra", "All Cities"];
const durations = ["All", "3-5 Days", "7-10 Days", "14+ Days"];
const packageTypes = ["All", "Economy", "Standard", "Premium", "VIP"];

const packages = [
  {
    id: 1,
    name: "Arbaeen Special Package",
    destination: "Karbala & Najaf",
    image: "https://images.unsplash.com/photo-1564769625392-651b89c75a77?w=600&h=400&fit=crop",
    duration: "7 Days / 6 Nights",
    groupSize: "15-20 persons",
    price: 899,
    originalPrice: 1099,
    rating: 4.9,
    reviews: 234,
    type: "Premium",
    includes: ["Flight", "Hotel", "Transport", "Meals", "Guide"],
    highlights: ["Imam Hussain Shrine", "Imam Ali Shrine", "Kufa Mosque", "Sahla Mosque"],
    departureDate: "Jan 15, 2026",
    featured: true,
  },
  {
    id: 2,
    name: "Budget Ziarat Package",
    destination: "Karbala",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
    duration: "4 Days / 3 Nights",
    groupSize: "20-25 persons",
    price: 399,
    originalPrice: 499,
    rating: 4.5,
    reviews: 156,
    type: "Economy",
    includes: ["Hotel", "Transport", "Breakfast"],
    highlights: ["Imam Hussain Shrine", "Imam Abbas Shrine"],
    departureDate: "Jan 20, 2026",
    featured: false,
  },
  {
    id: 3,
    name: "Complete Iraq Ziarat",
    destination: "All Cities",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    duration: "14 Days / 13 Nights",
    groupSize: "10-15 persons",
    price: 1899,
    originalPrice: 2299,
    rating: 5.0,
    reviews: 89,
    type: "VIP",
    includes: ["Flight", "Hotel", "Transport", "Meals", "Guide", "Visa"],
    highlights: ["All Holy Shrines", "Historical Sites", "Local Experience"],
    departureDate: "Feb 1, 2026",
    featured: true,
  },
  {
    id: 4,
    name: "Najaf Spiritual Journey",
    destination: "Najaf",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    duration: "5 Days / 4 Nights",
    groupSize: "15-20 persons",
    price: 549,
    originalPrice: 699,
    rating: 4.7,
    reviews: 198,
    type: "Standard",
    includes: ["Hotel", "Transport", "Meals", "Guide"],
    highlights: ["Imam Ali Shrine", "Wadi-us-Salaam", "Kufa Mosque"],
    departureDate: "Jan 25, 2026",
    featured: false,
  },
  {
    id: 5,
    name: "Kazmain & Samarra Tour",
    destination: "Baghdad",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop",
    duration: "6 Days / 5 Nights",
    groupSize: "15-20 persons",
    price: 749,
    originalPrice: 899,
    rating: 4.6,
    reviews: 145,
    type: "Standard",
    includes: ["Hotel", "Transport", "Meals", "Guide"],
    highlights: ["Kazmain Shrine", "Al-Askari Shrine", "Baghdad Sites"],
    departureDate: "Feb 5, 2026",
    featured: false,
  },
  {
    id: 6,
    name: "Luxury Ziarat Experience",
    destination: "Karbala & Najaf",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
    duration: "10 Days / 9 Nights",
    groupSize: "8-10 persons",
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 67,
    type: "VIP",
    includes: ["Business Flight", "5-Star Hotel", "Private Transport", "All Meals", "Personal Guide", "Visa"],
    highlights: ["VIP Access", "Private Tours", "Exclusive Experience"],
    departureDate: "Feb 10, 2026",
    featured: true,
  },
];

const includeIcons: Record<string, React.ReactNode> = {
  "Flight": <Plane className="w-4 h-4" />,
  "Business Flight": <Plane className="w-4 h-4" />,
  "Hotel": <Hotel className="w-4 h-4" />,
  "5-Star Hotel": <Hotel className="w-4 h-4" />,
  "Transport": <Bus className="w-4 h-4" />,
  "Private Transport": <Bus className="w-4 h-4" />,
  "Meals": <Utensils className="w-4 h-4" />,
  "All Meals": <Utensils className="w-4 h-4" />,
  "Breakfast": <Utensils className="w-4 h-4" />,
};

const typeStyles: Record<string, string> = {
  "Economy": "bg-emerald-500 text-white",
  "Standard": "bg-blue-500 text-white",
  "Premium": "bg-purple-500 text-white",
  "VIP": "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
};

const Packages = () => {
  const [selectedDestination, setSelectedDestination] = useState("All Destinations");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredPackages = packages.filter((pkg) => {
    const matchesDestination = selectedDestination === "All Destinations" || 
                               pkg.destination.includes(selectedDestination) ||
                               pkg.destination === selectedDestination;
    const matchesType = selectedType === "All" || pkg.type === selectedType;
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    
    let matchesDuration = selectedDuration === "All";
    if (selectedDuration === "3-5 Days") {
      matchesDuration = pkg.duration.includes("3") || pkg.duration.includes("4") || pkg.duration.includes("5");
    } else if (selectedDuration === "7-10 Days") {
      matchesDuration = pkg.duration.includes("7") || pkg.duration.includes("10") || pkg.duration.includes("6");
    } else if (selectedDuration === "14+ Days") {
      matchesDuration = pkg.duration.includes("14");
    }
    
    return matchesDestination && matchesType && matchesSearch && matchesPrice && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Ziarat Travel Packages
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Choose from our carefully curated packages for your spiritual journey to holy shrines
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-xl shadow-lg p-4 flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-0 bg-muted/50"
                />
              </div>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="h-12 px-4 rounded-lg bg-muted/50 border-0 text-foreground min-w-[150px]"
              >
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
              <Button size="lg" className="h-12 px-8">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages Banner */}
      <section className="py-6 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
            <Star className="w-4 h-4 fill-primary" />
            <span>Special Arbaeen packages now available with early bird discounts!</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedDestination("All Destinations");
                      setSelectedType("All");
                      setSelectedDuration("All");
                      setPriceRange([0, 3000]);
                    }}
                  >
                    Clear All
                  </Button>
                </div>

                {/* Package Type Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Package Type</h4>
                  <div className="space-y-2">
                    {packageTypes.map((type) => (
                      <label 
                        key={type}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox 
                          checked={selectedType === type}
                          onCheckedChange={() => setSelectedType(type)}
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Duration</h4>
                  <div className="space-y-2">
                    {durations.map((duration) => (
                      <label 
                        key={duration}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox 
                          checked={selectedDuration === duration}
                          onCheckedChange={() => setSelectedDuration(duration)}
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">
                          {duration}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Destination Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Destination</h4>
                  <div className="space-y-2">
                    {destinations.map((dest) => (
                      <label 
                        key={dest}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox 
                          checked={selectedDestination === dest}
                          onCheckedChange={() => setSelectedDestination(dest)}
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">
                          {dest}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="h-10"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input 
                      type="number" 
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* Packages Grid */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredPackages.length}</span> packages found
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Packages */}
              <div className={viewMode === "grid" 
                ? "grid md:grid-cols-2 xl:grid-cols-2 gap-6"
                : "flex flex-col gap-6"
              }>
                {filteredPackages.map((pkg) => (
                  <Card 
                    key={pkg.id}
                    className={`hotel-card cursor-pointer overflow-hidden ${
                      viewMode === "list" ? "flex flex-row" : ""
                    } ${pkg.featured ? "ring-2 ring-primary/20" : ""}`}
                  >
                    <div className={`relative overflow-hidden ${
                      viewMode === "list" ? "w-72 shrink-0" : ""
                    }`}>
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className={`object-cover hotel-image ${
                          viewMode === "list" ? "w-full h-full" : "w-full h-56"
                        }`}
                      />
                      <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${typeStyles[pkg.type]}`}>
                        {pkg.type}
                      </span>
                      {pkg.featured && (
                        <span className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </span>
                      )}
                      {pkg.originalPrice > pkg.price && (
                        <span className="absolute bottom-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Save ${pkg.originalPrice - pkg.price}
                        </span>
                      )}
                    </div>
                    <CardContent className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{pkg.name}</h3>
                        <div className="flex items-center gap-1 text-sm shrink-0">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="font-medium">{pkg.rating}</span>
                          <span className="text-muted-foreground">({pkg.reviews})</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-primary font-medium mb-3 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {pkg.destination}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {pkg.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {pkg.groupSize}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {pkg.departureDate}
                        </span>
                      </div>

                      {/* Includes */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pkg.includes.slice(0, 4).map((item) => (
                          <span 
                            key={item}
                            className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                          >
                            {includeIcons[item] || <Check className="w-3 h-3" />}
                            {item}
                          </span>
                        ))}
                        {pkg.includes.length > 4 && (
                          <span className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                            +{pkg.includes.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Highlights */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {pkg.highlights.slice(0, 3).map((highlight) => (
                            <Badge key={highlight} variant="secondary" className="text-xs font-normal">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          {pkg.originalPrice > pkg.price && (
                            <span className="text-sm text-muted-foreground line-through mr-2">
                              ${pkg.originalPrice}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-primary">${pkg.price}</span>
                          <span className="text-muted-foreground text-sm">/person</span>
                        </div>
                        <Button>View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPackages.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No packages found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSelectedDestination("All Destinations");
                      setSelectedType("All");
                      setSelectedDuration("All");
                      setSearchQuery("");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
