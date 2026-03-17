import { motion } from "framer-motion";
import { ExternalLink, Download, ChevronDown } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
const licensePlateBanner = "/license-plate-banner.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const faqs = [
  {
    q: "When will the RI Day of Portugal license plate be available?",
    a: "According to rules established by the RI General Assembly and the Rhode Island Division of Motor Vehicles (DMV), the RI Day of Portugal must secure a minimum of 600 qualified pre-paid orders before DMV will put the plate into production.",
  },
  {
    q: 'What is a "qualified" pre-paid order?',
    a: "In order to qualify for a RI Day of Portugal plate, applicants must be a Rhode Island resident with a valid Rhode Island passenger vehicle registration. (Commercial registrations are not eligible.) The passenger vehicle registration must be a five-digit or fewer (eg. DP123).",
  },
  {
    q: "Can I keep my current RI license plate number if I order a RI Day of Portugal license plate?",
    a: "Yes. If you have 5 or fewer digits on your current Rhode Island license plate, you will have the same number on your new Rhode Island Day of Portugal license plate. Your current number will simply be transferred to the new plate.",
  },
  {
    q: "What if I currently have a 6-digit RI license plate?",
    a: 'Unfortunately, the DMV can only fit five or fewer digits on the RI Day of Portugal license plate design. If you currently have a 6-digit Rhode Island license plate and you want a RI Day of Portugal plate, you will need to go to the DMV and transfer your current license plate to a 5-digit license plate. (There will be a fee to make the transfer.) Once you have received your 5-digit plate, you can then submit the order form online for the RI Day of Portugal plate. Be sure to scan and include a copy of your registration for the new 5-digit plate. (DO NOT submit the original registration!) The RI Day of Portugal can then place your order with the DMV for the same 5-digit (or less) number.',
  },
  {
    q: "Can I pick the letter/number combinations on my RI Day of Portugal license plate?",
    a: "If you are interested in changing your license plate number before applying for a RI Day of Portugal license plate, the DMV has guidelines on what letter and number combinations are available. These rules are set by the DMV, not by the RI Day of Portugal. Please visit www.dmv.ri.gov for more information.",
  },
  {
    q: "What if I am buying a new car or registering a used car for the first time, and I have no Rhode Island registration to transfer?",
    a: "Before applying for a RI Day of Portugal license plate, you must first register your car with the DMV and obtain a Rhode Island license plate with five or fewer digits. After you have a 5-digit RI plate, you can apply for the RI Day of Portugal license plate following the steps for transfer by filling out the RI Day of Portugal license plate order form (either by mail or electronically), submitting payment, and submitting a scanned COPY of your current registration. DO NOT submit your original registration!",
  },
  {
    q: "Can I submit an application for a Commercial, Combination, Suburban, etc. license plate?",
    a: 'Currently, the RI Day of Portugal only accepts applications for "Private Passenger" or the "10" plate type. The organization does not accept applications for Commercial, Combination, Suburban, or other similar plates.',
  },
  {
    q: "How much does a RI Day of Portugal license plate cost?",
    a: "The cost of a RI Day of Portugal license plate is $42.50 in addition to the normal vehicle registration fee, which is set by the state of Rhode Island. Of that $42.50 first-time fee, $22.50 will go to the DMV to cover plate production costs and state fee, and $20.00 will go to the RI Day of Portugal. The organization intends to deposit the $20.00 collected from each RI Day of Portugal license plate order into our general fund. The funds received from the license plates will go towards supporting Portuguese language, history, and culture in the state of Rhode Island. Please note that submitting the online application will incur an additional $1.86 surcharge fee associated with the cost of PayPal online payment processing. Therefore, the online application process will require a total payment of $43.86.",
  },
  {
    q: "When do I renew my vehicle registration and my RI Day of Portugal license plate?",
    a: "Buying the RI Day of Portugal license plate does not change the renewal deadline for you to renew your vehicle registration. When you renew your vehicle registration as required by state law, you will be asked to renew your RI Day of Portugal license plate at the same time.",
  },
  {
    q: "How much will it cost to renew my RI Day of Portugal license plate?",
    a: "Once you have a RI Day of Portugal license plate, you will keep that same plate in the future. In addition to the normal vehicle registration fee, once you have a RI Day of Portugal plate, the cost for renewing that plate is an additional $10 surcharge, all of which will go to RI Day of Portugal as described above.",
  },
  {
    q: "What will the RI Day of Portugal do with the money received from the fee for a RI Day of Portugal license plate?",
    a: "The RI Day of Portugal intends to deposit the $20.00 collected from each RI Day of Portugal license plate order into our general fund. The funds received from the license plates will go towards supporting the Portuguese language, history, and culture in the state of Rhode Island.",
  },
  {
    q: "How can I apply for a RI Day of Portugal license plate?",
    a: "Applicants may either (1) download, complete, and mail the hard-copy application form (with an enclosed check and copy of your current vehicle registration), or (2) complete the online application form (by filling out all required information on the form).",
  },
  {
    q: "How long will it take to get my RI Day of Portugal license plate?",
    a: "The DMV will notify you once the license plates are ready.",
  },
  {
    q: "How will I get my RI Day of Portugal license plate?",
    a: "Once you have submitted your order, the DMV will contact you to pick up the new RI Day of Portugal plates at the DMV's main office in Cranston. Under DMV rules, plates cannot be mailed or picked up at any other location.",
  },
];

const FaqItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index % 5}
      variants={fadeUp}
      className="border border-border rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-display font-semibold text-foreground text-sm leading-relaxed">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 mt-0.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 -mt-1">
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      )}
    </motion.div>
  );
};

const LicensePlates = () => {
  return (
    <Layout>
      <section
        className="w-full"
        style={{ background: "radial-gradient(circle, #1fab48, #148a38, #0f6e2c)" }}
      >
        <img
          src={licensePlateBanner}
          alt="RI Day of Portugal License Plate"
          className="w-full h-auto block"
        />
      </section>

      {/* Hero Section */}
      <section className="py-16" style={{ background: "radial-gradient(circle, #1fab48, #148a38, #0f6e2c)" }}>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              RI Day of Portugal License Plate
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-2">
              Order Your License Plate Today!
            </p>
            <p className="text-primary-foreground/80 leading-relaxed">
              The RI Day of Portugal license plate is now in production. Show your pride in
              Portuguese heritage every time you hit the road.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing & Order */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-portugal-gold font-display text-sm uppercase tracking-widest mb-2">
              Pricing
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              The cost is <strong className="text-foreground">$42.50</strong>, of which $22.50 goes to the state's general fund, and
              $20 goes to the Rhode Island Day of Portugal. Every time you renew your license plate,
              there will be a <strong className="text-foreground">$10 fee</strong>, all of which will benefit the Rhode Island Day of Portugal.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="grid sm:grid-cols-3 gap-6 mb-12"
          >
            <div className="p-6 rounded-lg bg-card border border-border text-center">
              <p className="font-display text-3xl font-bold text-primary mb-1">$42.50</p>
              <p className="text-sm text-muted-foreground">First-time plate fee</p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border text-center">
              <p className="font-display text-3xl font-bold text-secondary mb-1">$20.00</p>
              <p className="text-sm text-muted-foreground">Goes to RI Day of Portugal</p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border text-center">
              <p className="font-display text-3xl font-bold text-portugal-gold mb-1">$10.00</p>
              <p className="text-sm text-muted-foreground">Annual renewal fee</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://www.ri.gov/DMV/plate_remake/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors shadow-portugal"
            >
              Order Online <ExternalLink size={18} />
            </a>
            <a
              href="/plate-app.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md border-2 border-border text-foreground font-bold hover:bg-muted transition-colors"
            >
              Download Application <Download size={18} />
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mt-6 text-center"
          >
            <p className="text-xs text-muted-foreground">
              * Please click here to review{" "}
              <a
                href="https://www.ri.gov/DMV/plate_remake/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Frequently Asked Questions (FAQs)
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="azulejo-divider w-full rounded-full" />
      </div>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-portugal-gold font-display text-sm uppercase tracking-widest mb-2">
              Need Help?
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about the RI Day of Portugal license plate.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mt-10 p-6 rounded-lg bg-card border border-border"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">PLEASE NOTE:</strong> The regulations controlling the issuance of RI Day of Portugal license plate and vehicle
              registrations in Rhode Island are controlled by the State's Division of Motor Vehicles, not by the RI Day of Portugal.
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              Please address any additional questions to{" "}
              <a href="mailto:plates@ridayofportugal.org" className="text-primary hover:underline">
                plates@ridayofportugal.org
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default LicensePlates;
