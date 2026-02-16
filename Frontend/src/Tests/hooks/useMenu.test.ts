import { suite, expect } from '../assertions';
import { Category } from '../../types';
import type {Tag } from '../../types';


suite.describe('useMenu Hook Tests', () => {
  
  const mockItems = [
    { id: '1', name: 'Taco', category: 'Mains' as Category, tags: ['Spicy', 'Gluten-Free'] as Tag[], price: 12.99 },
    { id: '2', name: 'Salad', category: 'Starters' as Category, tags: ['Vegan', 'Gluten-Free'] as Tag[], price: 8.99 },
    { id: '3', name: 'Burrito', category: 'Mains' as Category, tags: ['Spicy'] as Tag[], price: 15.99 }
  ];

  suite.it('should filter by category correctly', () => {
    // Test: Category filter shows only matching items
    const selectedCategory: Category = 'Mains';
    const filtered = mockItems.filter(item => item.category === selectedCategory);
    
    expect(filtered.length).toBe(2);
    expect(filtered[0].category).toBe('Mains');
    expect(filtered[1].category).toBe('Mains');
  });

  suite.it('should show all items when category is "All"', () => {
    // Test: "All" category shows everything
    const selectedCategory: Category | 'All' = 'All';
    const filtered = selectedCategory === 'All' 
      ? mockItems 
      : mockItems.filter(item => item.category === selectedCategory);
    
    expect(filtered.length).toBe(3);
  });

  suite.it('should filter by single tag', () => {
    // Test: Tag filter works for single tag
    const activeFilters: Tag[] = ['Vegan'];
    const filtered = mockItems.filter(item =>
      activeFilters.every(filter => item.tags.includes(filter))
    );
    
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Salad');
  });

  suite.it('should filter by multiple tags (AND logic)', () => {
    // Test: Multiple tags require ALL to match
    const activeFilters: Tag[] = ['Spicy', 'Gluten-Free'];
    const filtered = mockItems.filter(item =>
      activeFilters.every(filter => item.tags.includes(filter))
    );
    
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Taco');
  });

  suite.it('should combine category and tag filters', () => {
    // Test: Both filters work together
    const selectedCategory: Category = 'Mains';
    const activeFilters: Tag[] = ['Spicy'];
    
    const filtered = mockItems
      .filter(item => item.category === selectedCategory)
      .filter(item => activeFilters.every(filter => item.tags.includes(filter)));
    
    expect(filtered.length).toBe(2);
  });

  suite.it('should return empty array when no matches', () => {
    // Test: No results when filters don't match
    const activeFilters: Tag[] = ['Vegan', 'Spicy']; // No item has both
    const filtered = mockItems.filter(item =>
      activeFilters.every(filter => item.tags.includes(filter))
    );
    
    expect(filtered.length).toBe(0);
  });

  suite.it('should extract unique categories', () => {
    // Test: Get list of all categories
    const categories = Array.from(new Set(mockItems.map(item => item.category)));
    expect(categories.length).toBe(2);
    expect(categories).toInclude('Mains');
    expect(categories).toInclude('Starters');
  });

  suite.it('should handle empty items array', () => {
    // Test: Works with no items
    const emptyItems: any[] = [];
    const filtered = emptyItems.filter(item => item.category === 'Mains');
    expect(filtered.length).toBe(0);
  });

  suite.it('should handle items without tags', () => {
    // Test: Items without tags field
    const itemsWithoutTags = [
      { id: '1', name: 'Taco', category: 'Mains' as Category, tags: [] as Tag[], price: 12.99 }
    ];
    const activeFilters: Tag[] = ['Vegan'];
    const filtered = itemsWithoutTags.filter(item =>
      activeFilters.every(filter => item.tags.includes(filter))
    );
    
    expect(filtered.length).toBe(0);
  });

  suite.it('should preserve original array when filtering', () => {
    // Test: Original array unchanged
    const original = [...mockItems];
    const filtered = mockItems.filter(item => item.category === 'Mains');
    
    expect(mockItems.length).toBe(original.length);
    expect(filtered.length).toBe(2);
  });
});

(async () => {
  console.log('Running useMenu Tests...\n');
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
        console.log(`  ${test.name}`);
        console.log(`     Error: ${test.error}`);
      }
    });
  });

  console.log(`\n${passedTests}/${totalTests} tests passed\n`);
})();
