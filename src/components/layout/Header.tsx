import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  isLoggedIn?: boolean;
}

const Header = ({ isLoggedIn = false }: HeaderProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="glass-card px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-primary">AEROMIND</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="nav-link text-sm">Home</Link>
          <Link to="/about" className="nav-link text-sm">About</Link>
          <Link to="/services" className="nav-link text-sm">Services</Link>
          <Link to="/contact" className="nav-link text-sm">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Link to="/book">
                <Button variant="hero" size="sm">Book a Drone</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero" size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
