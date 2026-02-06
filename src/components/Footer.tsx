import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-portugal-navy text-primary-foreground">
      {/* Gold accent line */}
      <div className="h-1 bg-portugal-gold" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-portugal flex items-center justify-center">
                <span className="font-display text-primary-foreground text-lg font-bold">RI</span>
              </div>
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
                <span>Rhode Island, USA</span>
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
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Day of Portugal and Portuguese Heritage in RI, Inc. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/50 italic font-display">
            "Todo o mundo é composto de mudança" — Luís de Camões
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
