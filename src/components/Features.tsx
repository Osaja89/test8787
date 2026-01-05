import { Globe, DollarSign, Building } from "lucide-react";

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
  return (
    <section id="packages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
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
