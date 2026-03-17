import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, FileDown } from "lucide-react";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicEvents } from "@/hooks/useEvents";
import eventsBanner from "@/assets/events-banner.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const Events = () => {
  const { data: events, isLoading } = usePublicEvents();
  const featuredEvent = events?.find((e) => e.is_featured);

  return (
    <Layout>
      <PageBanner
        title="Events"
        subtitle="Annual celebrations of Portuguese American culture and community"
        image={eventsBanner}
      />

      {/* Upcoming Event Highlight */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-portugal-gold font-display text-sm uppercase tracking-widest mb-2">
              Coming Soon
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Festival 2025
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
              Join us for the biggest Portuguese American celebration in Rhode Island! Stay tuned for details.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-portugal-gold text-accent-foreground font-bold hover:opacity-90 transition-opacity"
            >
              Get Notified <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Annual Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-portugal-gold font-display text-sm uppercase tracking-widest mb-2">
              Year-Round Celebrations
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Annual Events
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-6 rounded-lg bg-card border border-border">
                    <Skeleton className="h-4 w-32 mb-3" />
                    <Skeleton className="h-5 w-48 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-1" />
                  </div>
                ))
              : events?.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    custom={i % 3}
                    variants={fadeUp}
                    className="group rounded-lg bg-card border border-border hover:shadow-portugal hover:border-primary/20 transition-all duration-300 overflow-hidden"
                  >
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                        <Calendar size={14} className="text-primary" />
                        <span>{event.date_display}</span>
                        <span className="text-border">•</span>
                        <MapPin size={14} className="text-secondary" />
                        <span>{event.location}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                      {event.document_url && (
                        <a
                          href={event.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:underline"
                        >
                          <FileDown size={16} />
                          {event.document_name || "Download Document"}
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
