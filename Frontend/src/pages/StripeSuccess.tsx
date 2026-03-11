import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonlessHeader from "../components/ButtonlessHeader";
import Footer from "../components/Footer";

const StripeSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
      <div className="min-h-[120vh] flex flex-col bg-background-light">
        <ButtonlessHeader />

        <main className="flex-grow px-6 pt-32 pb-32">
          <div
              className={`max-w-lg w-full mx-auto text-center transition-all duration-700 ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {/* Animated checkmark circle */}
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute w-28 h-28 rounded-full bg-primary/10 animate-ping opacity-30" />
              <div className="relative w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="serif-text text-5xl font-bold text-slate-900 mb-3">
              Payment <span className="italic text-primary">Confirmed</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-2">
              Thank you! Your payment was successful.
            </p>
            <p className="text-slate-400 text-sm mb-10">
              Sit back and relax — your order is already being taken care of.
            </p>

            {/* Session ID badge */}
            {sessionId && (
                <div className="inline-block mb-10 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                    Session Reference
                  </p>
                  <p className="text-xs font-mono text-slate-600 truncate max-w-xs">
                    {sessionId}
                  </p>
                </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-grow h-px bg-slate-100" />
              <span className="material-symbols-outlined text-primary text-xl">restaurant</span>
              <div className="flex-grow h-px bg-slate-100" />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">receipt_long</span>
                View My Orders
              </button>
              <button
                  onClick={() => navigate("/")}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 border border-slate-200 text-slate-600 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
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

export default StripeSuccess;
