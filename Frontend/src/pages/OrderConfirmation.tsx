import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = (location.state as any)?.order;

  if (!order) {
    return (
      <div style={{ padding: 24 }}>
        <p>No order found.</p>
        <button onClick={() => navigate("/")}>Back to menu</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Order confirmed 🎉</h1>
      <p>Order ID: {order.id}</p>
      <p>Table: {order.tableNumber}</p>
      <p>Status: {order.status ?? "N/A"}</p>
      <button onClick={() => navigate("/")}>Back to menu</button>
    </div>
  );
};

export default OrderConfirmation;