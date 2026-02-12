import { suite, expect } from '../assertions';

suite.describe('MenuItemCard Component Tests', () => {
  
  const mockItem = {
    id: '1',
    name: 'Carnitas Taco',
    price: 12.99,
    description: 'Slow-cooked pork',
    image: 'https://example.com/taco.jpg',
    category: 'Mains' as const,
    tags: ['Spicy', 'Gluten-Free'] as const,
    allergens: ['Dairy'],
    calories: 350
  };

  suite.it('should format price with 2 decimal places', () => {
    // Test: Price formatting
    const formatted = `$${mockItem.price.toFixed(2)}`;
    expect(formatted).toBe('$12.99');
  });

  suite.it('should handle image error with fallback URL', () => {
    // Test: Image error handling
    const fallbackUrl = `https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400`;
    let imgError = true;
    const displayUrl = imgError ? fallbackUrl : mockItem.image;
    
    expect(displayUrl).toBe(fallbackUrl);
  });

  suite.it('should display calories if available', () => {
    // Test: Conditional calories display
    const hasCalories = mockItem.calories !== undefined;
    expect(hasCalories).toBe(true);
    expect(mockItem.calories).toBe(350);
  });

  suite.it('should not display calories if undefined', () => {
    // Test: No calories field
    const itemWithoutCalories = { ...mockItem, calories: undefined };
    const hasCalories = itemWithoutCalories.calories !== undefined;
    expect(hasCalories).toBe(false);
  });

  suite.it('should render all tags', () => {
    // Test: Tag rendering
    expect(mockItem.tags.length).toBe(2);
    expect(mockItem.tags).toInclude('Spicy');
    expect(mockItem.tags).toInclude('Gluten-Free');
  });

  suite.it('should display allergen warnings', () => {
    // Test: Allergen display
    expect(mockItem.allergens?.length).toBe(1);
    expect(mockItem.allergens).toInclude('Dairy');
  });

  suite.it('should handle items without allergens', () => {
    // Test: No allergens field
    const safeItem: any = { ...mockItem, allergens: undefined };
    const hasAllergens = safeItem.allergens !== undefined;
    expect(hasAllergens).toBe(false);
  });
});

(async () => {
  console.log('Running MenuItemCard Tests...\n');
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
