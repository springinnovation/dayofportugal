import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/logo.png";

interface NavItem {
  to: string;
  label: string;
  parentLabel?: string;
  children?: { to: string; label: string }[];
}

const navLinks: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About", parentLabel: "About Us" },
  { to: "/events", label: "Events" },
  { to: "/scholarships", label: "Scholarships" },
  {
    to: "/get-involved",
    label: "Support Us",
    parentLabel: "Volunteer",
    children: [
      { to: "/about/sponsors", label: "Sponsors" },
      { to: "/license-plates", label: "License Plates" },
    ],
  },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (link: NavItem) =>
    isActive(link.to) || link.children?.some((c) => isActive(c.to));

  const toggleMobileDropdown = (to: string) => {
    setOpenDropdown(openDropdown === to ? null : to);
  };

  return (
    <>
      {/* Floating Logo */}
      <Link
        to="/"
        className="fixed top-0 z-[60] pointer-events-auto left-4 2xl:left-[calc(50%-700px)]"
        aria-label="Home"
      >
        <img
          src={logo}
          alt="RI Day of Portugal logo"
          className="w-36 h-36 object-contain drop-shadow-xl transition-transform hover:scale-105"
        />
      </Link>

      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group pl-36 md:pl-40">
              <div>
                <p className="font-display text-base font-bold text-foreground leading-tight">
                  Rhode Island
                </p>
                <p className="font-display text-xs text-primary italic leading-tight">
                  Day of Portugal
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.to} className="relative group">
                    <Link
                      to={link.to}
                      className={`inline-flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                        ${
                          isGroupActive(link)
                            ? "text-primary bg-primary/10 font-bold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }
                      `}
                    >
                      {link.label}
                      <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                    </Link>
                    <div className="absolute top-full left-0 pt-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <div className="bg-background border border-border rounded-md shadow-lg py-1 min-w-[160px]">
                        <Link
                          to={link.to}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(link.to)
                              ? "text-primary font-semibold bg-primary/5"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {link.parentLabel || link.label}
                        </Link>
                        {link.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              isActive(child.to)
                                ? "text-primary font-semibold bg-primary/5"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                      ${
                        isActive(link.to)
                          ? "text-primary bg-primary/10 font-bold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                )
              )}
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
                {navLinks.map((link) =>
                  link.children ? (
                    <div key={link.to}>
                      <button
                        onClick={() => toggleMobileDropdown(link.to)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium transition-all
                          ${
                            isGroupActive(link)
                              ? "text-primary bg-primary/10 font-bold"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }
                        `}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${openDropdown === link.to ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.to && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <Link
                              to={link.to}
                              onClick={() => setMobileOpen(false)}
                              className={`block pl-8 pr-4 py-2.5 rounded-md text-sm transition-all
                                ${
                                  isActive(link.to)
                                    ? "text-primary font-semibold"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }
                              `}
                            >
                              {link.parentLabel || link.label}
                            </Link>
                            {link.children.map((child) => (
                              <Link
                                key={child.to}
                                to={child.to}
                                onClick={() => setMobileOpen(false)}
                                className={`block pl-8 pr-4 py-2.5 rounded-md text-sm transition-all
                                  ${
                                    isActive(child.to)
                                      ? "text-primary font-semibold"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                  }
                                `}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-md text-sm font-medium transition-all
                        ${
                          isActive(link.to)
                            ? "text-primary bg-primary/10 font-bold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  )
                )}
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
    </>
  );
};

export default Navbar;
