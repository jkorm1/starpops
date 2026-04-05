"use client";

import { motion } from "framer-motion";

const team = [
  {
    name: "Joseph Korm",
    role: "Founder & CEO",
    description:
      "Leading the vision and strategy of Starpops with passion and innovation",
    color: "from-yellow-500/30 to-orange-500/30",
    image: "/jkorm.png",
  },
  {
    name: "Christian Frimpong",
    role: "Human Resource Manager",
    description: "Building strong teams and fostering a culture of growth",
    color: "from-pink-500/30 to-rose-500/30",
    image: "/christian.jpg",
  },
  {
    name: "Alvin Asare",
    role: "Sales Manager",
    description: "Driving sales growth and connecting Starpops with customers",
    color: "from-blue-500/30 to-purple-500/30",
    image: "/alvin.jpg",
  },
  {
    name: "Jackson Budu",
    role: "Operations Manager",
    description: "Ensuring quality and efficiency in every batch",
    color: "from-green-500/30 to-teal-500/30",
    image: "/jackson.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function Team() {
  return (
    <section id="team" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet the <span className="glow-text-gold">Makers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Behind every magical kernel is a passionate team dedicated to
            excellence.
          </p>
        </motion.div>

        {/* Team members */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {team.map((member, idx) => (
            <motion.div key={idx} variants={itemVariants} className="group">
              {/* Team member image */}
              <div
                className={`w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Member info */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-3 text-sm">
                  {member.role}
                </p>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
