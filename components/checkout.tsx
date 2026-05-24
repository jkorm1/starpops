"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Checkout() {
  const items = useCart((state) => state.items);
  const getTotal = useCart((state) => state.getTotal);
  const clearCart = useCart((state) => state.clearCart);
  const removeItem = useCart((state) => state.removeItem);
  const router = useRouter();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = getTotal();
  const hasItems = items.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !location || !contact) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      customer: {
        name: name,
        phone: contact,
        address: location,
      },
      note: note,
      items: items.map((item) => ({
        // Combines category and flavor with a hyphen, e.g., "Starter-Caramel"
        name: `${item.categoryName} ${item.flavor}`,
        // Adds 'Q' prefix to quantity, e.g., "Q3"
        quantity: `=${item.quantity}`,
      })),

      total: total,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Order placed successfully!", {
          description: `Your order ${data.orderId} has been received.`,
        });
        clearCart();
        router.push("/order-confirmation");
      } else {
        toast.error("Order failed", {
          description:
            data.error || "There was an issue processing your order.",
        });
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Order failed", {
        description:
          "There was an issue processing your order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasItems) {
    return null;
  }

  return (
    <section id="checkout" className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-2">
          Your <span className="text-primary">Order</span>
        </h2>
        <p className="text-muted-foreground">
          Review your items and complete checkout
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <Card className="p-6 border-2 border-primary/30">
            <h3 className="text-xl font-bold mb-4">Order Items</h3>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{item.categoryName}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.flavor} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold">
                      {(item.price * item.quantity).toFixed(2)} CEDIS
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">Total:</p>
                <p className="text-3xl font-bold text-primary">
                  {total.toFixed(2)} CEDIS
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Checkout Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 border-2 border-primary/30">
            <h3 className="text-xl font-bold mb-4">Your Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold block mb-2">Name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-2">
                  Location
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Evandy Hostel, Room 6"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-2">
                  Contact
                </label>
                <Input
                  type="tel"
                  placeholder="Phone number or WhatsApp"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-2">
                  Order Note (Optional)
                </label>
                <textarea
                  placeholder="Any special requests or delivery instructions?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 rounded-md bg-input border border-border focus:border-primary outline-none transition-colors resize-none text-sm"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 font-semibold py-6 text-lg"
              >
                {isSubmitting ? "Submitting..." : "Complete Order"}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
