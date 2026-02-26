import { createOrder, addItemToOrder } from "../api/orderapi";
import { CartItem } from "../types";

export async function placeOrder(params: {
  userId: number;
  tableNumber: number;
  cart: CartItem[];
}) {
  const { userId, tableNumber, cart } = params;

  if (!Number.isInteger(tableNumber) || tableNumber <= 0) {
    throw new Error("Table number must be a positive integer.");
  }
  if (!cart.length) {
    throw new Error("Your basket is empty.");
  }

  // Step 1: create order
  const created = await createOrder({ id: userId, tableNumber });

  const orderId = created?.id;
  if (!orderId) {
    throw new Error("Backend did not return an order id.");
  }

  // Step 2: add items (one request per item)
  // Backend expects MenuItemDTO-ish body containing id + quantity
  let updated = created;
  for (const item of cart) {
    const menuItemId = Number(item.id);
    if (!Number.isFinite(menuItemId)) {
      throw new Error(`Cart item id is not numeric: ${item.id}`);
    }
    updated = await addItemToOrder(orderId, { id: menuItemId, quantity: item.quantity });
  }

  return updated;
}