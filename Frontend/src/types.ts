
export const Category = {
  STARTERS: 'Starters',
  MAINS: 'Mains',
  SIDES: 'Sides',
  DRINKS: 'Drinks',
  DESSERTS: 'Desserts'
} as const;

export type Category = (typeof Category)[keyof typeof Category];

export type Tag = 'Vegan' | 'Gluten-Free' | 'Spicy' | 'Vegetarian';

/**
 * Standardized "Big 8" Allergen Set
 */
export type Allergen = 
  | 'Dairy' 
  | 'Nuts' 
  | 'Gluten' 
  | 'Shellfish' 
  | 'Soy' 
  | 'Egg' 
  | 'Sesame' 
  | 'Fish';

/**
 * Domain Model
 * Includes 'group' to support SQL item_group_id hierarchy
 */
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  group?: string; // e.g., "Tacos", "Burritos"
  tags: Tag[];
  calories?: number;
  allergens?: Allergen[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}


export interface ItemDTOHelper {
  menuItemName: string;
  menuItemQuantity: number;
  // Add price if backend provides it
  price?: number; // optional if not yet included
}

export interface CustomerOrderDTO {
  id: number;
  tableNumber: number;
  status: string;       // OrderStatus as string
  createdAt: string;    // ISO date string
  items: ItemDTOHelper[];
  totalPrice: number;   // BigDecimal mapped to number
  paid: boolean;
}

// ── Authentication Types ──────────────────────────────────────────────
export type Role = 'CUSTOMER' | 'WAITER' | 'KITCHEN' | 'MANAGER';

export interface User {
  id: number;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;

}
