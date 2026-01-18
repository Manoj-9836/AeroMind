import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Drone Delivery", href: "#" },
        { label: "Real-time Tracking", href: "/tracking" },
        { label: "Fleet Management", href: "#" },
        { label: "Support", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Disclaimer", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative bg-background border-t border-border/50 backdrop-blur-md">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="relative">
        {/* Main Footer Content */}
        <motion.div
          className="max-w-7xl mx-auto px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <Link to="/" className="inline-block mb-4">
                <span className="font-display text-2xl font-bold text-primary">AEROMIND</span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Next generation drone delivery platform for fast, reliable, and eco-friendly logistics.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Links Sections */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div key={sectionIndex} variants={itemVariants}>
                <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Section */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-sm">Email</p>
                    <a href="mailto:support@aeromind.com" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
                      support@aeromind.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-sm">Phone</p>
                    <a href="tel:+919876543210" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-sm">Address</p>
                    <p className="text-foreground text-sm font-medium">
                      123 Tech Park, Innovation City, State 12345
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-4"
            variants={itemVariants}
          >
            {/* Copyright */}
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {currentYear} AEROMIND. All rights reserved. Crafted with{" "}
              <Heart className="inline h-4 w-4 text-primary mx-1" />
              for the future of delivery.
            </p>

            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Sitemap
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Status
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Elements for Design */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      </div>
    </footer>
  );
};

export default Footer;
