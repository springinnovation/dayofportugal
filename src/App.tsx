import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Events from "./pages/Events";
import Scholarships from "./pages/Scholarships";
import GetInvolved from "./pages/GetInvolved";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminSponsors from "./pages/admin/AdminSponsors";
import AdminVolunteers from "./pages/admin/AdminVolunteers";
import AdminScholarships from "./pages/admin/AdminScholarships";
import AdminSubscribers from "./pages/admin/AdminSubscribers";
import ScholarshipApplication from "./pages/ScholarshipApplication";
import Sponsors from "./pages/Sponsors";
import LicensePlates from "./pages/LicensePlates";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/sponsors" element={<Sponsors />} />
          <Route path="/events" element={<Events />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/scholarships/apply" element={<ScholarshipApplication />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/license-plates" element={<LicensePlates />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
          <Route path="/admin/sponsors" element={<ProtectedRoute><AdminSponsors /></ProtectedRoute>} />
          <Route path="/admin/volunteers" element={<ProtectedRoute><AdminVolunteers /></ProtectedRoute>} />
          <Route path="/admin/scholarships" element={<ProtectedRoute><AdminScholarships /></ProtectedRoute>} />
          <Route path="/admin/subscribers" element={<ProtectedRoute><AdminSubscribers /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
