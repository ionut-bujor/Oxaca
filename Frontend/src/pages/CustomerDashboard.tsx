import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { CustomerOrderDTO, ItemDTOHelper, MenuItem } from '../types';
import CustomerDashboardHeader from "../components/CustomerDashboardHeader";
import { menuService } from "../services/menuService";

const CustomerDashboard: React.FC = () => {
  const [orders, setOrders] = useState<CustomerOrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payingTable, setPayingTable] = useState<number | null>(null);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [targetOrderId, setTargetOrderId] = useState<number | null>(null);

  const fetchDashboard = () => {
    setLoading(true);
    setError(null);

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
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAddItem = async (orderId: number, menuItemId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/orders/${orderId}/items`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: menuItemId, quantity: 1 }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed to add item: ${res.status}`);
      }

      const updatedOrder: CustomerOrderDTO = await res.json();
      setOrders(prev =>
        prev.map(order => (order.id === updatedOrder.id ? updatedOrder : order)),
      );
    } catch (err) {
      console.error("Add item error:", err);
      setError("Could not add item. The kitchen may already be preparing your order.");
    }
  };

  const handleDecreaseItem = async (orderId: number, menuItemId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/orders/${orderId}/items`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: menuItemId, quantity: -1 }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed to decrease item: ${res.status}`);
      }

      const updatedOrder: CustomerOrderDTO = await res.json();
      setOrders(prev =>
        prev.map(order => (order.id === updatedOrder.id ? updatedOrder : order)),
      );
    } catch (err) {
      console.error("Decrease item error:", err);
      setError("Could not change item. The kitchen may already be preparing your order.");
    }
  };

  const handleRemoveItem = async (orderId: number, menuItemId: number) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/orders/${orderId}/items/${menuItemId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed to remove item: ${res.status}`);
      }

      const updatedOrder: CustomerOrderDTO = await res.json();
      setOrders(prev =>
        prev.map(order => (order.id === updatedOrder.id ? updatedOrder : order)),
      );
    } catch (err) {
      console.error("Remove item error:", err);
      setError("Could not remove item. The kitchen may already be preparing your order.");
    }
  };

  const openAddItemDialog = async (orderId: number) => {
    try {
      setError(null);
      const items = await menuService.fetchMenuItems();
      setMenuItems(items);
      setTargetOrderId(orderId);
      setIsAddItemOpen(true);
    } catch (err) {
      console.error("Failed to load menu items", err);
      setError("Could not load menu to add items.");
    }
  };

  const handleAddNewMenuItemToOrder = async (menuItemId: number) => {
    if (targetOrderId == null) return;
    await handleAddItem(targetOrderId, menuItemId);
    setIsAddItemOpen(false);
    setTargetOrderId(null);
  };

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
              const allItems = tableOrders.flatMap(order =>
                order.items.map(item => ({
                  item,
                  orderId: order.id,
                })),
              );
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
                    {allItems.map(({ item, orderId }: { item: ItemDTOHelper; orderId: number }, index: number) => (
                      <div
                        key={`${orderId}-${item.menuItemId}-${index}`}
                        className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div>
                          <p className="font-semibold text-lg text-slate-800">{item.menuItemName}</p>
                          <p className="text-sm text-slate-500">Quantity: {item.menuItemQuantity}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="transition-opacity duration-300">
                            {item.price ? `£${(item.menuItemQuantity * item.price).toFixed(2)}` : "-"}
                          </div>
                          {latestStatus === "PLACED" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAddItem(orderId, item.menuItemId)}
                                className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition transform active:scale-95"
                              >
                                +1
                              </button>
                              <button
                                onClick={() => handleDecreaseItem(orderId, item.menuItemId)}
                                className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition transform active:scale-95"
                              >
                                -1
                              </button>
                              <button
                                onClick={() => handleRemoveItem(orderId, item.menuItemId)}
                                className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition transform active:scale-95"
                              >
                                Remove
                              </button>
                            </div>
                          )}
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