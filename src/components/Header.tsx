import { useState } from "react";
import { Menu, X, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "#about" },
  { name: "PLAN YOUR ZIARAT", href: "/plan-ziarat" },
  { name: "PACKAGES", href: "/packages" },
  { name: "HOTELS", href: "/hotels" },
  { name: "CITIES & ZIARAT", href: "#cities" },
  { name: "CONTACT", href: "#contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-header text-header-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              📅 Monday, January 5, 2026
            </span>
            <span className="hidden md:inline">Rajab 16, 1447 AH</span>
            <span className="hidden md:flex items-center gap-1">
              ☀️ 12°C Karbala
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+9647862060777" className="hidden md:flex items-center gap-1 hover:text-primary transition-colors">
              <Phone className="w-3 h-3" />
              (964) 786 2060 777
            </a>
            <span className="flex items-center gap-1 text-xs">
              <Globe className="w-3 h-3" />
              USD | ENGLISH
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-header/95 backdrop-blur-sm text-header-foreground py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-primary">ZIARAT</span> PLANNER
            </div>
            <div className="hidden md:block text-xs text-white/60 uppercase tracking-widest">
              Embark On Spiritual Journeys
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.href.startsWith("#") ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`nav-link ${isActive(link.href) ? "nav-link-active" : ""}`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                link.href.startsWith("#") ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="nav-link py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`nav-link py-2 ${isActive(link.href) ? "nav-link-active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
