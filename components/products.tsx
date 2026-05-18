"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import Image from "next/image";

const products = [
  {
    id: "starter",
    name: "Starter",
    price: 10,
    image: "/starter-popcorn.jpg",
    description: "Popcorn, Milk",
    flavors: ["Caramel", "Strawberry", "Chocolate"],
  },
  {
    id: "deluxe",
    name: "Deluxe",
    price: 15,
    image: "/deluxe-popcorn.jpg",
    description:
      "Popcorn, Milk,  Choice of Caramel or Strawberry topping, Skittles",
    flavors: ["Caramel", "Strawberry"],
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: 20,
    image: "/ultimate-popcorn.jpg",
    description:
      "Popcorn, Milk, Choice of Caramel or Strawberry topping, Skittles, Gelly Gummies, Oreos",
    flavors: ["Caramel", "Strawberry"],
  },
];

export function Products() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<{
    [key: string]: string;
  }>({
    starter: "Caramel",
    deluxe: "Caramel",
    ultimate: "Caramel",
  });
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    starter: 1,
    deluxe: 1,
    ultimate: 1,
  });

  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = (product: (typeof products)[0]) => {
    const item = {
      id: `${product.id}-${selectedFlavors[product.id]}-${Date.now()}`,
      category: product.id as "starter" | "deluxe" | "ultimate",
      categoryName: product.name,
      price: product.price,
      flavor: selectedFlavors[product.id],
      quantity: quantities[product.id],
    };

    addItem(item);
    toast.success(`Added ${quantities[product.id]}x ${product.name} to cart!`);
    setExpandedProduct(null);
    setQuantities({ ...quantities, [product.id]: 1 });
  };

  return (
    <section id="products" className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Choose Your <span className="text-primary">Perfect Popcorn</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Click on any product image to order
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex flex-col"
          >
            {/* Product Image Card - Clickable */}
            <motion.div
              onClick={() =>
                setExpandedProduct(
                  expandedProduct === product.id ? null : product.id,
                )
              }
              className="relative h-80 cursor-pointer overflow-hidden border-2 border-primary/30 hover:border-primary transition-all duration-300 rounded-xl group"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-yellow-400 text-2xl font-bold">
                  {product.price}.00 CEDIS
                </p>
                <p className="text-white/80 text-sm mt-2 italic">
                  Click to order
                </p>
              </div>
            </motion.div>

            {/* Product Description */}
            <div className="mt-2 p-3 bg-card/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground text-center">
                {product.description}
              </p>
            </div>

            {/* Inline Order Form - Expandable */}
            <AnimatePresence>
              {expandedProduct === product.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Card className="p-5 bg-card border-2 border-primary/40 space-y-4">
                    {/* Flavor Selection */}
                    {product.id !== "starter" && (
                      <div>
                        <label className="text-sm font-semibold text-foreground block mb-3">
                          Select Flavor
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {product.flavors.map((flavor) => (
                            <button
                              key={flavor}
                              onClick={() =>
                                setSelectedFlavors({
                                  ...selectedFlavors,
                                  [product.id]: flavor,
                                })
                              }
                              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                selectedFlavors[product.id] === flavor
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted border border-border hover:bg-muted/80"
                              }`}
                            >
                              {flavor}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quantity Selection */}
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-3">
                        Quantity
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setQuantities({
                              ...quantities,
                              [product.id]: Math.max(
                                1,
                                quantities[product.id] - 1,
                              ),
                            })
                          }
                          className="w-10 h-10 rounded-lg bg-muted border border-border hover:bg-muted/80 font-bold"
                        >
                          -
                        </button>
                        <Input
                          type="number"
                          value={quantities[product.id]}
                          onChange={(e) =>
                            setQuantities({
                              ...quantities,
                              [product.id]: Math.max(
                                1,
                                parseInt(e.target.value) || 1,
                              ),
                            })
                          }
                          className="text-center flex-1 font-semibold"
                          min="1"
                        />
                        <button
                          onClick={() =>
                            setQuantities({
                              ...quantities,
                              [product.id]: quantities[product.id] + 1,
                            })
                          }
                          className="w-10 h-10 rounded-lg bg-muted border border-border hover:bg-muted/80 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-xs text-muted-foreground">
                        Item Total
                      </p>
                      <p className="text-xl font-bold text-primary">
                        {(product.price * quantities[product.id]).toFixed(2)}{" "}
                        CEDIS
                      </p>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-primary hover:bg-primary/90 font-semibold py-5"
                    >
                      Add to Cart
                    </Button>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
