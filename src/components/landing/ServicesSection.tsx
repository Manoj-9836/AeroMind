import { motion } from "framer-motion";
import { Package, Globe, Truck, Zap } from "lucide-react";

const services = [
  {
    title: "Same-day Delivery",
    desc: "Fast point-to-point deliveries within the same day using optimized drone routing.",
    icon: Package,
  },
  {
    title: "Last-mile Logistics",
    desc: "Seamless integration with existing courier networks for efficient last-mile handling.",
    icon: Truck,
  },
  {
    title: "Nationwide Reach",
    desc: "Scalable coverage across cities with adaptive airspace planning.",
    icon: Globe,
  },
  {
    title: "Eco-friendly Flights",
    desc: "Battery-optimized routes and smart scheduling to reduce carbon footprint.",
    icon: Zap,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="container mx-auto px-6 py-20 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
          Our Services
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We provide a suite of services tailored to modern e-commerce and
          logistics operators — from quick deliveries to large-scale
          deployments.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-6 flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">{s.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
