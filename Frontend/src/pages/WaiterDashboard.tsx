import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import CustomerDashboardHeader from "../components/CustomerDashboardHeader";
import Footer from "../components/Footer";
import TableNumberForm from "../components/TableNumberForm";
import { useAuth } from "../context/AuthContext";
import { fetchOrdersByTable } from "../services/orderservice";
import { CustomerOrderDTO, ItemDTOHelper } from "../types";

const WaiterDashboard: React.FC = () => {
  const { isWaiter } = useAuth();
  const [tableNumber, setTableNumber] = useState("");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [orders, setOrders] = useState<CustomerOrderDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isWaiter()) {
    return <Navigate to="/dashboard" replace />;
  }

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
                    <p className="text-slate-700">
                      <span className="font-semibold">Status:</span> {order.status}
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
