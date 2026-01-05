import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const cities = [
  { name: "Karbala", icon: "🕌" },
  { name: "Najaf", icon: "🕍" },
  { name: "Baghdad", icon: "🏙️" },
  { name: "Kazmain", icon: "🕌" },
  { name: "Samarra", icon: "🕌" },
];

export const ExploreCities = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="cities" className="py-20 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <h2 
          className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Explore Iraq
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cities.map((city, index) => (
            <div 
              key={city.name} 
              className={`city-card group cursor-pointer transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <div className="text-5xl mb-4 city-icon animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                {city.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3 transition-colors duration-300 group-hover:text-primary">
                {city.name}
              </h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105"
              >
                View Hotels
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
