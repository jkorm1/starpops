"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useState, useRef } from "react";
import { toast } from "sonner";

export function CartSummary() {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const getTotal = useCart((state) => state.getTotal);
  const clearCart = useCart((state) => state.clearCart);
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    toast.success("Order submitted! We will contact you shortly.");
    clearCart();
    setIsOpen(false);
  };

  const openCart = () => {
    setIsOpen(true);
    setTimeout(() => {
      cartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        data-cart-button
        onClick={() => (isOpen ? setIsOpen(false) : openCart())}
        className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShoppingCart className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </motion.button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Drawer */}
            <motion.div
              ref={cartRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-2xl font-bold">Your Order</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <ShoppingCart className="w-12 h-12 mb-4 opacity-50" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-4 rounded-lg bg-background border border-border"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold">{item.categoryName}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.flavor}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                              className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs"
                            >
                              −
                            </button>
                            <span className="w-6 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs"
                            >
                              +
                            </button>
                          </div>
                          <p className="font-semibold">
                            {(item.price * item.quantity).toFixed(2)} GHS
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer with Total */}
              {items.length > 0 && (
                <div className="border-t border-border p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{getTotal().toFixed(2)} GHS</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        {getTotal().toFixed(2)} GHS
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90"
                  >
                    Complete Order
                  </Button>

                  <Button
                    onClick={clearCart}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Cart
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
