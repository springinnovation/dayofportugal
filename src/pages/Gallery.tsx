import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import heroBanner from "@/assets/hero-banner.jpg";
import eventsBanner from "@/assets/events-banner.jpg";
import volunteerBanner from "@/assets/volunteer-banner.jpg";
import aboutBanner from "@/assets/about-banner.jpg";
import scholarshipsBanner from "@/assets/scholarships-banner.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const galleryImages = [
  { src: heroBanner, alt: "Portuguese festival celebration with flags", caption: "Day of Portugal Festival" },
  { src: eventsBanner, alt: "Traditional Portuguese folk dancers performing", caption: "Folk Dance Performance" },
  { src: volunteerBanner, alt: "Community volunteers at event", caption: "Our Amazing Volunteers" },
  { src: aboutBanner, alt: "Providence Rhode Island waterfront", caption: "Providence, Rhode Island" },
  { src: scholarshipsBanner, alt: "Scholarship ceremony with Portuguese flag", caption: "Scholarship Awards" },
  { src: heroBanner, alt: "Community gathering at festival", caption: "Community Celebration" },
];

const Gallery = () => {
  return (
    <Layout>
      <PageBanner
        title="Media & Gallery"
        subtitle="Moments captured from our celebrations and community events"
        image={eventsBanner}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-portugal-gold font-display text-sm uppercase tracking-widest mb-2">
              Photo Gallery
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Celebrating Our Heritage
            </h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                custom={i % 3}
                variants={fadeUp}
                className="break-inside-avoid group relative overflow-hidden rounded-lg shadow-warm"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ aspectRatio: i % 2 === 0 ? "4/3" : "3/4" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-portugal-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="font-display text-primary-foreground font-semibold text-lg">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
