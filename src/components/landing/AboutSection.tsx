import { motion } from "framer-motion";

const team = [
  {
    name: "B. Manoj Kumar",
    role: "CEO & Founder",
    bio: "Visionary leader driving innovation in autonomous logistics.",
  },
  {
    name: "G. Jhansi",
    role: "CTO & Co-Founder",
    bio: "Systems architect focused on reliable flight orchestration.",
  },
  {
    name: "Ch. Bhuvana Sai",
    role: "CTO & Co-Founder",
    bio: "Systems architect focused on reliable flight orchestration.",
  },
  {
    name: "Ch. Mohan Sathvik",
    role: "Lead Engineer",
    bio: "Designs drones and embedded systems for safety and range.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
          About Our Team
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A compact, cross-functional team combining aerospace engineering,
          autonomous systems and logistics expertise — united to make drone
          delivery safe, efficient and accessible.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-6 text-center"
          >
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">
                {member.name.split(" ").map((n) => n[0]).slice(0,2).join("")}
              </span>
            </div>
            <div className="font-medium text-foreground">{member.name}</div>
            <div className="text-sm text-muted-foreground">{member.role}</div>
            <p className="text-sm text-muted-foreground mt-3">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
