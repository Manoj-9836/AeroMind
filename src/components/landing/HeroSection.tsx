import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import droneImage from "@/assets/drone.png";

interface HeroSectionProps {
  isLoggedIn?: boolean;
}

const HeroSection = ({ isLoggedIn = false }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Drone animation path
  const pathProgress = useMotionValue(0);
  
  // Define path waypoints relative to center
  // Pattern: last letter "d" → first "A" → middle "i" → loop
  const xPositions = [180, -180, 0, 180]; // d → A → i → d
  const yPositions = [0, -20, 10, 0];
  const rotations = [-5, 5, -3, -5];
  
  const x = useTransform(pathProgress, [0, 0.33, 0.66, 1], xPositions);
  const y = useTransform(pathProgress, [0, 0.33, 0.66, 1], yPositions);
  const rotate = useTransform(pathProgress, [0, 0.33, 0.66, 1], rotations);

  useEffect(() => {
    const animation = animate(pathProgress, [0, 1], {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => animation.stop();
  }, [pathProgress]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
        style={{ background: "var(--gradient-glow)" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="relative z-10 container mx-auto px-6 pt-20">
        <div className="flex flex-col items-center text-center">
          {/* Subtitle */}
          <motion.p
            className="text-muted-foreground text-sm md:text-base uppercase tracking-[0.3em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Next Generation Drone Delivery
          </motion.p>

          {/* Main title with drone */}
          <div className="relative">
            <motion.h1 
              className="hero-title text-foreground relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              <span className="glow-text">AEROMIND</span>
            </motion.h1>

            {/* Animated Drone */}
            <motion.div
              className="absolute top-1/2 left-1/2 z-20 pointer-events-none"
              style={{ 
                x, 
                y, 
                rotate,
                marginLeft: "-120px",
                marginTop: "-80px",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            >
              <img 
                src={droneImage} 
                alt="Aeromind Drone" 
                className="w-60 md:w-72 lg:w-80 drop-shadow-2xl animate-pulse-glow"
              />
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            className="mt-20 md:mt-24 text-muted-foreground text-lg md:text-xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Experience the future of logistics. Fast, reliable, and eco-friendly 
            drone delivery at your fingertips.
          </motion.p>

          {/* CTA Buttons */}
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

          {/* Stats */}
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

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5 },
          y: { repeat: Infinity, duration: 2 }
        }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
