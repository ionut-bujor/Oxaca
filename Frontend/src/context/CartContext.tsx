import React, { createContext, useContext } from "react";
import { useCart } from "../hooks/useCart";

type CartStore = ReturnType<typeof useCart>;

const CartContext = createContext<CartStore | null>(null);

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const cartStore = useCart();
  return <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>;
};

export const useCartStore = (): CartStore => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartStore must be used within CartProvider");
  return ctx;
};