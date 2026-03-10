import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonlessHeader from "../components/ButtonlessHeader";
import Footer from "../components/Footer";

const StripeCancel: React.FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
      <div className="min-h-screen flex flex-col bg-background-light">
        <ButtonlessHeader />

        <main className="flex-grow px-6 pt-32 pb-32">
          <div
              className={`max-w-lg w-full mx-auto text-center transition-all duration-700 ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {/* Icon */}
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="relative w-24 h-24 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-accent">cancel</span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="serif-text text-5xl font-bold text-slate-900 mb-3">
              Payment <span className="italic text-accent">Cancelled</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-2">
              No worries — your order has not been placed.
            </p>
            <p className="text-slate-400 text-sm mb-10">
              You can go back to your dashboard and try again whenever you're ready.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-grow h-px bg-slate-100" />
              <span className="material-symbols-outlined text-slate-300 text-xl">restaurant</span>
              <div className="flex-grow h-px bg-slate-100" />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
                Back to My Orders
              </button>
              <button
                  onClick={() => navigate("/")}
                  className="flex items-center justify-center gap-2 px-8 py-4 border border-slate-200 text-slate-600 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">restaurant_menu</span>
                Back to Menu
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default StripeCancel;
