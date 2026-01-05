import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Footer = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <footer id="contact" className="bg-header text-header-foreground py-16">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-2xl font-bold mb-4">
              <span className="text-primary">ZIARAT</span> PLANNER
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Iraq's First and Only Ziarat Planner and Hotel Portal. Embark on your spiritual journey with us.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div 
            className={`transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Plan Your Ziarat</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Packages</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Hotels</a></li>
            </ul>
          </div>

          {/* Cities */}
          <div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h4 className="font-semibold text-lg mb-4">Cities</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Karbala</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Najaf</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Baghdad</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Kazmain</a></li>
              <li><a href="#" className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">Samarra</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div 
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center gap-3 group">
                <Phone className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-colors duration-300 group-hover:text-white">(964) 786 2060 777</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-colors duration-300 group-hover:text-white">info@ziaratplanner.com</span>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-4 h-4 text-primary mt-1 transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-colors duration-300 group-hover:text-white">Karbala, Iraq</span>
              </li>
            </ul>
          </div>
        </div>

        <div 
          className={`border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p>© 2026 Ziarat Planner. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
