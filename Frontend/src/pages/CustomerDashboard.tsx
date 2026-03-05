import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CustomerOrderDTO } from '../types';
import { ItemDTOHelper } from '../types';
import CustomerDashboardHeader from "../components/CustomerDashboardHeader";

const CustomerDashboard: React.FC = () => {
  const [order, setOrder] = useState<CustomerOrderDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching dashboard...");
    fetch("http://localhost:8080/dashboard", {
      credentials: "include",
    })
      .then(res => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error(`Failed to fetch dashboard: ${res.status}`);
        return res.json();
      })
      .then((data: CustomerOrderDTO[]) => {
        console.log("Data received:", data);
        if (data.length > 0) {
          setOrder(data[0]);
        } else {
          // Handle no orders by creating a placeholder
          setOrder({
            id: 0,
            tableNumber: 0,
            status: "NO_ORDER",
            createdAt: new Date().toISOString(),
            items: [],
            totalPrice: 0,
          });
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Could not load dashboard. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!order) return <div className="p-6">No data available</div>;

  const total = order.items.reduce(
    (sum, item) => sum + (item.price ? item.price * item.menuItemQuantity : 0),
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerDashboardHeader/>

      <main className="flex-grow pt-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

          {/* Orders List */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-slate-800">My Order</h2>

            {order.items.length === 0 ? (
              <p className="text-slate-500">You have no orders yet.</p>
            ) : (
              <div className="space-y-4">
                {order.items.map((item: ItemDTOHelper, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl shadow-sm border border-slate-100"
                  >
                    <div>
                      <p className="font-semibold text-lg text-slate-800">
                        {item.menuItemName}
                      </p>
                      <p className="text-sm text-slate-500">
                        Quantity: {item.menuItemQuantity}
                      </p>
                    </div>
                    <div className="text-right">
                      {item.price
                        ? `£${(item.menuItemQuantity * item.price).toFixed(2)}`
                        : "-"}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4 border-t">
              <span className="text-xl font-bold">Total</span>
              <span className="text-xl font-bold text-primary">
                £{order.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Table & Status */}
          <div className="space-y-10 pt-2">
            <div className="text-center space-y-6 border-b-4 border-primary pb-8">
              <h3 className="text-2xl font-bold uppercase tracking-widest text-primary">
                Table Number {order.tableNumber > 0 ? order.tableNumber : "N/A"}
              </h3>
              <p>Status: {order.status}</p>
              <p>
                Created at:{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "N/A"}
              </p>
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

export default CustomerDashboard;