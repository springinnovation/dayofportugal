import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
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
    winners: ["Scholarship winners announced — see official announcement"],
  },
  {
    year: "2022",
    winners: ["Scholarship winners announced"],
  },
  {
    year: "2021",
    winners: ["Scholarship winners announced"],
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

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="text-primary" size={28} />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Scholarship Program
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The RI Day of Portugal Scholarship Program supports Portuguese American students pursuing higher education. Each year, we award scholarships to outstanding students who demonstrate academic excellence and a commitment to their Portuguese heritage.
            </p>
          </motion.div>

          <div className="azulejo-divider w-full mb-16 rounded-full" />

          {/* Winners by Year */}
          <div className="space-y-8">
            {scholarshipYears.map((yearData, i) => (
              <motion.div
                key={yearData.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                custom={0}
                variants={fadeUp}
                className="group"
              >
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <span className="font-display text-2xl font-bold">{yearData.year}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                      {yearData.year} Scholarship Winners
                    </h3>
                    <ul className="space-y-2">
                      {yearData.winners.map((winner, j) => (
                        <li key={j} className="flex items-center gap-3 text-muted-foreground">
                          <span className="w-2 h-2 rounded-full bg-portugal-gold flex-shrink-0" />
                          {winner}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {i < scholarshipYears.length - 1 && (
                  <div className="border-b border-border mt-8" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Scholarships;
