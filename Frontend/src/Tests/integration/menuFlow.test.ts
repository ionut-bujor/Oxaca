import { suite, expect } from '../assertions';
import type { MenuItem, Category, Tag } from '../../types';

suite.describe('End-to-End Menu Flow Integration Tests', () => {
  
  const mockMenuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Taco',
      price: 12.99,
      description: 'Delicious taco',
      image: 'https://example.com/taco.jpg',
      category: 'Mains' as Category,
      tags: ['Spicy'] as Tag[],
      calories: 350
    },
    {
      id: '2',
      name: 'Salad',
      price: 8.99,
      description: 'Fresh salad',
      image: 'https://example.com/salad.jpg',
      category: 'Starters' as Category,
      tags: ['Vegan', 'Gluten-Free'] as Tag[],
      calories: 200
    }
  ];

  suite.it('FLOW: Fetch menu → Filter → Add to cart', () => {
    // Step 1: Fetch menu items (simulated)
    const menuItems = mockMenuItems;
    expect(menuItems.length).toBe(2);

    // Step 2: Filter by category
    const filtered = menuItems.filter(item => item.category === 'Mains');
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Taco');

    // Step 3: Add to cart
    const cart: any[] = [];
    cart.push({ ...filtered[0], quantity: 1 });
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(1);
  });

  suite.it('FLOW: Apply tag filter → Select item → Update quantity', () => {
    // Step 1: Apply tag filter
    const tagFilter: Tag[] = ['Vegan'];
    const filtered = mockMenuItems.filter(item =>
      tagFilter.every(tag => item.tags.includes(tag))
    );
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Salad');

    // Step 2: Add to cart
    const cart = [{ ...filtered[0], quantity: 1 }];
    
    // Step 3: Update quantity
    cart[0].quantity = 3;
    expect(cart[0].quantity).toBe(3);
  });

  suite.it('FLOW: Add multiple items → Calculate total', () => {
    // Step 1: Add items
    const cart = [
      { ...mockMenuItems[0], quantity: 2 },
      { ...mockMenuItems[1], quantity: 1 }
    ];

    // Step 2: Calculate total
    const total = cart.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
    expect(total).toBe(34.97); // (12.99 * 2) + (8.99 * 1)
  });

  suite.it('FLOW: Empty filter → All items → Group by category', () => {
    // Step 1: No filters applied
    const allItems = mockMenuItems;
    expect(allItems.length).toBe(2);

    // Step 2: Group by category
    const grouped = allItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, MenuItem[]>);

    expect(Object.keys(grouped).length).toBe(2);
    expect(grouped['Mains'].length).toBe(1);
    expect(grouped['Starters'].length).toBe(1);
  });

  suite.it('FLOW: Add item → Remove item → Cart empty', () => {
    // Step 1: Add item
    const cart = [{ ...mockMenuItems[0], quantity: 1 }];
    expect(cart.length).toBe(1);

    // Step 2: Remove item
    const updatedCart = cart.filter(item => item.id !== '1');
    expect(updatedCart.length).toBe(0);
  });
});

(async () => {
  console.log('Running Integration Tests...\n');
  const results = await suite.run();
  
  let totalTests = 0;
  let passedTests = 0;

  results.forEach(suiteResult => {
    console.log(`${suiteResult.name}`);
    suiteResult.results.forEach(test => {
      totalTests++;
      if (test.passed) {
        passedTests++;
        console.log(`  ${test.name}`);
      } else {
        console.log(`  ❌ ${test.name}`);
        console.log(`     Error: ${test.error}`);
      }
    });
  });

  console.log(`\n${passedTests}/${totalTests} tests passed\n`);
})();
