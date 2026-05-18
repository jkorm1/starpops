"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

// Flying items component
const FloatingItem = ({
  delay,
  duration,
  x,
  y,
  emoji,
  size,
}: {
  delay: number;
  duration: number;
  x: string;
  y: string;
  emoji: string;
  size: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "text-xl md:text-2xl",
    md: "text-3xl md:text-4xl",
    lg: "text-5xl md:text-7xl",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0.4, 0.8, 0.4],
        y: [0, -300, -600],
        x: [0, Math.random() * 100 - 50, Math.random() * 150 - 75],
      }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
      className={`absolute ${sizeClasses[size]} pointer-events-none`}
      style={{ left: x, top: y }}
    >
      {emoji}
    </motion.div>
  );
};

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Dominant popcorn cups with toppings
  const floatingItems = [
    // Large dominant popcorn cups
    {
      emoji: "🍿",
      delay: 0,
      duration: 6,
      x: "8%",
      y: "5%",
      size: "lg" as const,
    },
    {
      emoji: "🍿",
      delay: 0.4,
      duration: 7.2,
      x: "50%",
      y: "8%",
      size: "lg" as const,
    },
    {
      emoji: "🍿",
      delay: 0.8,
      duration: 6.8,
      x: "85%",
      y: "6%",
      size: "lg" as const,
    },
    {
      emoji: "🍿",
      delay: 0.2,
      duration: 7.5,
      x: "20%",
      y: "25%",
      size: "lg" as const,
    },
    {
      emoji: "🍿",
      delay: 0.6,
      duration: 6.5,
      x: "70%",
      y: "28%",
      size: "lg" as const,
    },

    // Medium popcorn cups
    {
      emoji: "🍿",
      delay: 1,
      duration: 8,
      x: "35%",
      y: "15%",
      size: "md" as const,
    },
    {
      emoji: "🍿",
      delay: 1.5,
      duration: 6.5,
      x: "65%",
      y: "20%",
      size: "md" as const,
    },
    {
      emoji: "🍿",
      delay: 0.3,
      duration: 7.5,
      x: "12%",
      y: "35%",
      size: "md" as const,
    },

    // Toppings - smaller
    {
      emoji: "🍓",
      delay: 0.2,
      duration: 7.2,
      x: "10%",
      y: "18%",
      size: "sm" as const,
    },
    {
      emoji: "🟡",
      delay: 0.7,
      duration: 6.9,
      x: "45%",
      y: "20%",
      size: "sm" as const,
    },
    {
      emoji: "🍬",
      delay: 1.1,
      duration: 7.5,
      x: "75%",
      y: "15%",
      size: "sm" as const,
    },
    {
      emoji: "🔴",
      delay: 0.4,
      duration: 6.6,
      x: "25%",
      y: "32%",
      size: "sm" as const,
    },
    {
      emoji: "🟠",
      delay: 0.9,
      duration: 7.3,
      x: "90%",
      y: "30%",
      size: "sm" as const,
    },
    {
      emoji: "🟢",
      delay: 0.5,
      duration: 7,
      x: "15%",
      y: "8%",
      size: "sm" as const,
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden w-full"
      style={{ position: "relative" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80"></div>

      {/* Animated background glow orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-500/15 to-transparent rounded-full filter blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-pink-500/15 to-transparent rounded-full filter blur-3xl animate-pulse-glow"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-bl from-blue-500/15 to-transparent rounded-full filter blur-3xl animate-pulse-glow"></div>

      {/* Flying popcorn background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingItems.map((item, idx) => (
          <FloatingItem
            key={idx}
            emoji={item.emoji}
            delay={item.delay}
            duration={item.duration}
            x={item.x}
            y={item.y}
            size={item.size}
          />
        ))}
      </div>

      {/* Main content - Vertical layout with image between text */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4 py-8 md:py-12">
        {/* Top - Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-8 z-30"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-2">
            <span className="glow-text-gold">STAR</span>
            <span className="glow-text-gold">POPS</span>
          </h2>
          <p className="text-xl md:text-2xl text-primary font-semibold italic mb-2">
            Feel the pops!
          </p>
          <p className="text-base md:text-lg text-muted-foreground">
            🍿 Premium Specialty Popcorn House
          </p>
        </motion.div>

        {/* Middle - Hero Image - Spinning Popcorn */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-64 h-64 md:w-80 md:h-80 my-8 md:my-12 animate-spin-smooth z-20"
        >
          <Image
            src="/hero.png"
            alt="Ultimate Starpops - Premium Popcorn"
            fill
            className="object-cover rounded-full shadow-2xl glow-gold"
            priority
            loading="eager"
          />
        </motion.div>

        {/* Bottom - Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-6 md:mt-8 z-30 flex flex-col items-center"
        >
          <Button
            onClick={() => scrollToSection("products")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold text-xl md:text-3xl px-16 md:px-24 py-7 md:py-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            ORDER NOW
          </Button>

          <p className="text-sm md:text-base text-muted-foreground mt-6 opacity-80 max-w-md">
            Experience the Magic of Every Kernel
          </p>
        </motion.div>
      </div>
    </section>
  );
}
