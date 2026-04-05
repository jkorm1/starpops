"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

export function Navigation() {
  const items = useCart((state) => state.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    handleScroll("checkout");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="Starpops Logo"
            className="h-10 w-10 rounded-full object-cover border border-yellow-500/50"
          />
          <div className="text-2xl font-bold glow-text-gold tracking-tighter">
            STARPOPS
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleScroll("products")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Products
          </button>
          <button
            onClick={() => handleScroll("story")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Story
          </button>
          <button
            onClick={() => handleScroll("team")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Team
          </button>
          <Button
            onClick={() => handleScroll("products")}
            className="bg-primary hover:bg-primary/90 text-sm px-4 py-2"
          >
            Order Now
          </Button>
          <button
            onClick={handleCartClick}
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={handleCartClick}
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            <button
              onClick={() => handleScroll("products")}
              className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
            >
              Products
            </button>
            <button
              onClick={() => handleScroll("story")}
              className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
            >
              Story
            </button>
            <button
              onClick={() => handleScroll("team")}
              className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
            >
              Team
            </button>
            <Button
              onClick={() => handleScroll("products")}
              className="bg-primary hover:bg-primary/90 text-sm w-full"
            >
              Order Now
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
