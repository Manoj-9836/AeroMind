import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  FileCheck,
  Check,
  CreditCard,
  Smartphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Step = "sender" | "receiver" | "payment";

interface FormData {
  sender: {
    fullName: string;
    phone: string;
    email: string;
    hasProof: boolean;
    location: string;
  };
  receiver: {
    fullName: string;
    phone: string;
    email: string;
    hasProof: boolean;
    location: string;
  };
  payment: {
    method: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
  };
}

const Booking = () => {
  const [currentStep, setCurrentStep] = useState<Step>("sender");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    sender: { fullName: "", phone: "", email: "", hasProof: false, location: "" },
    receiver: { fullName: "", phone: "", email: "", hasProof: false, location: "" },
    payment: { method: "" },
  });

  const steps: { key: Step; label: string }[] = [
    { key: "sender", label: "Sender Details" },
    { key: "receiver", label: "Receiver Details" },
    { key: "payment", label: "Payment" },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);

  const updateFormData = (step: keyof FormData, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [step]: { ...prev[step], [field]: value },
    }));
  };

  const validateStep = (step: Step): boolean => {
    if (step === "sender") {
      const { fullName, phone, email, hasProof, location } = formData.sender;
      return !!(fullName && phone && email && hasProof && location);
    }
    if (step === "receiver") {
      const { fullName, phone, email, hasProof, location } = formData.receiver;
      return !!(fullName && phone && email && hasProof && location);
    }
    if (step === "payment") {
      return !!formData.payment.method;
    }
    return false;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === "sender") setCurrentStep("receiver");
    else if (currentStep === "receiver") setCurrentStep("payment");
  };

  const handleBack = () => {
    if (currentStep === "receiver") setCurrentStep("sender");
    else if (currentStep === "payment") setCurrentStep("receiver");
  };

  const handleSubmit = () => {
    if (!validateStep("payment")) {
      toast({
        title: "Select Payment Method",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const bookingId = `DRN-${Date.now().toString(36).toUpperCase()}`;
      
      toast({
        title: "Booking Confirmed!",
        description: "Your drone delivery has been scheduled.",
      });
      
      // Navigate to tracking page with booking data
      navigate("/tracking", {
        state: {
          sender: formData.sender,
          receiver: formData.receiver,
          bookingId,
        },
      });
      setLoading(false);
    }, 2000);
  };

  const paymentMethods = [
    { id: "card", label: "Credit/Debit Card", icon: CreditCard },
    { id: "phonepe", label: "PhonePe", icon: Smartphone },
    { id: "gpay", label: "Google Pay", icon: Smartphone },
    { id: "paytm", label: "Paytm", icon: Smartphone },
  ];

  const renderPersonForm = (type: "sender" | "receiver") => {
    const data = formData[type];
    const title = type === "sender" ? "Sender Details" : "Receiver Details";
    const subtitle = type === "sender" 
      ? "Enter the pickup location and sender information"
      : "Enter the delivery location and receiver information";

    return (
      <motion.div
        key={type}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground mt-2">{subtitle}</p>
        </div>

        <div className="grid gap-5">
          <div className="space-y-2">
            <Label htmlFor={`${type}-fullName`}>Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id={`${type}-fullName`}
                placeholder="John Doe"
                value={data.fullName}
                onChange={(e) => updateFormData(type, "fullName", e.target.value)}
                className="pl-10 input-glow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${type}-phone`}>Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id={`${type}-phone`}
                type="tel"
                placeholder="+91 98765 43210"
                value={data.phone}
                onChange={(e) => updateFormData(type, "phone", e.target.value)}
                className="pl-10 input-glow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${type}-email`}>Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id={`${type}-email`}
                type="email"
                placeholder="john@example.com"
                value={data.email}
                onChange={(e) => updateFormData(type, "email", e.target.value)}
                className="pl-10 input-glow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${type}-location`}>{type === "sender" ? "Pickup" : "Delivery"} Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id={`${type}-location`}
                placeholder="123 Main Street, City, State"
                value={data.location}
                onChange={(e) => updateFormData(type, "location", e.target.value)}
                className="pl-10 input-glow"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 glass-card">
            <Checkbox
              id={`${type}-proof`}
              checked={data.hasProof}
              onCheckedChange={(checked) => updateFormData(type, "hasProof", !!checked)}
            />
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor={`${type}-proof`} className="cursor-pointer">
                I confirm identity verification / proof of address *
              </Label>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderPaymentForm = () => (
    <motion.div
      key="payment"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground">Payment Method</h2>
        <p className="text-muted-foreground mt-2">Select your preferred payment method</p>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = formData.payment.method === method.id;

          return (
            <button
              key={method.id}
              onClick={() => updateFormData("payment", "method", method.id)}
              className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected 
                  ? "border-primary bg-primary/10 glow-box" 
                  : "border-border hover:border-primary/50 bg-card"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                  {method.label}
                </span>
              </div>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {formData.payment.method === "card" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-4 mt-6"
        >
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.payment.cardNumber || ""}
              onChange={(e) => updateFormData("payment", "cardNumber", e.target.value)}
              className="input-glow"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={formData.payment.expiry || ""}
                onChange={(e) => updateFormData("payment", "expiry", e.target.value)}
                className="input-glow"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                placeholder="•••"
                maxLength={4}
                value={formData.payment.cvv || ""}
                onChange={(e) => updateFormData("payment", "cvv", e.target.value)}
                className="input-glow"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Order Summary */}
      <div className="glass-card p-6 mt-8">
        <h3 className="font-display font-semibold text-foreground mb-4">Order Summary</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className="text-foreground">₹299</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service Tax</span>
            <span className="text-foreground">₹54</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-primary">₹353</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

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

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Book a Drone</h1>
              <p className="text-muted-foreground text-sm">Schedule your delivery in minutes</p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className={`step-indicator ${
                  index < currentStepIndex ? "completed" : 
                  index === currentStepIndex ? "active" : "pending"
                }`}>
                  {index < currentStepIndex ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`ml-2 text-sm hidden sm:block ${
                  index === currentStepIndex ? "text-foreground font-medium" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-20 h-0.5 mx-3 ${
                    index < currentStepIndex ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Content */}
        <div className="glass-card-strong p-8">
          <AnimatePresence mode="wait">
            {currentStep === "sender" && renderPersonForm("sender")}
            {currentStep === "receiver" && renderPersonForm("receiver")}
            {currentStep === "payment" && renderPaymentForm()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {currentStep !== "sender" ? (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep !== "payment" ? (
              <Button variant="hero" onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                variant="hero" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm & Pay ₹353"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
