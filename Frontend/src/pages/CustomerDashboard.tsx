import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { CustomerOrderDTO } from '../types';
import { ItemDTOHelper } from '../types';
import CustomerDashboardHeader from "../components/CustomerDashboardHeader";
import {MOCK_ORDERS} from "../mockOrders";

const API_BASE = "http://localhost:8080";

const CustomerDashboard: React.FC = () => {
  const [orders, setOrders] = useState<CustomerOrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Track which order is currently being sent to Stripe (by id)
  const [payingOrderId, setPayingOrderId] = useState<number | null>(null);
  const [payError, setPayError] = useState<string | null>(null);

  useEffect(() => {
    setOrders(MOCK_ORDERS);
    setLoading(false);
  }, []);

  const handlePay = async (orderId: number) => {
    setPayingOrderId(orderId);
    setPayError(null);
    try {
      const res = await fetch(`${API_BASE}/api/stripe/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create checkout session.");
      }

      const { url } = await res.json();
      if (!url) throw new Error("No checkout URL returned from Stripe.");

      // Redirect to Stripe hosted checkout page
      window.location.href = url;
    } catch (err: any) {
      setPayError(err?.message ?? "Payment failed. Please try again.");
    } finally {
      setPayingOrderId(null);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
          <CustomerDashboardHeader />
          <main className="flex-grow pt-28 px-6 flex items-center justify-center">
            <div className="text-slate-500 font-medium animate-pulse">Loading your orders…</div>
          </main>
          <Footer />
        </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
          <CustomerDashboardHeader />
          <main className="flex-grow pt-28 px-6 flex items-center justify-center">
            <div className="text-red-600 font-semibold">{error}</div>
          </main>
          <Footer />
        </div>
    );
  }

  return (
      <div className="min-h-screen flex flex-col bg-white">
        <CustomerDashboardHeader />

        <main className="flex-grow pt-28 px-6 pb-16">
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-4xl font-bold text-slate-800">My Orders</h2>

            {payError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
                  {payError}
                </div>
            )}

            {orders.length === 0 ? (
                <div className="text-center py-24 border border-slate-100 rounded-2xl bg-slate-50">
                  <span className="material-symbols-outlined text-6xl text-slate-200">receipt_long</span>
                  <p className="mt-4 text-slate-500 font-medium serif-text text-xl italic">
                    You have no active orders.
                  </p>
                </div>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className="rounded-2xl border border-slate-100 shadow-sm bg-white overflow-hidden"
                    >
                      {/* Order header */}
                      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            Order #{order.id}
                          </p>
                          <p className="text-sm font-semibold text-slate-700">
                            Table {order.tableNumber > 0 ? order.tableNumber : "N/A"}
                          </p>
                        </div>
                        <div className="text-right space-y-0.5">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary">
                      {order.status}
                    </span>
                          <p className="text-xs text-slate-400">
                            {order.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
                          </p>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="px-6 py-4 space-y-3">
                        {order.items.length === 0 ? (
                            <p className="text-slate-400 text-sm italic">No items in this order.</p>
                        ) : (
                            order.items.map((item: ItemDTOHelper, index: number) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0"
                                >
                                  <div>
                                    <p className="font-semibold text-slate-800">{item.menuItemName}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Qty: {item.menuItemQuantity}</p>
                                  </div>
                                  <div className="text-sm font-bold text-slate-700">
                                    {(item as any).price
                                        ? `£${((item as any).price * item.menuItemQuantity).toFixed(2)}`
                                        : "—"}
                                  </div>
                                </div>
                            ))
                        )}
                      </div>

                      {/* Footer: total + actions */}
                      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total</p>
                          <p className="text-2xl font-bold text-slate-900 serif-text">
                            £{order.totalPrice.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold uppercase tracking-wider hover:bg-slate-100 transition-all active:scale-95">
                            Call A Waiter
                          </button>

                          {/* Pay button — only shown when order has items */}
                          {order.items.length > 0 && (
                              <button
                                  onClick={() => handlePay(order.id)}
                                  disabled={payingOrderId === order.id}
                                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold uppercase tracking-wider hover:bg-accent transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                        <span className="material-symbols-outlined text-lg">
                          {payingOrderId === order.id ? "hourglass_top" : "payment"}
                        </span>
                                {payingOrderId === order.id ? "Redirecting…" : "Pay"}
                              </button>
                          )}
                        </div>
                      </div>
                    </div>
                ))
            )}
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default CustomerDashboard;
