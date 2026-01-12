import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, MapPin, CheckCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface TripData {
  duration: number;
  cities: number;
  activities: number;
  travelers: number;
}

// Base prices per day per person
const BASE_PRICES = {
  economy: {
    perDayPerPerson: 50,
    perActivity: 5,
    perCity: 15,
  },
  standard: {
    perDayPerPerson: 85,
    perActivity: 8,
    perCity: 25,
  },
  deluxe: {
    perDayPerPerson: 160,
    perActivity: 15,
    perCity: 40,
  },
};

const packageFeatures = {
  economy: [
    "3-STAR ACCOMMODATION",
    "SHARED BUS TRANSPORT",
    "BREAKFAST INCLUDED",
    "GROUP GUIDE",
  ],
  standard: [
    "4-STAR HOTELS (NEAR HARAM)",
    "PRIVATE SALON CAR",
    "BREAKFAST & DINNER",
    "DEDICATED GUIDE",
  ],
  deluxe: [
    "5-STAR LUXURY HOTELS",
    "VIP SUV TRANSPORT",
    "FULL BOARD (3 MEALS)",
    "PERSONAL SCHOLAR GUIDE",
  ],
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Get trip data from PlanZiarat
  const tripData: TripData = location.state?.tripData || {
    duration: 8,
    cities: 2,
    activities: 0,
    travelers: 1,
  };

  // Calculate dynamic prices based on trip data
  const calculatePrice = (tier: "economy" | "standard" | "deluxe") => {
    const pricing = BASE_PRICES[tier];
    const { duration, cities, activities, travelers } = tripData;
    
    // Base calculation: (days × per day rate × travelers) + (activities × activity rate) + (cities × city rate)
    const basePrice = duration * pricing.perDayPerPerson * travelers;
    const activityPrice = activities * pricing.perActivity * travelers;
    const cityPrice = cities * pricing.perCity * travelers;
    
    return Math.round(basePrice + activityPrice + cityPrice);
  };

  const packages = [
    {
      id: "economy",
      name: "ECONOMY PACKAGE",
      price: calculatePrice("economy"),
      features: packageFeatures.economy,
      highlighted: false,
    },
    {
      id: "standard",
      name: "STANDARD PACKAGE",
      price: calculatePrice("standard"),
      features: packageFeatures.standard,
      highlighted: false,
    },
    {
      id: "deluxe",
      name: "DELUXE PACKAGE",
      price: calculatePrice("deluxe"),
      features: packageFeatures.deluxe,
      highlighted: true,
    },
  ];

  const handleSelectPlan = (packageId: string) => {
    setSelectedPackage(packageId);
    const pkg = packages.find((p) => p.id === packageId);
    navigate("/finalize-booking", {
      state: {
        tripData,
        selectedPackage: pkg,
      },
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      <Header />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Itinerary Summary */}
          <div className="bg-card rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground uppercase tracking-wide">
                  Itinerary Summary
                </h1>
                <p className="text-muted-foreground mt-1 uppercase text-sm tracking-wider">
                  Based on your specific travel plan
                </p>
              </div>

              <div className="flex flex-wrap gap-6 lg:gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Duration
                    </p>
                    <p className="font-semibold text-foreground">
                      {tripData.duration} Days
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Cities
                    </p>
                    <p className="font-semibold text-foreground">
                      {tripData.cities} Stops
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Activities
                    </p>
                    <p className="font-semibold text-foreground">
                      {tripData.activities} Items
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Travelers
                    </p>
                    <p className="font-semibold text-foreground">
                      {tripData.travelers} Pax
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Choose Your Tier */}
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground uppercase tracking-wide">
              Choose Your Tier
            </h2>
            <p className="text-muted-foreground mt-3 uppercase text-sm tracking-widest">
              Prices are dynamic and include your custom itinerary items
            </p>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={cn(
                  "bg-card rounded-2xl p-8 transition-all duration-300 relative",
                  pkg.highlighted
                    ? "ring-2 ring-primary shadow-2xl scale-105"
                    : "shadow-lg hover:shadow-xl"
                )}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wide">
                    Recommended
                  </div>
                )}

                <div className="mb-6">
                  <p
                    className={cn(
                      "text-4xl font-bold",
                      pkg.highlighted ? "text-primary" : "text-foreground"
                    )}
                  >
                    $ {pkg.price.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground uppercase text-sm tracking-wider mt-1">
                    {pkg.name}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground uppercase tracking-wide">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(pkg.id)}
                  className={cn(
                    "w-full py-4 rounded-xl font-semibold uppercase tracking-wide transition-all duration-300",
                    pkg.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
