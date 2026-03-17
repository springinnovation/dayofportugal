import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, Heart, Users, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import heroBanner from "@/assets/hero-banner.jpg";
import eventsBanner from "@/assets/events-banner.jpg";
import scholarshipsBanner from "@/assets/scholarships-banner.jpg";
import volunteerBanner from "@/assets/volunteer-banner.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Index = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertPhone, setAlertPhone] = useState("");
  const [alertLoading, setAlertLoading] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState("");

  const handleAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail && !alertPhone) {
      setAlertError("Please provide an email or phone number.");
      return;
    }
    setAlertLoading(true);
    setAlertError("");
    try {
      await api.post("/alerts/subscribe", {
        email: alertEmail || undefined,
        phone: alertPhone || undefined,
      });
      setAlertSuccess(true);
      setAlertEmail("");
      setAlertPhone("");
    } catch (err) {
      setAlertError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setAlertLoading(false);
    }
  };

  const handleAlertClose = (open: boolean) => {
    setAlertOpen(open);
    if (!open) {
      setAlertSuccess(false);
      setAlertError("");
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-portugal-navy">
        <img src="/hero2.jpg" alt="Portuguese festival celebration" className="hidden md:block absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "calc(50% + 500px) center", maskImage: "linear-gradient(to right, transparent 20%, black 60%)", WebkitMaskImage: "linear-gradient(to right, transparent 20%, black 60%)" }} />
        <img src="/hero2-mobile.png" alt="Portuguese festival celebration" className="block md:hidden absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative h-full container mx-auto px-4 flex flex-col items-start justify-center text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-portugal-gold font-display text-lg md:text-xl italic mb-4 tracking-wide text-shadow-hero">
              Dia de Portugal, de Camões e das Comunidades Portuguesas
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-[1.2] text-shadow-hero">
              Something <span className="text-portugal-gold" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.4em" }}>Doce</span> is
              <br />
              Happening Again:
              <br />
              Dia de Portugal in Providence
            </h1>
            <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mb-8 font-normal leading-relaxed text-shadow-hero">
              Celebrating Portuguese American culture, heritage, and community every June 10th in the heart of Rhode Island.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all shadow-portugal"
            >
              Upcoming Events
              <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => setAlertOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-portugal-gold text-portugal-navy font-bold text-base hover:bg-portugal-gold/90 transition-all shadow-portugal"
            >
<span>Get <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: "1.5em" }}>Festa</span> Alerts!</span>
            </button>
          </motion.div>

          <div className="azulejo-divider w-48 mt-12 rounded-full" />
        </div>
      </section>

      {/* About Preview */}
      <section className="relative py-20" style={{ backgroundImage: "url('/sidewalk.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0}
              variants={fadeUp}
            >
              <p className="text-portugal-gold font-display text-sm uppercase tracking-widest mb-2">About Us</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                About Our Organization
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The "Day of Portugal" is a holiday celebrated every year on June 10th in every corner of the Portuguese-speaking world. Officially known as "Dia de Portugal, de Camões e das Comunidades Portuguesas," June 10th commemorates the death of the revered Portuguese poet, Luís Vaz de Camões in 1580.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Camões is best known for his epic poem, <em className="text-foreground font-medium">Os Lusíadas</em>, a tribute to the golden age of Portugal's maritime exploration and discoveries.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
              >
                Read More <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              variants={fadeUp}
              className="relative"
            >
              <img
                src={eventsBanner}
                alt="Portuguese folk dance"
                className="rounded-lg shadow-warm w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-portugal-gold rounded-lg opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-portugal-gold font-display text-sm uppercase tracking-widest mb-2">What We Do</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Our Community Programs
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                iconImg: "/cal.png",
                title: "Annual Events",
                desc: "Parades, festivals, gastronomia fairs, and cultural celebrations throughout the year.",
                link: "/events",
                img: eventsBanner,
              },
              {
                iconImg: "/cap.png",
                title: "Scholarships",
                desc: "Supporting Portuguese American students in Rhode Island with educational scholarships.",
                link: "/scholarships",
                img: scholarshipsBanner,
              },
              {
                iconImg: "/help.png",
                title: "Get Involved",
                desc: "Volunteer, donate, and help rebuild our communities for future generations.",
                link: "/get-involved",
                img: volunteerBanner,
              },
              {
                iconImg: "/community.png",
                title: "Community",
                desc: "Connecting Portuguese Americans across Rhode Island through shared culture and traditions.",
                link: "/about",
                img: heroBanner,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
              >
                <Link
                  to={item.link}
                  className="group block rounded-lg overflow-hidden bg-card shadow-warm hover:shadow-portugal transition-all duration-300 h-full"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-md overflow-hidden mb-3">
                      <img src={item.iconImg} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Camões Quote */}
      <section className="relative py-16" style={{ backgroundImage: "url('/azulejo-tile.png')", backgroundSize: "200px", backgroundRepeat: "repeat" }}>
        <div className="absolute inset-0 bg-portugal-navy/90" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto bg-portugal-navy/60 rounded-xl px-8 py-10 backdrop-blur-sm"
          >
            <div className="azulejo-divider w-20 mx-auto mb-8 rounded-full" />
            <p className="font-display text-xl md:text-2xl italic text-primary-foreground/90 leading-relaxed mb-2">
              "Muda-se o ser, muda-se a confiança;
              <br />
              Todo o mundo é composto de mudança,
              <br />
              Tomando sempre novas qualidades."
            </p>
            <footer className="text-portugal-gold font-display text-base mt-4">
              — Luís Vaz de Camões
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Involved — Rebuild Our Communities!
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Our volunteers are the heartbeat of RI Day of Portugal. Join us in preserving Portuguese culture for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-involved"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-portugal"
              >
                Donate Now
              </Link>
              <Link
                to="/get-involved"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-all"
              >
                Volunteer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Festa Alerts Modal */}
      <Dialog open={alertOpen} onOpenChange={handleAlertClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              Festa Alerts
            </DialogTitle>
            <DialogDescription>
              Get notified about upcoming events, festivals, and community news. Sign up for text and email alerts.
            </DialogDescription>
          </DialogHeader>

          {alertSuccess ? (
            <div className="text-center py-4">
              <p className="text-lg font-semibold text-green-600 mb-1">You're signed up!</p>
              <p className="text-sm text-muted-foreground">
                We'll keep you posted on all things Dia de Portugal.
              </p>
            </div>
          ) : (
            <form onSubmit={handleAlertSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="alert-email">Email</Label>
                <Input
                  id="alert-email"
                  type="email"
                  placeholder="you@example.com"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alert-phone">Mobile Number</Label>
                <Input
                  id="alert-phone"
                  type="tel"
                  placeholder="(401) 555-0123"
                  value={alertPhone}
                  onChange={(e) => setAlertPhone(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Provide at least one. We'll never share your info or spam you.
              </p>
              {alertError && <p className="text-sm text-destructive">{alertError}</p>}
              <Button type="submit" className="w-full" disabled={alertLoading}>
                {alertLoading ? "Subscribing..." : "Sign Up for Alerts"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Index;
