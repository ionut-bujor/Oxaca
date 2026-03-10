import { createOrder, addItemToOrder, getOrdersByTable, confirmOrder } from "../api/orderapi";
import { CartItem, CustomerOrderDTO } from "../types";

export async function placeOrder(params: {
  userId: number;
  tableNumber: number;
  cart: CartItem[];
}) {
  const { tableNumber, cart } = params;

  if (!Number.isInteger(tableNumber) || tableNumber <= 0) {
    throw new Error("Table number must be a positive integer.");
  }

  if (!cart.length) {
    throw new Error("Your basket is empty.");
  }

  // Step 1: create order
  const created = await createOrder({ tableNumber });

  const orderId = created?.id;
  if (!orderId) {
    throw new Error("Backend did not return an order id.");
  }

  // Step 2: add items
  let updated = created;

  for (const item of cart) {
    updated = await addItemToOrder(orderId, {
      id: Number(item.id),
      quantity: item.quantity,
    });
  }

  return updated;
}

export async function fetchOrdersByTable(tableNumber: number): Promise<CustomerOrderDTO[]> {
  if (!Number.isInteger(tableNumber) || tableNumber <= 0) {
    throw new Error("Table number must be a positive integer.");
  }

  return getOrdersByTable(tableNumber);
}

export async function confirmTableOrder(orderId: number): Promise<CustomerOrderDTO> {
  return confirmOrder(orderId);
}
