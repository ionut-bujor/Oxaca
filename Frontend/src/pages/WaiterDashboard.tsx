import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import CustomerDashboardHeader from "../components/CustomerDashboardHeader";
import Footer from "../components/Footer";
import TableNumberForm from "../components/TableNumberForm";
import { useAuth } from "../context/AuthContext";
import { fetchOrdersByTable, confirmTableOrder } from "../services/orderservice";
import { CustomerOrderDTO, ItemDTOHelper } from "../types";

const WaiterDashboard: React.FC = () => {
  const { isWaiter } = useAuth();
  const [tableNumber, setTableNumber] = useState("");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [orders, setOrders] = useState<CustomerOrderDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmingOrderId, setConfirmingOrderId] = useState<number | null>(null);

  if (!isWaiter()) {
    return <Navigate to="/dashboard" replace />;
  }

  const getElapsedTime = (createdAt: string): string => {
    const diffMs = Date.now() - new Date(createdAt).getTime();
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PLACED: "bg-yellow-100 text-yellow-800 border-yellow-200",
      PREPARING: "bg-blue-100 text-blue-800 border-blue-200",
      READY: "bg-green-100 text-green-800 border-green-200",
      DELIVERED: "bg-slate-100 text-slate-600 border-slate-200",
    };
    return (
      <span className={`inline-block px-2 py-0.5 rounded-full border text-xs font-semibold ${
        styles[status] ?? "bg-slate-100 text-slate-600 border-slate-200"
      }`}>
        {status}
      </span>
    );
  };

  const handleConfirmOrder = async (orderId: number) => {
    setConfirmingOrderId(orderId);
    setError(null);
    try {
      const updated = await confirmTableOrder(orderId);
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    } catch {
      setError("Could not confirm order. Please try again.");
    } finally {
      setConfirmingOrderId(null);
    }
  };

  const handleFetchByTable = async () => {
    const tn = Number(tableNumber);
    if (!Number.isInteger(tn) || tn <= 0) {
      return;
    }

    // Reset previous result before fetching a new table.
    setOrders([]);
    setSelectedTable(null);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchOrdersByTable(tn);
      setOrders(data);
      setSelectedTable(tn);
    } catch {
      setOrders([]);
      setSelectedTable(tn);
      // Fallback while endpoint is pending: show empty table state instead of error.
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerDashboardHeader />

      <main className="flex-grow pt-28 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <h1 className="text-4xl font-bold text-slate-800">Order Board</h1>

          <TableNumberForm
            value={tableNumber}
            onChange={setTableNumber}
            onSubmit={handleFetchByTable}
            loading={loading}
            errorMessage={error}
            submitLabel="Show Table Orders"
          />

          {selectedTable !== null && !loading && orders.length === 0 && (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-slate-600 font-medium">
              No active orders found for table {selectedTable}.
            </div>
          )}

          {orders.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Orders for Table {selectedTable}
              </h2>

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid md:grid-cols-2 gap-8 items-start border rounded-2xl p-6 shadow-sm"
                >
                  <div className="space-y-4">
                    {order.items.map((item: ItemDTOHelper, index: number) => (
                      <div
                        key={`${order.id}-${index}`}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow-sm border border-slate-100"
                      >
                        <div>
                          <p className="font-semibold text-lg text-slate-800">
                            {item.menuItemName}
                          </p>
                          <p className="text-sm text-slate-500">
                            Quantity: {item.menuItemQuantity}
                          </p>
                        </div>
                        <div className="text-right text-slate-700">
                          {item.price
                            ? `GBP ${(item.menuItemQuantity * item.price).toFixed(2)}`
                            : "-"}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-2">
                    <p className="text-slate-700">
                      <span className="font-semibold">Order ID:</span> {order.id}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700">Status:</span>
                      {statusBadge(order.status)}
                    </div>
                    <p className="text-slate-700">
                      <span className="font-semibold">Time in Progress:</span>{" "}
                      {order.createdAt ? getElapsedTime(order.createdAt) : "N/A"}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold">Created:</span>{" "}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold">Paid:</span>{" "}
                      {order.paid ? "Yes" : "No"}
                    </p>
                    <p className="text-xl font-bold text-primary">
                      Total: GBP {order.totalPrice.toFixed(2)}
                    </p>
                    {order.status === "PLACED" && (
                      <button
                        onClick={() => handleConfirmOrder(order.id)}
                        disabled={confirmingOrderId === order.id}
                        className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {confirmingOrderId === order.id ? "Confirming…" : "Confirm Order"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WaiterDashboard;
