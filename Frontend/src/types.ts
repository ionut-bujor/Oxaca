
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

/** Alert placed by waiter when a client needs help */
export interface Alert {
  id: number;
  tableNumber: number;
  message: string | null;
  status: 'ACTIVE' | 'RESOLVED';
  createdAt: string;
}
