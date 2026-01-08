import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Package, Clock, CheckCircle2, Plane } from "lucide-react";
import DeliveryMap from "@/components/tracking/DeliveryMap";

interface BookingData {
  sender: {
    fullName: string;
    phone: string;
    email: string;
    location: string;
  };
  receiver: {
    fullName: string;
    phone: string;
    email: string;
    location: string;
  };
  bookingId: string;
}

const Tracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state as BookingData | null;
  
  // Track the current delivery step (0-indexed)
  const [currentDeliveryStep, setCurrentDeliveryStep] = useState(1); // Start at "Drone Dispatched"

  // Auto-progress through delivery steps
  useEffect(() => {
    if (!bookingData) return;
    
    // Progress to "In Transit" after 15 seconds
    const transitTimer = setTimeout(() => {
      setCurrentDeliveryStep(2);
    }, 15000);
    
    // Progress to "Delivered" after 30 seconds
    const deliveredTimer = setTimeout(() => {
      setCurrentDeliveryStep(3);
    }, 30000);
    
    return () => {
      clearTimeout(transitTimer);
      clearTimeout(deliveredTimer);
    };
  }, [bookingData]);

  // If no booking data, redirect to home
  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            No Booking Found
          </h1>
          <p className="text-muted-foreground mb-6">
            Please book a drone delivery to see tracking information.
          </p>
          <Button variant="hero" onClick={() => navigate("/book")}>
            Book a Drone
          </Button>
        </div>
      </div>
    );
  }

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentDeliveryStep) return "completed";
    if (stepIndex === currentDeliveryStep) return "current";
    return "pending";
  };

  const getStepTime = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);
    if (status === "completed") return "Completed";
    if (status === "current") return "In progress";
    if (stepIndex === 2) return "~15 seconds";
    if (stepIndex === 3) return "~30 seconds";
    return "Pending";
  };

  const trackingSteps = [
    { label: "Order Confirmed", icon: CheckCircle2 },
    { label: "Drone Dispatched", icon: Package },
    { label: "In Transit", icon: Plane },
    { label: "Delivered", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "var(--gradient-glow)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Track Your Delivery
              </h1>
              <p className="text-muted-foreground text-sm">
                Booking ID: {bookingData.bookingId}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <DeliveryMap
            senderLocation={bookingData.sender.location}
            receiverLocation={bookingData.receiver.location}
          />

          {/* Map Legend */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <span className="text-sm text-muted-foreground">Drop-off</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Drone</span>
            </div>
          </div>
        </motion.div>

        {/* Tracking Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-strong p-6 mb-8"
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-6">
            Delivery Status
          </h2>

          <div className="relative">
            {trackingSteps.map((step, index) => {
              const status = getStepStatus(index);
              const StepIcon = step.icon;
              
              return (
                <motion.div 
                  key={step.label} 
                  className="flex items-start gap-4 mb-6 last:mb-0"
                  initial={false}
                  animate={status === "completed" ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        status === "completed"
                          ? "bg-green-500 text-white"
                          : status === "current"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                      initial={false}
                      animate={
                        status === "current" 
                          ? { scale: [1, 1.1, 1], boxShadow: ["0 0 0 0 hsl(var(--primary))", "0 0 0 8px hsla(var(--primary), 0.2)", "0 0 0 0 hsl(var(--primary))"] } 
                          : status === "completed"
                          ? { scale: [1, 1.2, 1] }
                          : {}
                      }
                      transition={{ 
                        duration: status === "current" ? 2 : 0.5, 
                        repeat: status === "current" ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      {status === "completed" ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </motion.div>
                      ) : status === "current" ? (
                        <StepIcon className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </motion.div>
                    {index < trackingSteps.length - 1 && (
                      <motion.div
                        className="absolute top-10 left-1/2 w-0.5 h-10 -translate-x-1/2 origin-top"
                        initial={{ scaleY: 0 }}
                        animate={{ 
                          scaleY: 1,
                          backgroundColor: status === "completed" ? "rgb(34 197 94)" : "hsl(var(--border))"
                        }}
                        transition={{ duration: 0.5, delay: status === "completed" ? 0.2 : 0 }}
                        style={{ backgroundColor: status === "completed" ? "rgb(34 197 94)" : "hsl(var(--border))" }}
                      />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <motion.p
                      className={`font-medium transition-colors duration-300 ${
                        status === "pending"
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }`}
                      animate={status === "completed" ? { color: "rgb(34 197 94)" } : {}}
                    >
                      {step.label}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">{getStepTime(index)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Location Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="font-display font-semibold text-foreground">
                Pickup Location
              </h3>
            </div>
            <p className="text-foreground font-medium">{bookingData.sender.fullName}</p>
            <p className="text-muted-foreground text-sm mt-1">
              {bookingData.sender.location}
            </p>
            <p className="text-muted-foreground text-sm">{bookingData.sender.phone}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-display font-semibold text-foreground">
                Drop-off Location
              </h3>
            </div>
            <p className="text-foreground font-medium">
              {bookingData.receiver.fullName}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {bookingData.receiver.location}
            </p>
            <p className="text-muted-foreground text-sm">{bookingData.receiver.phone}</p>
          </motion.div>
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Tracking;
