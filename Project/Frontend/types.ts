
export enum Category {
  STARTERS = 'Starters',
  MAINS = 'Mains',
  SIDES = 'Sides',
  DRINKS = 'Drinks',
  DESSERTS = 'Desserts'
}

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
 * Domain Model as defined in PRD Section 2.1
 */
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  tags: Tag[];
  calories?: number;
  allergens?: Allergen[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}
