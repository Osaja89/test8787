import { Button } from "@/components/ui/button";

const cities = [
  { name: "Karbala", icon: "🕌" },
  { name: "Najaf", icon: "🕍" },
  { name: "Baghdad", icon: "🏙️" },
  { name: "Kazmain", icon: "🕌" },
  { name: "Samarra", icon: "🕌" },
];

export const ExploreCities = () => {
  return (
    <section id="cities" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Iraq
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cities.map((city) => (
            <div key={city.name} className="city-card group cursor-pointer">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {city.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3">{city.name}</h3>
              <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                View Hotels
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
