import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ExploreCities } from "@/components/ExploreCities";
import { HotelsList } from "@/components/HotelsList";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ExploreCities />
      <HotelsList />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
