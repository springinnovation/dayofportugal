import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/scholarships", label: "Scholarships" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-portugal flex items-center justify-center">
              <span className="font-display text-primary-foreground text-lg font-bold">RI</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-lg font-bold text-foreground leading-tight">
                Rhode Island
              </p>
              <p className="font-display text-sm text-primary italic leading-tight">
                Day of Portugal
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    location.pathname === link.to
                      ? "text-primary bg-primary/10 font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Donate CTA */}
          <Link
            to="/get-involved"
            className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors shadow-portugal"
          >
            Donate
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-all
                    ${
                      location.pathname === link.to
                        ? "text-primary bg-primary/10 font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/get-involved"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-md bg-primary text-primary-foreground font-bold text-sm"
              >
                Donate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
