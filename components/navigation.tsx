"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export function Navigation() {
  const items = useCart((state) => state.items);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCartClick = () => {
    handleScroll("checkout");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Added rounded-full, object-cover, and forced square dimensions */}
          <img
            src="/logo.jpg"
            alt="Starpops Logo"
            className="h-10 w-10 rounded-full object-cover border border-yellow-500/50"
          />
          <div className="text-2xl font-bold glow-text-gold tracking-tighter">
            STARPOPS
          </div>
        </div>

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
            className="bg-primary hover:bg-primary/90"
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
      </div>
    </nav>
  );
}
