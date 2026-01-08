import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import { useLocation, useNavigate } from "react-router-dom";

interface HeroSectionProps {
  isLoggedIn?: boolean;
}

const HeroSection = ({ isLoggedIn = false }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If navigated here with state requesting a scroll, perform it
    const requested = (location.state as any)?.scrollTo as string | undefined;
    if (requested) {
      // Small delay to ensure sections are mounted
      setTimeout(() => {
        const el = document.getElementById(requested);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Clear the history state so back/refresh won't re-trigger
        navigate(location.pathname, { replace: true, state: {} });
      }, 150);
    }
  }, [location, navigate]);

  return (
    <>
      <section 
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{ background: "var(--gradient-glow)" }}
        />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "50px 50px"
          }}
        />

        <div className="relative z-10 container mx-auto px-6 pt-20">
          <div className="flex flex-col items-center text-center">

            <motion.p
              className="text-muted-foreground text-sm md:text-base uppercase tracking-[0.3em] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Next Generation Drone Delivery
            </motion.p>

            <motion.h1
              className="hero-title text-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              <span className="glow-text">AEROMIND</span>
            </motion.h1>

            <motion.p
              className="mt-20 md:mt-24 text-muted-foreground text-lg md:text-xl max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Experience the future of logistics. Fast, reliable, and eco-friendly
              drone delivery at your fingertips.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="heroOutline" size="xl">
                      Admin Dashboard
                    </Button>
                  </Link>
                  <Link to="/book">
                    <Button variant="hero" size="xl">
                      Book a Drone
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button variant="hero" size="xl">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="heroOutline" size="xl">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>

            <motion.div
              className="mt-20 grid grid-cols-3 gap-8 md:gap-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {[
                { value: "10K+", label: "Deliveries" },
                { value: "99.9%", label: "Success Rate" },
                { value: "50+", label: "Cities" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-4xl font-display font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      <div className="relative z-10">
        <AboutSection />
        <ServicesSection />
      </div>
    </>
  );
};

export default HeroSection;
