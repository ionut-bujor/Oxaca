import { CustomerOrderDTO } from '../types';

export const MOCK_ORDERS: CustomerOrderDTO[] = [
  {
    id: 1,
    tableNumber: 5,
    status: "PLACED",
    createdAt: new Date().toISOString(),
    totalPrice: 42.50,
    items: [
      { menuItemName: "Mole Poblano", menuItemQuantity: 2 },
      { menuItemName: "Guacamole & Chips", menuItemQuantity: 1 },
      { menuItemName: "Horchata", menuItemQuantity: 2 },
    ],
  },
  {
    id: 2,
    tableNumber: 3,
    status: "PREPARING",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    totalPrice: 27.00,
    items: [
      { menuItemName: "Tacos al Pastor", menuItemQuantity: 3 },
      { menuItemName: "Agua Fresca", menuItemQuantity: 1 },
    ],
  },
  {
    id: 3,
    tableNumber: 8,
    status: "READY",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    totalPrice: 18.75,
    items: [
      { menuItemName: "Ceviche Tostada", menuItemQuantity: 2 },
    ],
  },
];
