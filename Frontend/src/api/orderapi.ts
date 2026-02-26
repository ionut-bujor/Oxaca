export type CreateOrderRequest = {
  id: number;          // user/customer id (backend expects request.getId())
  tableNumber: number;
};

export type AddItemRequest = {
  id: number;          // menu item id
  quantity: number;
};

const BASE_URL = "http://localhost:8080"; // change if needed
const API_PREFIX = "/v1";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${API_PREFIX}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include", // important if backend uses session/cookies
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }

  return (await res.json()) as T;
}

// We keep response type as "any" for now because backend CustomerOrderDTO is unstable in MR
export async function createOrder(req: CreateOrderRequest): Promise<any> {
  return http<any>("/orders", { method: "POST", body: JSON.stringify(req) });
}

export async function addItemToOrder(orderId: number, item: AddItemRequest): Promise<any> {
  return http<any>(`/orders/${orderId}/items`, {
    method: "POST",
    body: JSON.stringify(item),
  });
}