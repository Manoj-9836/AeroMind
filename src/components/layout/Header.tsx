import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn?: boolean;
}

const Header = ({ isLoggedIn = false }: HeaderProps) => {
  const { signOut, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleScrollTo = (id: string) => {
    // If already on home, scroll directly
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Otherwise navigate to home and pass desired scroll target in state
    navigate("/", { state: { scrollTo: id } });
    setIsMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-background/80"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-primary">AEROMIND</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <Link to="/" className="nav-link text-sm">Home</Link>
          <button type="button" onClick={() => handleScrollTo("about")} className="nav-link text-sm">About</button>
          <button type="button" onClick={() => handleScrollTo("services")} className="nav-link text-sm">Services</button>
          <Link to="/contact" className="nav-link text-sm">Contact</Link>
          {isLoggedIn && (
            <>
              {userRole === "admin" ? (
                <Link to="/admin-dashboard" className="nav-link text-sm font-semibold text-primary">Admin Dashboard</Link>
              ) : (
                <Link to="/dashboard" className="nav-link text-sm">My Dashboard</Link>
              )}
            </>
          )}
        </nav>

        {/* Desktop Logout Button */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn && (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          animate={{ rotate: isMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-primary" />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.nav
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? "auto" : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden backdrop-blur-md bg-background/80"
      >
        <div className="flex flex-col gap-4 mt-4 pb-4 border-t border-border pt-4">
          <Link to="/" className="nav-link text-sm" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <button type="button" onClick={() => handleScrollTo("about")} className="nav-link text-sm text-left">About</button>
          <button type="button" onClick={() => handleScrollTo("services")} className="nav-link text-sm text-left">Services</button>
          <Link to="/contact" className="nav-link text-sm" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          
          {isLoggedIn && (
            <>
              {userRole === "admin" ? (
                <>
                  <Link to="/admin-dashboard" className="nav-link text-sm font-semibold text-primary" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="nav-link text-sm" onClick={() => setIsMenuOpen(false)}>My Dashboard</Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </motion.nav>
    </motion.header>
  );
};

export default Header;
