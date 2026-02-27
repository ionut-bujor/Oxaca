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

  const total = dashboardData.orders.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header cartCount={0} onCartClick={() => {}} />

      <main className="flex-grow pt-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

          <div className="space-y-8">

            <h2 className="text-4xl font-bold text-slate-800">
              My Order
            </h2>

            <div className="space-y-4">
              {dashboardData.orders.map((order, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-lg text-slate-800">
                      {order.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      Quantity: {order.qty}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-slate-700">
                      £{(order.qty * order.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <span className="text-xl font-bold text-slate-800">
                Total
              </span>
              <span className="text-xl font-bold text-primary">
                £{total.toFixed(2)}
              </span>
            </div>

            <button className="w-full mt-6 bg-primary hover:bg-darkGreen text-white py-4 rounded-2xl font-bold tracking-wider transition active:scale-95 shadow-lg">
              Proceed To Pay
            </button>

          </div>

          <div className="space-y-10 pt-2">

            <div className="text-center space-y-6 border-b-4 border-primary pb-8">
              <h3 className="text-2xl font-bold uppercase tracking-widest text-primary">
                Table Number {dashboardData.tableNumber}
              </h3>

              <button
                className="group text-3xl font-bold text-slate-800 
                           hover:text-primary transition-all duration-300"
              >
                Your Previous Orders
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-2">
                  →
                </span>
              </button>
            </div>

            <button className="w-full bg-primary hover:bg-darkGreen text-white py-5 rounded-2xl text-xl font-semibold tracking-wide transition shadow-xl active:scale-95">
              Call A Waiter
            </button>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerDashboardSandbox;