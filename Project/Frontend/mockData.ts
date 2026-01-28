
import { MenuItem, Category } from './types';

/**
 * Seed data following the strict PRD schema.
 */
export const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Oaxacan Black Mole',
    price: 24.00,
    description: 'Authentic black mole with 32 ingredients, served with chicken breast and handmade tortillas.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7J15XCZfi0FBwpfXmEmtumAkVxVIJheynRAlmFEyRPWMc8eKH8xAXfL5L-vscbF5iwonbjv4hPTu3BzffptERUaQWZiI8wUW2zwxgylCcNMzB7YpgtlQgxicLxTh706NmSc2811RVmsRcLLzA4ng8hSPDLkSOqwJWtsphfvS_SgbqcTYPTb7vBnE8FD-mm4HgXt3WdnU1zNZ2WfXARa_uUpkorCewwaVlHBM8D-5QhCfiysIwCzz_fNjSGqxyJfQ-b9yrqp49urg',
    category: Category.STARTERS,
    tags: ['Gluten-Free'],
    calories: 450,
    allergens: ['Nuts', 'Sesame']
  },
  {
    id: '2',
    name: 'Tlayuda Tradicional',
    price: 18.50,
    description: 'Crispy giant tortilla spread with asiento, beans, tasajo, and Oaxacan cheese.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYXHRUFS9YMrXIEMCeYbPi_WrtuBlKFfiEqzkZk9UmGgCd19s_m2UFHD93B8Hlou3gievTzaVLkBp15u2aSh9i54Qfnk-6_EShjyrKfpCmChH98atGuXP2uKcTvx8zTE8emui3SjVqQrmGonKmQ0PfeHwSo02tv4byf005tsPF9N1ux1tNyBQ7jQIKtG6oZOACiDor5Sfju6LYXY5RSFBAfJ4h-J7Kdxse6mxx1qnLNz2iVCsuNy3E0OjyvCgTInWIJfEtXGIVfw8',
    category: Category.STARTERS,
    tags: ['Vegetarian'],
    calories: 620,
    allergens: ['Dairy', 'Gluten']
  },
  {
    id: '3',
    name: 'Pacific Coast Ceviche',
    price: 16.00,
    description: 'Fresh daily catch marinated in lime, serrano peppers, cilantro, and red onions.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8lQnm7LHMRuPksoLmTV318TScvV3er7Ms3NAn6moWNdqPeVVsXuk3hGsi4iEbH1LuXvMTdIvg92Wh0aarrkxPhVCAx1H39VYZac1jKXHSV9XKt1i4Z9VgwpkOUd2iN5KrpEjjybCh-s6H2VOGZgaeABKeGQ-it6xnfDu6gY_9MPh6XyVocTnLC756KStl-EKb2OmcaKneJaGwbLxAwgxTYeev1gUtJogWKgfwuaD14t073KKnxl6nNQtkch_TEhBH7YhcRWdiQfk',
    category: Category.STARTERS,
    tags: ['Gluten-Free', 'Spicy'],
    calories: 210,
    allergens: ['Shellfish']
  },
  {
    id: '4',
    name: 'Red Snapper Veracruz',
    price: 32.00,
    description: 'Pan-seared snapper with tomatoes, olives, capers, and aromatic herbs.',
    image: 'https://picsum.photos/seed/snapper/600/400',
    category: Category.MAINS,
    tags: ['Gluten-Free'],
    calories: 380,
    allergens: ['Fish']
  },
  {
    id: '5',
    name: 'Mezcal Margarita',
    price: 14.00,
    description: 'Espadín mezcal, fresh lime, agave nectar, and a sal de gusano rim.',
    image: 'https://picsum.photos/seed/mezcal/600/400',
    category: Category.DRINKS,
    tags: [],
    calories: 165
  }
];
