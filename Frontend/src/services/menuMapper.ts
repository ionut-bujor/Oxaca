
import  { Category } from '../types';
import type { MenuItem, Allergen, Tag } from '../types';

/**
 * Updated to match the actual backend MenuItemDTO:
 * title, price_usd, desc, img, cat, dietary_flags, allergen_list, kcal
 */
export interface BackendMenuItem {
  id: number;
  title: string;
  price_usd: number;
  desc: string;
  img: string;
  cat: string;
  kcal?: number;
  dietary_flags?: string[];
  allergen_list?: string[];
}

/**
 * MENU DOMAIN MAPPER
 */
export const mapMenuItemDtoToDomain = (dto: BackendMenuItem): MenuItem => {
  return {
    id: String(dto.id),
    name: dto.title || 'Unknown Dish',
    price: Number(dto.price_usd) || 0,
    description: dto.desc || '',
    image: dto.img || '',
    category: mapCategory(dto.cat),
    group: dto.cat,
    tags: (dto.dietary_flags || []) as Tag[],
    calories: dto.kcal,
    allergens: mapAllergens(dto.allergen_list)
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

const mapCategory = (groupName?: string): Category => {
  if (!groupName) return Category.MAINS;
  const mapping: Record<string, Category> = {
    'oaxacan specialties': Category.STARTERS,
    'seafood starters': Category.STARTERS,
    'classic mains': Category.MAINS,
    'beverages': Category.DRINKS,
  };
  return mapping[groupName.trim().toLowerCase()] || Category.MAINS;
};
