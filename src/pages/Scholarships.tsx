import { motion } from "framer-motion";
import { GraduationCap, Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import scholarshipsBanner from "@/assets/scholarships-banner.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const scholarshipYears = [
  {
    year: "2023",
    winners: ["Scholarship Award Winners announced"],
  },
  {
    year: "2022",
    winners: ["Scholarship Award Winners announced"],
  },
  {
    year: "2021",
    winners: ["Scholarship Award Winners announced"],
  },
  {
    year: "2020",
    winners: ["Scholarship Award Winners announced"],
  },
  {
    year: "2019",
    winners: [
      "Michaela Alarie — University of Rochester",
      "Ashley Diogo — Rhode Island College",
      "Julia Santos — Quinnipiac University",
      "Makayla Lourenco — Boston College",
      "Madison Saraiva — Rhode Island College",
    ],
  },
  {
    year: "2018",
    winners: [
      "Michaela Alarie — University of Rochester",
      "Ashley Diogo — Rhode Island College",
      "Julia Santos — Quinnipiac University",
      "Makayla Lourenco — Boston College",
      "Madison Saraiva — Rhode Island College",
    ],
  },
  {
    year: "2017",
    winners: [
      "Olivia Abreu — New York University",
      "Monica Barbosa — Yale",
      "Nathaniel Claro — Johnson & Wales University",
      "Julia Ferreira — Providence College",
    ],
  },
  {
    year: "2016",
    winners: [
      "Katrina Borges — Sacred Heart University",
      "Jamielin Forsythe — Springfield College",
      "Makayla Lourenco — Boston College",
      "Cynthia Pimentel — University of New Hampshire",
    ],
  },
  {
    year: "2015",
    winners: [
      "Kevin Lemos — University of Rhode Island",
      "Michael Melo — Rhode Island College",
      "Alexander Pimentel — University of New Hampshire",
      "Jason A. Pires — Suffolk University",
    ],
  },
];

const Scholarships = () => {
  return (
    <Layout>
      <PageBanner
        title="Scholarships"
        subtitle="Investing in the future of Portuguese American students"
        image={scholarshipsBanner}
      />

      {/* Scholarship Program Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
              Day of Portugal Scholarship Program
            </h2>
            <p className="font-display text-xl text-portugal-green font-semibold italic mb-2">
              Don't delay! Apply today!
            </p>
            <h3 className="font-display text-2xl font-bold text-foreground mb-8">
              Scholarship Program | <span className="italic">Bolsas de Estudo</span>
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="space-y-6 text-muted-foreground leading-relaxed"
          >
            <p>
              The Day of Portugal and Portuguese Heritage in RI, Inc. has established a scholarship fund to assist deserving
              local Portuguese-American students achieve their post-secondary education goals. Four to six scholarships
              of <strong className="text-foreground">$1,000</strong> each will be awarded to college students of Portuguese ancestry who applied and demonstrated
              academic excellence and a commitment to completing an approved course of study.
            </p>
            <p>
              Eligible candidates are those who can demonstrate at least 25% Portuguese ancestry, a minimum 3.0 GPA,
              and who have matriculated full-time into a four-year college or university, a community college, or a
              technical school program. Graduating high school seniors and students attending higher education
              programs may apply. Selection is competitive and merit-based.
            </p>
            <p className="text-primary font-semibold">
              Download the Application and submit it by July 31 of the application year.
            </p>
            <p className="text-sm text-muted-foreground">
              RI Day of Portugal Scholarship Fund is supported by a percentage of the proceeds of the RI Day of Portugal
              Golf Tournament and other RI Day of Portugal activities.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="mt-8"
          >
            <Link
              to="/scholarships/apply"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors shadow-portugal"
            >
              Apply Online <FileText size={18} />
            </Link>
            <a
              href="/scholarship-application.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md border-2 border-border text-foreground font-bold hover:bg-muted transition-colors ml-4"
            >
              Download PDF <Download size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="azulejo-divider w-full rounded-full" />
      </div>

      {/* Winners Section */}
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
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Winners
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarshipYears.map((yearData, i) => (
              <motion.div
                key={yearData.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                custom={i % 3}
                variants={fadeUp}
                className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-primary px-5 py-4">
                  <h3 className="font-display text-2xl font-bold text-primary-foreground">
                    {yearData.year}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">Scholarship Winners</p>
                </div>
                <div className="p-5">
                  <ul className="space-y-3">
                    {yearData.winners.map((winner, j) => {
                      const parts = winner.split(" — ");
                      return (
                        <li key={j} className="flex items-start gap-3">
                          <span className="w-2 h-2 mt-1.5 rounded-full bg-portugal-gold flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">{parts[0]}</p>
                            {parts[1] && (
                              <p className="text-xs text-muted-foreground">{parts[1]}</p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Scholarships;
