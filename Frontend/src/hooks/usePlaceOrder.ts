import { useState } from "react";
import { CartItem } from "../types";
import { placeOrder } from "../services/orderservice";

export function usePlaceOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const submit = async (params: { userId: number; tableNumber: number; cart: CartItem[] }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await placeOrder(params);
      setData(result);
      return result;
    } catch (e: any) {
      setError(e?.message ?? "Failed to place order");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, data };
}