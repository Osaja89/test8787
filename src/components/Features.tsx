import { Globe, DollarSign, Building } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Globe,
    title: "Ziarat At Your Convenience",
    description:
      "ZiaratPlanner allows you to plan your ziarat at your leisure. So, Plan your complete tour itinerary for FREE!",
  },
  {
    icon: DollarSign,
    title: "Packages Suiting Your Budget",
    description:
      "ZiaratPlanner ensures to be affordable for everyone. Choose between our 3 packages: Economy, Standard and Deluxe.",
  },
  {
    icon: Building,
    title: "Find Accommodation In Iraq",
    description:
      "Providing you different options of accommodation in the Holy Land of Iraq, choose the hotel that best suits your requirement.",
  },
];

export const Features = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="packages" className="py-20 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`feature-card group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 feature-icon transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-primary">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
