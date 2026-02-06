import { motion } from "framer-motion";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  image: string;
}

const PageBanner = ({ title, subtitle, image }: PageBannerProps) => {
  return (
    <section className="relative h-[340px] md:h-[420px] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl font-light"
          >
            {subtitle}
          </motion.p>
        )}
        <div className="azulejo-divider w-32 mt-6 rounded-full" />
      </div>
    </section>
  );
};

export default PageBanner;
