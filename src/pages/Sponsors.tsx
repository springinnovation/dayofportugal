import { motion } from "framer-motion";
import { Flame, Heart, BookOpen, Mail, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicSponsors } from "@/hooks/useSponsors";
import aboutBanner from "@/assets/about-banner.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const TIER_ORDER = ["platinum", "gold", "silver", "bronze", "supporter"];

const opportunities = [
  {
    icon: Flame,
    title: "Carry a Torch for Us!",
    description:
      "We are seeking generous businesses or donors to help sponsor our heritage festival. Each donor will have the honor of carrying a torch in the WaterFire procession!",
    cta: "Click here for recognition benefits!",
    href: "/Policy.pdf",
  },
  {
    icon: Heart,
    title: "Donate to RI Day of Portugal!",
    description:
      "Your donation will help us fund the venue, security, licenses, entertainment and other expenses associated with showcasing our beautiful heritage and culture.",
    cta: "Click here for giving circles and recognition benefits!",
    href: "/Policy.pdf",
  },
  {
    icon: BookOpen,
    title: "Advertise Your Business or Organization!",
    description:
      "Choose from full, half or quarter page or business card ads in our program booklet. Space is limited so \"first come, first served\"!",
    cta: "Click here for ad specifications!",
    href: "/Policy.pdf",
  },
];

const contacts = [
  {
    name: "Ana Isabel dos Reis-Couto",
    role: "Fundraising Chair",
    phone: "401.225.2591",
    email: "ana.isabel.reis-couto@ridayofportugal.org",
  },
  {
    name: "Lina Cabral",
    role: "Assistant Fundraising Chair",
    phone: "401.263.7312",
    email: "lina.cabral@ridayofportugal.org",
  },
];

const Sponsors = () => {
  const { data: sponsors, isLoading } = usePublicSponsors();

  const grouped = TIER_ORDER.map((tier) => ({
    tier,
    label: tier.charAt(0).toUpperCase() + tier.slice(1),
    sponsors: sponsors?.filter((s) => s.tier === tier) || [],
  })).filter((g) => g.sponsors.length > 0);

  return (
    <Layout>
      <PageBanner
        title="Sponsors"
        subtitle="Help us celebrate Portuguese heritage in Rhode Island"
        image={aboutBanner}
      />

      {/* Intro */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary-foreground/90 text-lg leading-relaxed">
              RI Day of Portugal annually depends on grants, sponsorships and donations to fund this
              very important celebration.
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-6">
              How Can You Help?
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Sponsorship Opportunities */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {opportunities.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                custom={i}
                variants={fadeUp}
                className="group p-8 rounded-lg bg-card border border-border hover:shadow-portugal hover:border-primary/20 transition-all duration-300 text-center flex flex-col"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {item.description}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-semibold text-primary hover:underline"
                >
                  {item.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="azulejo-divider w-full rounded-full" />
      </div>

      {/* Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <p className="text-portugal-gold font-display text-sm uppercase tracking-widest mb-2">
              Get in Touch
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              For More Information
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {contacts.map((contact, i) => (
              <motion.div
                key={contact.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="p-6 rounded-lg bg-card border border-border text-center"
              >
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  {contact.name}
                </h3>
                <p className="text-sm text-portugal-gold font-medium mb-4">{contact.role}</p>
                <div className="space-y-2">
                  <a
                    href={`tel:${contact.phone.replace(/\./g, "")}`}
                    className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone size={14} />
                    {contact.phone}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
                  >
                    <Mail size={14} className="shrink-0" />
                    {contact.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Actual Sponsors from DB */}
      {!isLoading && grouped.length > 0 && (
        <>
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="azulejo-divider w-full rounded-full" />
          </div>

          <section className="py-20">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="text-center mb-14">
                <p className="text-portugal-gold font-display text-sm uppercase tracking-widest mb-2">
                  Thank You
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Our Sponsors
                </h2>
              </div>

              {grouped.map((group) => (
                <div key={group.tier} className="mb-16 last:mb-0">
                  <div className="text-center mb-8">
                    <p className="text-portugal-gold font-display text-sm uppercase tracking-widest mb-2">
                      {group.label} Sponsors
                    </p>
                    <div className="w-16 h-0.5 bg-portugal-gold mx-auto" />
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.sponsors.map((sponsor, i) => (
                      <motion.div
                        key={sponsor.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-30px" }}
                        custom={i % 3}
                        variants={fadeUp}
                        className="group p-6 rounded-lg bg-card border border-border hover:shadow-portugal hover:border-primary/20 transition-all duration-300 text-center"
                      >
                        {sponsor.logo_url ? (
                          <img
                            src={sponsor.logo_url}
                            alt={sponsor.name}
                            className="w-28 h-28 object-contain mx-auto mb-4"
                          />
                        ) : (
                          <div className="w-28 h-28 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="font-display text-2xl font-bold text-muted-foreground">
                              {sponsor.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {sponsor.name}
                        </h3>
                        {sponsor.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {sponsor.description}
                          </p>
                        )}
                        {sponsor.website_url && (
                          <a
                            href={sponsor.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-sm font-medium text-primary hover:underline"
                          >
                            Visit Website
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {isLoading && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-6 rounded-lg bg-card border border-border text-center">
                  <Skeleton className="w-24 h-24 mx-auto mb-4 rounded" />
                  <Skeleton className="h-5 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-48 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Sponsors;
