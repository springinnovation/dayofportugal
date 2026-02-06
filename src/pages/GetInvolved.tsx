import { motion } from "framer-motion";
import { Heart, Users, HandHeart, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import volunteerBanner from "@/assets/volunteer-banner.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const GetInvolved = () => {
  return (
    <Layout>
      <PageBanner
        title="Get Involved"
        subtitle="Rebuild our communities — together"
        image={volunteerBanner}
      />

      {/* Volunteer Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Volunteer?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The RI Day of Portugal volunteers are the foundation of the organization. We simply cannot exist without dedicated individuals who routinely show up and work hard for the betterment of our community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Heart,
                title: "Volunteering is Inspiring",
                desc: "Make a meaningful impact in your community while connecting with your Portuguese heritage.",
              },
              {
                icon: Users,
                title: "Builds Communities",
                desc: "Strengthen the bonds between Portuguese American families and neighbors across Rhode Island.",
              },
              {
                icon: HandHeart,
                title: "Enriches Lives",
                desc: "Experience the joy of giving back while preserving traditions for future generations.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="text-center p-8 rounded-lg bg-card border border-border hover:shadow-warm transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-secondary" size={24} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="azulejo-divider w-full mb-16 rounded-full" />

          {/* Become a Volunteer */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              Become a Volunteer
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our Volunteers are the heartbeat of RI Day of Portugal. Whether you can help at events, with planning, or behind the scenes — every contribution makes a difference. We welcome volunteers of all backgrounds who share a passion for Portuguese culture and community.
            </p>

            <form
              className="grid sm:grid-cols-2 gap-4 max-w-2xl"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-3 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="px-4 py-3 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="text"
                placeholder="Area of Interest"
                className="px-4 py-3 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <textarea
                placeholder="Tell us a little about yourself..."
                rows={4}
                className="sm:col-span-2 px-4 py-3 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
              <button
                type="submit"
                className="sm:col-span-2 px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-colors"
              >
                Sign Up to Volunteer
              </button>
            </form>
          </motion.div>

          {/* Donate */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <div className="rounded-lg bg-primary p-10 md:p-14 text-center">
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                Make a Donation
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 leading-relaxed">
                Your generous contributions help fund scholarships, community events, and cultural preservation programs. Every dollar makes a difference.
              </p>
              <p className="text-sm text-primary-foreground/60 mb-6">
                RI Day of Portugal is a registered 501(c)(3) non-profit organization. Your donation may be tax-deductible.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-portugal-gold text-accent-foreground font-bold hover:opacity-90 transition-opacity text-lg">
                Donate Now <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default GetInvolved;
