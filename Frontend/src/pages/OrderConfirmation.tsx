import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = (location.state as any)?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-10 text-center">
            <p className="text-slate-600 font-bold">No order found.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all"
            >
              Back to menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="serif-text text-4xl font-bold text-slate-900">Order confirmed 🎉</h1>
            <p className="text-slate-500 mt-2">
              Thanks! Your order has been placed. You can show this screen to staff if needed.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
          >
            Back to menu
          </button>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
            Order Details
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="uppercase text-xs font-bold tracking-[0.2em] text-slate-500">
                Order ID
              </span>
              <span className="font-bold text-slate-900">{order.id}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="uppercase text-xs font-bold tracking-[0.2em] text-slate-500">
                Table
              </span>
              <span className="font-bold text-slate-900">{order.tableNumber}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="uppercase text-xs font-bold tracking-[0.2em] text-slate-500">
                Status
              </span>
              <span className="font-bold text-slate-900">{order.status ?? "N/A"}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-8 w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl shadow-primary/20 active:scale-95"
          >
            Back to menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;