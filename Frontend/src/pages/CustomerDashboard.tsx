import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface DashboardData {
  tableNumber: number;
  orders: OrderItem[];
}

const CustomerDashboardSandbox: React.FC = () => {

  const dashboardData: DashboardData = {
    tableNumber: 4,
    orders: [
      { name: "Pacific Coast Ceviche", qty: 1, price: 14.99 },
      { name: "Red Snapper Veracruz", qty: 2, price: 21.50 },
      { name: "Mezcal Margarita", qty: 2, price: 9.50 }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header cartCount={0} onCartClick={() => {}} />

      <main className="flex-grow pt-28 px-6">
        <h2 className="text-4xl font-bold text-slate-800">
          My Order
        </h2>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerDashboardSandbox;