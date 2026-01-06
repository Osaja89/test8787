import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Coffee, 
  Utensils,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Grid3X3,
  List
} from "lucide-react";

const cities = ["All Cities", "Karbala", "Najaf", "Baghdad", "Kazmain", "Samarra"];
const categories = ["All", "Luxury", "Standard", "Economy", "Near Haram"];

const hotels = [
  {
    id: 1,
    name: "Hotel Qasr Az Ziyafa 2",
    location: "Sharah Maisum Tammar, Karbala",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    badge: "Luxury",
    badgeClass: "hotel-badge-luxury",
    city: "Karbala",
    rating: 4.8,
    reviews: 245,
    price: 120,
    distance: "200m from Haram",
    amenities: ["wifi", "parking", "breakfast", "restaurant"],
  },
  {
    id: 2,
    name: "Hotel Golden Star",
    location: "Zain Al Abdeen Street, Najaf",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    badge: "Near Haram",
    badgeClass: "hotel-badge-near-haram",
    city: "Najaf",
    rating: 4.5,
    reviews: 189,
    price: 95,
    distance: "150m from Haram",
    amenities: ["wifi", "breakfast", "restaurant"],
  },
  {
    id: 3,
    name: "Hotel Rayat",
    location: "Sharah Muheet, Karbala",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
    badge: "Economy",
    badgeClass: "hotel-badge-economy",
    city: "Karbala",
    rating: 4.2,
    reviews: 156,
    price: 55,
    distance: "500m from Haram",
    amenities: ["wifi", "breakfast"],
  },
  {
    id: 4,
    name: "Qasr Al Dur",
    location: "Baghdad City Center",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop",
    badge: "Standard",
    badgeClass: "hotel-badge-standard",
    city: "Baghdad",
    rating: 4.3,
    reviews: 98,
    price: 75,
    distance: "1km from center",
    amenities: ["wifi", "parking", "restaurant"],
  },
  {
    id: 5,
    name: "Al Safeer Hotel",
    location: "Near Imam Hussain Shrine, Karbala",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
    badge: "Luxury",
    badgeClass: "hotel-badge-luxury",
    city: "Karbala",
    rating: 4.9,
    reviews: 312,
    price: 150,
    distance: "100m from Haram",
    amenities: ["wifi", "parking", "breakfast", "restaurant"],
  },
  {
    id: 6,
    name: "Najaf Grand Hotel",
    location: "Imam Ali Street, Najaf",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    badge: "Near Haram",
    badgeClass: "hotel-badge-near-haram",
    city: "Najaf",
    rating: 4.6,
    reviews: 267,
    price: 110,
    distance: "180m from Haram",
    amenities: ["wifi", "parking", "breakfast", "restaurant"],
  },
  {
    id: 7,
    name: "Kazmain Palace Hotel",
    location: "Near Kazmain Shrine",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop",
    badge: "Standard",
    badgeClass: "hotel-badge-standard",
    city: "Kazmain",
    rating: 4.4,
    reviews: 134,
    price: 85,
    distance: "250m from Haram",
    amenities: ["wifi", "breakfast", "restaurant"],
  },
  {
    id: 8,
    name: "Samarra View Hotel",
    location: "Near Al-Askari Shrine, Samarra",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    badge: "Economy",
    badgeClass: "hotel-badge-economy",
    city: "Samarra",
    rating: 4.1,
    reviews: 87,
    price: 45,
    distance: "300m from Shrine",
    amenities: ["wifi", "breakfast"],
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-4 h-4" />,
  parking: <Car className="w-4 h-4" />,
  breakfast: <Coffee className="w-4 h-4" />,
  restaurant: <Utensils className="w-4 h-4" />,
};

const PlanZiarat = () => {
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredHotels = hotels.filter((hotel) => {
    const matchesCity = selectedCity === "All Cities" || hotel.city === selectedCity;
    const matchesCategory = selectedCategory === "All" || hotel.badge === selectedCategory;
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    return matchesCity && matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Discover comfortable hotels near sacred shrines for your spiritual journey
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-xl shadow-lg p-4 flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-0 bg-muted/50"
                />
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-12 px-4 rounded-lg bg-muted/50 border-0 text-foreground min-w-[150px]"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
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
                      setSelectedCity("All Cities");
                      setSelectedCategory("All");
                      setPriceRange([0, 200]);
                    }}
                  >
                    Clear All
                  </Button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label 
                        key={category}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox 
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* City Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">City</h4>
                  <div className="space-y-2">
                    {cities.map((city) => (
                      <label 
                        key={city}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox 
                          checked={selectedCity === city}
                          onCheckedChange={() => setSelectedCity(city)}
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">
                          {city}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
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

                {/* Amenities */}
                <div>
                  <h4 className="font-medium mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {Object.entries(amenityIcons).map(([key, icon]) => (
                      <label 
                        key={key}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox />
                        <span className="flex items-center gap-2 text-sm group-hover:text-primary transition-colors">
                          {icon}
                          <span className="capitalize">{key}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Hotels Grid */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredHotels.length}</span> hotels found
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

              {/* Hotels */}
              <div className={viewMode === "grid" 
                ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
              }>
                {filteredHotels.map((hotel) => (
                  <Card 
                    key={hotel.id}
                    className={`hotel-card cursor-pointer overflow-hidden ${
                      viewMode === "list" ? "flex flex-row" : ""
                    }`}
                  >
                    <div className={`relative overflow-hidden ${
                      viewMode === "list" ? "w-64 shrink-0" : ""
                    }`}>
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className={`object-cover hotel-image ${
                          viewMode === "list" ? "w-full h-full" : "w-full h-48"
                        }`}
                      />
                      <span className={`absolute top-3 left-3 ${hotel.badgeClass}`}>
                        {hotel.badge}
                      </span>
                    </div>
                    <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{hotel.name}</h3>
                        <div className="flex items-center gap-1 text-sm shrink-0">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="font-medium">{hotel.rating}</span>
                          <span className="text-muted-foreground">({hotel.reviews})</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {hotel.location}
                      </p>
                      <p className="text-xs text-primary font-medium mb-3">
                        {hotel.distance}
                      </p>
                      <div className="flex items-center gap-2 mb-4">
                        {hotel.amenities.map((amenity) => (
                          <span 
                            key={amenity}
                            className="p-2 bg-muted rounded-lg text-muted-foreground"
                            title={amenity}
                          >
                            {amenityIcons[amenity]}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">${hotel.price}</span>
                          <span className="text-muted-foreground text-sm">/night</span>
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredHotels.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No hotels found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSelectedCity("All Cities");
                      setSelectedCategory("All");
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

export default PlanZiarat;
