import AdminLayout from "@/components/AdminLayout";
import { useAdminEvents } from "@/hooks/useEvents";
import { useAdminSponsors } from "@/hooks/useSponsors";
import { useAdminVolunteers } from "@/hooks/useVolunteers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Eye, EyeOff, Star, Handshake, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { data: events, isLoading } = useAdminEvents();
  const { data: sponsors, isLoading: sponsorsLoading } = useAdminSponsors();
  const { data: volunteers, isLoading: volunteersLoading } = useAdminVolunteers();

  const totalEvents = events?.length || 0;
  const publishedEvents = events?.filter((e) => e.is_published).length || 0;
  const draftEvents = totalEvents - publishedEvents;
  const featuredEvents = events?.filter((e) => e.is_featured).length || 0;

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
            <CalendarDays size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{isLoading ? "..." : totalEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
            <Eye size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{isLoading ? "..." : publishedEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
            <EyeOff size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{isLoading ? "..." : draftEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Featured</CardTitle>
            <Star size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{isLoading ? "..." : featuredEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sponsors</CardTitle>
            <Handshake size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{sponsorsLoading ? "..." : sponsors?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Volunteers</CardTitle>
            <Users size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{volunteersLoading ? "..." : volunteers?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Link
          to="/admin/events"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          <CalendarDays size={16} />
          Manage Events
        </Link>
        <Link
          to="/admin/sponsors"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          <Handshake size={16} />
          Manage Sponsors
        </Link>
        <Link
          to="/admin/volunteers"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          <Users size={16} />
          View Volunteers
        </Link>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
