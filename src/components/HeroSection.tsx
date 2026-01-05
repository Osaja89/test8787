import { Calendar, Users, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-shrine.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="hero-gradient absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="animate-fade-in">
          <p className="inline-block px-6 py-2 mb-6 text-sm font-medium tracking-[0.3em] uppercase bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            Iraq's First And Only
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Ziarat Planner And<br />Hotel Portal
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="px-8 py-6 text-lg font-semibold">
              PLAN ZIARAT
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold bg-white/10 border-white/30 text-white hover:bg-white hover:text-foreground"
            >
              🔍 SEARCH HOTEL
            </Button>
          </div>
        </div>

        {/* Search Box */}
        <div className="animate-slide-up max-w-5xl mx-auto" style={{ animationDelay: "0.3s" }}>
          <div className="search-box">
            {/* Trip Dates */}
            <div className="search-field flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Trip Dates</p>
                <p className="text-sm font-medium text-foreground">Jan 4, 2026 - Jan 11, 2026</p>
              </div>
            </div>

            {/* Passengers */}
            <div className="search-field flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Passengers</p>
                <p className="text-sm font-medium text-foreground">1 Adults, 0 Children</p>
              </div>
            </div>

            {/* Entry Point */}
            <div className="search-field flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Entry Point</p>
                <p className="text-sm font-medium text-foreground">Najaf Airport</p>
              </div>
            </div>

            {/* Exit Point */}
            <div className="search-field flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Exit Point</p>
                <p className="text-sm font-medium text-foreground">Baghdad Airport</p>
              </div>
            </div>

            {/* Search Button */}
            <Button size="lg" className="h-14 w-14 rounded-lg p-0">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
