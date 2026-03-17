import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Handshake, Users, GraduationCap, LogOut } from "lucide-react";
import { clearToken } from "@/lib/api";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/sponsors", label: "Sponsors", icon: Handshake },
  { to: "/admin/volunteers", label: "Volunteers", icon: Users },
  { to: "/admin/scholarships", label: "Scholarships", icon: GraduationCap },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-portugal-navy text-primary-foreground border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
              <span className="font-display font-bold text-sm">Admin Panel</span>
            </Link>
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                    location.pathname === item.to
                      ? "bg-primary-foreground/15 text-portugal-gold font-semibold"
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
