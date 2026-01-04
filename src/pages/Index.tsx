import { useState } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/landing/HeroSection";

const Index = () => {
  // This will be replaced with actual auth state later
  const [isLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isLoggedIn} />
      <HeroSection isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Index;
