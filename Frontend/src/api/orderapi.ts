export type CreateOrderRequest = {
  tableNumber: number;
};

export type AddItemRequest = {
  id: number;          // menu item id
  quantity: number;
};

const BASE_URL = "http://localhost:8080";
const API_PREFIX = "/api/v1";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${API_PREFIX}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }

  return res.json();
}

export async function createOrder(req: CreateOrderRequest): Promise<any> {
  return http<any>("/orders", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export async function addItemToOrder(orderId: number, item: AddItemRequest): Promise<any> {
  return http<any>(`/orders/${orderId}/items`, {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export async function getOrdersByTable(tableNumber: number): Promise<any[]> {
  return http<any[]>(`/waiterDashboard/table/${tableNumber}`, {
    method: "GET",
  });
}
