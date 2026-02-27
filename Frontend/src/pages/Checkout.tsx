import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../context/CartContext";
import { usePlaceOrder } from "../hooks/usePlaceOrder";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCartStore();
  const { submit, loading, error } = usePlaceOrder();

  const [tableNumber, setTableNumber] = useState<string>("");

  // TODO: Replace with real logged-in user id once auth is wired
  const userId = 1;

  const onFinalise = async () => {
    const tn = Number(tableNumber);
    if (!Number.isInteger(tn) || tn <= 0) return;

    const res = await submit({ userId, tableNumber: tn, cart });
    clearCart();
    navigate("/order-confirmation", { state: { order: res } });
  };

  const tableOk = Number.isInteger(Number(tableNumber)) && Number(tableNumber) > 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="serif-text text-4xl font-bold text-slate-900">Checkout</h1>
            <p className="text-slate-500 mt-2">Confirm your order and enter your table number.</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
          >
            Back to menu
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-10 text-center">
            <p className="text-slate-600 font-bold">Your basket is empty.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all"
            >
              Browse menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: items */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
                Order Summary
              </h2>

              <div className="space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <p className="text-slate-500 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-slate-900">
                          £{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: table + total */}
            <div className="rounded-2xl border border-slate-100 p-6 bg-slate-50">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
                Table Number
              </h2>

              <input
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. 12"
                type="number"
                min={1}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              {!tableOk && tableNumber !== "" && (
                <p className="text-red-600 text-sm mt-2">Please enter a valid table number.</p>
              )}

              <div className="flex justify-between items-center mt-8 mb-6">
                <span className="uppercase text-xs font-bold tracking-[0.2em] text-slate-500">
                  Order Total
                </span>
                <span className="serif-text text-3xl font-bold text-slate-900">
                  £{totalPrice.toFixed(2)}
                </span>
              </div>

              {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

              <button
                disabled={!tableOk || loading}
                onClick={onFinalise}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Finalising..." : "Finalise Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;