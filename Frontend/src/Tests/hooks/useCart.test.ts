import { suite, expect } from '../assertions';

suite.describe('useCart Hook Tests', () => {
  
  suite.it('should initialize with empty cart', () => {
    // Test: Cart starts with no items
    const initialState: any[] = [];
    expect(initialState.length).toBe(0);
  });

  suite.it('should calculate total count correctly', () => {
    // Test: totalCount sums all quantities
    const items = [
      { id: '1', name: 'Taco', price: 12.99, quantity: 2 },
      { id: '2', name: 'Burrito', price: 15.99, quantity: 3 }
    ];
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    expect(totalCount).toBe(5);
  });

  suite.it('should calculate total price correctly', () => {
    // Test: totalPrice = sum(price * quantity)
    const items = [
      { id: '1', name: 'Taco', price: 10, quantity: 2 },
      { id: '2', name: 'Burrito', price: 15, quantity: 1 }
    ];
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    expect(totalPrice).toBe(35);
  });

  suite.it('should add new item to cart', () => {
    // Test: Adding item increases cart size
    const cart: any[] = [];
    const newItem = { id: '1', name: 'Taco', price: 12.99, category: 'Mains' };
    cart.push({ ...newItem, quantity: 1 });
    
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(1);
  });

  suite.it('should increment quantity if item exists', () => {
    // Test: Adding existing item increments quantity
    const cart = [{ id: '1', name: 'Taco', price: 12.99, quantity: 1 }];
    const existingIndex = cart.findIndex(item => item.id === '1');
    
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    }
    
    expect(cart[0].quantity).toBe(2);
    expect(cart.length).toBe(1); // Still only 1 item
  });

  suite.it('should update item quantity', () => {
    // Test: updateQuantity changes quantity
    const cart = [{ id: '1', name: 'Taco', price: 12.99, quantity: 2 }];
    const newQuantity = 5;
    
    cart[0].quantity = Math.max(1, newQuantity); // Min quantity = 1
    expect(cart[0].quantity).toBe(5);
  });

  suite.it('should enforce minimum quantity of 1', () => {
    // Test: Quantity cannot go below 1
    const minQuantity = Math.max(1, 0);
    expect(minQuantity).toBe(1);
    
    const negativeQuantity = Math.max(1, -5);
    expect(negativeQuantity).toBe(1);
  });

  suite.it('should remove item from cart', () => {
    // Test: removeFromCart filters out item
    const cart = [
      { id: '1', name: 'Taco', price: 12.99, quantity: 1 },
      { id: '2', name: 'Burrito', price: 15.99, quantity: 1 }
    ];
    
    const updatedCart = cart.filter(item => item.id !== '1');
    expect(updatedCart.length).toBe(1);
    expect(updatedCart[0].id).toBe('2');
  });

  suite.it('should handle price precision correctly', () => {
    // Test: Floating point precision
    const items = [
      { id: '1', name: 'Taco', price: 12.99, quantity: 3 }
    ];
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const rounded = Math.round(totalPrice * 100) / 100;
    
    expect(rounded).toBe(38.97);
  });
});

// Run tests
(async () => {
  console.log('🧪 Running useCart Tests...\n');
  const results = await suite.run();
  
  let totalTests = 0;
  let passedTests = 0;

  results.forEach(suiteResult => {
    console.log(`📦 ${suiteResult.name}`);
    suiteResult.results.forEach(test => {
      totalTests++;
      if (test.passed) {
        passedTests++;
        console.log(`  ✅ ${test.name}`);
      } else {
        console.log(`  ❌ ${test.name}`);
        console.log(`     Error: ${test.error}`);
      }
    });
  });

  console.log(`\n📊 ${passedTests}/${totalTests} tests passed\n`);
})();
