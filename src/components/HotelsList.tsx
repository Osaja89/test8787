import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const filters = ["All", "Karbala", "Najaf", "Baghdad", "Kazmain", "Samarra"];

const hotels = [
  {
    id: 1,
    name: "Hotel Qasr Az Ziyafa 2",
    location: "Sharah Maisum Tammar, Karbala",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    badge: "Luxury",
    badgeClass: "hotel-badge-luxury",
    city: "Karbala",
  },
  {
    id: 2,
    name: "Hotel Golden Star",
    location: "Zain Al Abdeen Street, Najaf",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    badge: "Near Haram",
    badgeClass: "hotel-badge-near-haram",
    city: "Najaf",
  },
  {
    id: 3,
    name: "Hotel Rayat",
    location: "Sharah Muheet, Karbala",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
    badge: "Economy",
    badgeClass: "hotel-badge-economy",
    city: "Karbala",
  },
  {
    id: 4,
    name: "Qasr Al Dur",
    location: "Baghdad City Center",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop",
    badge: "Standard",
    badgeClass: "hotel-badge-standard",
    city: "Baghdad",
  },
];

export const HotelsList = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { ref, isVisible } = useScrollAnimation(0.1);

  const filteredHotels = activeFilter === "All" 
    ? hotels 
    : hotels.filter(hotel => hotel.city === activeFilter);

  return (
    <section id="hotels" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse Hotels By City
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a diverse range of hotels, from luxurious resorts to cozy boutiques.
          </p>
        </div>

        {/* Filter Tabs */}
        <div 
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="rounded-full transition-all duration-300 hover:scale-105"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Hotels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredHotels.map((hotel, index) => (
            <Card 
              key={hotel.id} 
              className={`hotel-card cursor-pointer transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms" }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover hotel-image"
                />
                <span className={`absolute top-3 left-3 ${hotel.badgeClass} transition-transform duration-300 hover:scale-110`}>
                  {hotel.badge}
                </span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 transition-colors duration-300 group-hover:text-primary">
                  {hotel.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {hotel.location}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-[1.02]"
                >
                  View Detail
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
