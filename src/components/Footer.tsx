import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative text-primary-foreground" style={{ backgroundImage: "url('/newport.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--portugal-navy))] via-[hsl(var(--portugal-navy)/0.95)] to-[hsl(var(--portugal-navy)/0.7)]" />
      {/* Gold accent line */}
      <div className="relative h-1 bg-portugal-gold" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="RI Day of Portugal logo" className="w-20 h-20 object-contain" />
              <div>
                <p className="font-display text-lg font-bold leading-tight">Rhode Island</p>
                <p className="font-display text-sm text-portugal-gold italic leading-tight">
                  Day of Portugal
                </p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Celebrating Portuguese American culture, heritage, and community in Rhode Island since the inception of Dia de Portugal.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/groups/RIDayofPortugal/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-portugal-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/ridayofportugal.org" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-portugal-gold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/about", label: "About Us" },
                { to: "/events", label: "Events" },
                { to: "/scholarships", label: "Scholarships" },
                { to: "/get-involved", label: "Get Involved" },
                { to: "/gallery", label: "Media & Gallery" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-foreground/70 hover:text-portugal-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin size={16} className="mt-0.5 shrink-0 text-portugal-gold" />
                <span>RI Day of Portugal<br />P.O. Box 9464<br />Providence, RI 02940</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <Mail size={16} className="mt-0.5 shrink-0 text-portugal-gold" />
                <span>info@ridayofportugal.org</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <Phone size={16} className="mt-0.5 shrink-0 text-portugal-gold" />
                <span>(401) 555-0100</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Don't miss out on upcoming events and news!
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-portugal-gold"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-md bg-portugal-gold text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-primary-foreground/70 italic font-display mt-4">
              "Todo o mundo é composto de mudança"<br />— Luís de Camões
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/15 space-y-4">
          <p className="text-xs text-primary-foreground/50 leading-relaxed text-center">
            Day of Portugal and Portuguese Heritage in RI, Inc. (DBA RI Day of Portugal) is a 501(c)(3) non-profit organization under the IRS Code and incorporated under the laws of the State of Rhode Island.<br />Donations are tax-deductible to the extent allowed by law and will be acknowledged. IRS Tax ID# 20-8285748
          </p>
          <p className="text-xs text-primary-foreground/50 leading-relaxed text-center">
            © 2026 Day of Portugal and Portuguese Heritage in RI, Inc. (DBA RI Day of Portugal) All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/50 leading-relaxed text-center">
            Content may not be used without written permission. Use of downloadable registration and sponsorship forms permitted.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
