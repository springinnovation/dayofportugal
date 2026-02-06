import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import eventsBanner from "@/assets/events-banner.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const annualEvents = [
  {
    title: "RI Day of Portugal Parade",
    desc: "A vibrant parade through the streets celebrating Portuguese American pride, culture, and heritage with floats, music, and community spirit.",
    date: "June",
    location: "Providence, RI",
  },
  {
    title: "RI Day of Portugal Festival",
    desc: "The main festival featuring live entertainment, Portuguese food vendors, traditional music, and family-friendly activities.",
    date: "June",
    location: "India Point Park, Providence",
  },
  {
    title: "Feira de Gastronomia e Folclore",
    desc: "A celebration of Portuguese cuisine and folklore, featuring traditional dishes, folk dancing, and cultural performances.",
    date: "Summer",
    location: "Rhode Island",
  },
  {
    title: "Golf Tournament",
    desc: "Annual charity golf tournament supporting the organization's scholarship fund and community programs.",
    date: "Summer",
    location: "Rhode Island",
  },
  {
    title: "5K Road Race",
    desc: "Community road race bringing together runners of all levels to celebrate Portuguese American heritage through fitness.",
    date: "June",
    location: "Providence, RI",
  },
  {
    title: "Miss Dia de Portugal RI",
    desc: "Annual pageant celebrating Portuguese American young women who embody the culture, traditions, and community values.",
    date: "Spring",
    location: "Rhode Island",
  },
  {
    title: "Trap Shooting",
    desc: "Competitive trap shooting event bringing the community together for a day of sport and camaraderie.",
    date: "Summer",
    location: "Rhode Island",
  },
  {
    title: "Fishing Tournament",
    desc: "Celebrating the Portuguese maritime tradition with a community fishing tournament for all skill levels.",
    date: "Summer",
    location: "Rhode Island",
  },
  {
    title: "Veteran's Memorial",
    desc: "A solemn ceremony honoring Portuguese American veterans who have served in the United States Armed Forces.",
    date: "June",
    location: "Rhode Island",
  },
];

const Events = () => {
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
            {annualEvents.map((event, i) => (
              <motion.div
                key={event.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                custom={i % 3}
                variants={fadeUp}
                className="group p-6 rounded-lg bg-card border border-border hover:shadow-portugal hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <Calendar size={14} className="text-primary" />
                  <span>{event.date}</span>
                  <span className="text-border">•</span>
                  <MapPin size={14} className="text-secondary" />
                  <span>{event.location}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {event.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
