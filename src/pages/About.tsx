import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import aboutBanner from "@/assets/about-banner.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

const About = () => {
  return (
    <Layout>
      <PageBanner
        title="About Us"
        subtitle="Preserving Portuguese culture for future generations"
        image={aboutBanner}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* What is Day of Portugal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              What Is Day of Portugal?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The "Day of Portugal" is a holiday celebrated every year on June 10th in every corner of the Portuguese-speaking world. Officially known as "Dia de Portugal, de Camões e das Comunidades Portuguesas" (Day of Portugal, Camões and the Portuguese Communities), June 10th commemorates the death of the revered Portuguese poet, Luís Vaz de Camões in 1580.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Camões is best known for his epic poem, <em className="text-foreground font-medium">Os Lusíadas</em>, which is a tribute to the golden age of Portugal's maritime exploration and discoveries.
            </p>

            {/* Camões Quote */}
            <blockquote className="border-l-4 border-portugal-gold pl-6 py-4 my-8 bg-card rounded-r-lg">
              <p className="font-display text-lg italic text-foreground leading-relaxed">
                Muda-se o ser, muda-se a confiança;
                <br />
                Todo o mundo é composto de mudança,
                <br />
                Tomando sempre novas qualidades.
                <br />
                Continuamente vemos novidades,
                <br />
                Diferentes em tudo da esperança;
                <br />
                Do mal ficam as mágoas na lembrança,
                <br />
                E do bem, se algum houve, as saudades.
              </p>
              <footer className="mt-4 text-sm text-muted-foreground">
                ~ Luís Vaz de Camões
              </footer>
            </blockquote>

            <a
              href="https://www.britannica.com/biography/Luis-de-Camoes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary font-semibold hover:underline"
            >
              Learn More About Luís Vaz de Camões →
            </a>
          </motion.div>

          <div className="azulejo-divider w-full mb-16 rounded-full" />

          {/* Purpose */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Purpose</h2>
            <p className="text-sm uppercase tracking-widest text-portugal-gold font-bold mb-6">
              Day of Portugal and Portuguese Heritage in Rhode Island, Inc.
            </p>
            <ol className="space-y-4">
              {[
                "To celebrate the holiday, Dia de Portugal, de Camões e das Comunidades Portuguesas (Day of Portugal, Camões and the Portuguese Communities), in the State of Rhode Island.",
                "To preserve the traditions of the Portuguese culture for future generations.",
                "To promote the contribution of the Portuguese people, language and culture to the rich fabric of the State of Rhode Island.",
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <p className="text-muted-foreground leading-relaxed pt-1">{item}</p>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Mission Statement</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At the Rhode Island Day of Portugal General Assembly Meeting on June 20, 2013, an ad hoc Nominating and Bylaws Committee was formed and charged with two tasks: 1) to search for a nominee for the 2014 president of the celebrations and 2) to draft bylaws for the non-profit corporation, Day of Portugal and Portuguese Heritage in RI, Inc.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The ad hoc committee was comprised of ten representatives of the Portuguese-American communities of Rhode Island including the corporation's accountant and attorney. Six of the ten members were past presidents of Day of Portugal in RI.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The final draft of the bylaws was ratified unanimously by the membership at the General Assembly Meeting on January 23, 2014 at the Clube Juventude Lusitana, 10 Chase St., Cumberland, RI 02864.
            </p>
          </motion.div>

          {/* Bylaws & Policies */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Bylaws & Policies</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Board of Directors in its capacity as the governing body of the non-profit organization, Day of Portugal and Portuguese Heritage in RI, Inc. (d/b/a RI Day of Portugal) may establish policies and procedures that uphold its mission, protect its reputation and safeguard its status as a 501(c)(3) non-profit organization under the IRS tax code.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Bylaws (English)", desc: "Bylaws of Day of Portugal and Portuguese Heritage in RI, Inc." },
                { label: "Estatutos (Portuguese)", desc: "Estatutos do Dia de Portugal e da Herança Portuguesa em RI, Inc." },
                { label: "Political Campaign Policy", desc: "Policy relative to political campaign participation at RI Day of Portugal events." },
                { label: "President Applications", desc: "Policy relative to call for applications for president." },
              ].map((doc) => (
                <div
                  key={doc.label}
                  className="p-5 rounded-lg bg-card border border-border hover:shadow-warm transition-shadow"
                >
                  <h4 className="font-display font-semibold text-foreground mb-1">{doc.label}</h4>
                  <p className="text-sm text-muted-foreground">{doc.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
