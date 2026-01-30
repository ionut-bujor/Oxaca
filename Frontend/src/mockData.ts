
import {Category } from './types';
import type { MenuItem} from './types';


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
    image: 'https://static.wixstatic.com/media/5a9b3b_ec99f3c71ecc4e1496b1288dd9ded9f1~mv2.jpg/v1/fill/w_3492,h_2328,al_c,q_90/5a9b3b_ec99f3c71ecc4e1496b1288dd9ded9f1~mv2.webp',
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
    image: 'https://mission-food.com/wp-content/uploads/2022/06/Pescado-a-la-Veracruzana-Veracruz-Style-Fish-13.jpg',
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
    image: 'https://thesageapron.com/wp-content/uploads/2022/05/Spicy-Marg-6.jpg',
    category: Category.DRINKS,
    tags: [],
    calories: 165
  }
];
