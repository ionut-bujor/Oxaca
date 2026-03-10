import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { CustomerOrderDTO } from '../types';
import { ItemDTOHelper } from '../types';
import CustomerDashboardHeader from "../components/CustomerDashboardHeader";

const CustomerDashboard: React.FC = () => {
  const [orders, setOrders] = useState<CustomerOrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payingTable, setPayingTable] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/dashboard", {
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch dashboard: ${res.status}`);
        return res.json();
      })
      .then((data: CustomerOrderDTO[]) => {
        setOrders(data);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Could not load dashboard. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePayOrder = async (tableOrders: CustomerOrderDTO[], tableNumber: string) => {
  setPayingTable(Number(tableNumber));
  try {
    // Use the first unpaid order's ID to create a checkout session
    const unpaidOrder = tableOrders.find(order => !order.paid);
    if (!unpaidOrder) return;

    const res = await fetch("http://localhost:8080/api/stripe/create-checkout-session", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: unpaidOrder.id }),
    });

    if (!res.ok) throw new Error("Failed to create checkout session");

    const { url } = await res.json();
    window.location.href = url; // Redirect to Stripe checkout
  } catch (err) {
    console.error("Payment error:", err);
    setError("Payment failed. Please try again.");
  } finally {
    setPayingTable(null);
  }
};

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const groupedOrders = orders.reduce((groups, order) => {
    const table = order.tableNumber;
    if (!groups[table]) groups[table] = [];
    groups[table].push(order);
    return groups;
  }, {} as Record<number, CustomerOrderDTO[]>);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerDashboardHeader />

      <main className="flex-grow pt-28 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <h2 className="text-4xl font-bold text-slate-800">My Orders</h2>

          {Object.keys(groupedOrders).length === 0 ? (
            <p className="text-slate-500">You have no active orders.</p>
          ) : (
            Object.entries(groupedOrders).map(([tableNumber, tableOrders]) => {
              const allItems = tableOrders.flatMap(order => order.items);
              const totalPrice = tableOrders.reduce((sum, order) => sum + order.totalPrice, 0);
              const latestStatus = tableOrders[tableOrders.length - 1].status;
              const latestCreatedAt = tableOrders[tableOrders.length - 1].createdAt;
              const allPaid = tableOrders.every(order => order.paid);
              const somePaid = tableOrders.some(order => order.paid);
              const isPayingNow = payingTable === Number(tableNumber);

              const paymentStatusLabel = allPaid
                ? "Paid"
                : somePaid
                ? "Partially Paid"
                : "Requires Payment";

              const paymentStatusColor = allPaid
                ? "text-green-600 bg-green-50 border-green-200"
                : somePaid
                ? "text-yellow-600 bg-yellow-50 border-yellow-200"
                : "text-red-600 bg-red-50 border-red-200";

              return (
                <div key={tableNumber} className="grid md:grid-cols-2 gap-12 items-start border rounded-2xl p-6 shadow-sm">

                  {/* list of order items */}
                  <div className="space-y-4">
                    {allItems.map((item: ItemDTOHelper, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl shadow-sm border border-slate-100"
                      >
                        <div>
                          <p className="font-semibold text-lg text-slate-800">{item.menuItemName}</p>
                          <p className="text-sm text-slate-500">Quantity: {item.menuItemQuantity}</p>
                        </div>
                        <div className="text-right">
                          {item.price ? `£${(item.menuItemQuantity * item.price).toFixed(2)}` : "-"}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between pt-4 border-t">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-xl font-bold text-primary">
                        £{totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* table and status info */}
                  <div className="space-y-6 pt-2">
                    <div className="text-center space-y-4 border-b-4 border-primary pb-8">
                      <h3 className="text-2xl font-bold uppercase tracking-widest text-primary">
                        Table Number {tableNumber}
                      </h3>
                      <p className="text-slate-600">Status: <span className="font-semibold">{latestStatus}</span></p>
                      <p className="text-slate-600">
                        Created at:{" "}
                        {latestCreatedAt ? new Date(latestCreatedAt).toLocaleString() : "N/A"}
                      </p>

                      {/* payment status */}
                      <div className={`inline-block px-4 py-1.5 rounded-full border text-sm font-semibold ${paymentStatusColor}`}>
                        Payment: {paymentStatusLabel}
                      </div>
                    </div>

                    <button className="w-full bg-primary hover:bg-darkGreen text-white py-4 rounded-2xl text-lg font-semibold tracking-wide transition shadow-xl active:scale-95">
                      Call A Waiter
                    </button>

                    {/* pay button — hidden if already fully paid */}
                    {!allPaid && (
                      <button
                        onClick={() => handlePayOrder(tableOrders, tableNumber)}
                        disabled={isPayingNow}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white py-4 rounded-2xl text-lg font-semibold tracking-wide transition shadow-xl active:scale-95"
                      >
                        {isPayingNow ? "Processing..." : `Pay £${totalPrice.toFixed(2)}`}
                      </button>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerDashboard;