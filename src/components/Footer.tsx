import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-header text-header-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-primary">ZIARAT</span> PLANNER
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Iraq's First and Only Ziarat Planner and Hotel Portal. Embark on your spiritual journey with us.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Plan Your Ziarat</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Packages</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Hotels</a></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Cities</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-primary transition-colors">Karbala</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Najaf</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Baghdad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kazmain</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Samarra</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>(964) 786 2060 777</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@ziaratplanner.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span>Karbala, Iraq</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
          <p>© 2026 Ziarat Planner. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
