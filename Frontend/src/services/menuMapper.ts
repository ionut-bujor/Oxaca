
import  { Category } from '../types';
import type { MenuItem, Allergen, Tag } from '../types';

/**
 * Updated to match the SQL Schema:
 * item_name, item_description, item_price, item_picture_url, etc.
 */
export interface BackendMenuItem {
  id: string | number;
  item_name: string;
  item_price: number;
  item_description: string;
  item_picture_url: string;
  menu_type_name?: string; // Derived from the JOIN with menu_type
  item_group_name?: string; // Derived from the JOIN with item_group
  calories?: number;
  tags?: string[];
  allergens?: string[];
}

/**
 * MENU DOMAIN MAPPER
 */
export const mapMenuItemDtoToDomain = (dto: BackendMenuItem): MenuItem => {
  return {
    id: String(dto.id),
    name: dto.item_name || 'Unknown Dish',
    price: Number(dto.item_price) || 0,
    description: dto.item_description || '',
    image: dto.item_picture_url || '',
    category: mapCategory(dto.menu_type_name),
    group: dto.item_group_name, // Mapping item_group_name to group
    tags: (dto.tags || []) as Tag[],
    calories: dto.calories,
    allergens: mapAllergens(dto.allergens)
  };
};

const mapAllergens = (list?: string[]): Allergen[] => {
  if (!list) return [];
  const allergenMap: Record<string, Allergen> = {
    'dairy': 'Dairy', 'nuts': 'Nuts', 'gluten': 'Gluten', 
    'shellfish': 'Shellfish', 'soy': 'Soy', 'egg': 'Egg', 
    'sesame': 'Sesame', 'fish': 'Fish'
  };
  return list
    .map(a => a.trim().toLowerCase())
    .filter(a => allergenMap[a])
    .map(a => allergenMap[a]);
};

const mapCategory = (catName?: string): Category => {
  if (!catName) return Category.MAINS;
  const mapping: Record<string, Category> = {
    'starters': Category.STARTERS,
    'mains': Category.MAINS,
    'sides': Category.SIDES,
    'drinks': Category.DRINKS,
    'desserts': Category.DESSERTS
  };
  return mapping[catName.trim().toLowerCase()] || Category.MAINS;
};
