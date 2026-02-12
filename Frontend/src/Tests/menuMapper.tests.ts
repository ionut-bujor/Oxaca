
import { suite, expect } from './assertions';
import { mapMenuItemDtoToDomain, type BackendMenuItem } from '../services/menuMapper';
import { Category } from '../types';

suite.describe('Menu Mapper Robustness', () => {
  suite.it('should handle partial SQL DTOs gracefully', () => {
    const dto: any = { id: 101, item_name: 'Taco' }; // Missing most fields
    const result = mapMenuItemDtoToDomain(dto);
    
    expect(result.id).toBe('101');
    expect(result.name).toBe('Taco');
    expect(result.price).toBe(0);
    expect(result.category).toBe(Category.MAINS); // Default fallback
  });

  suite.it('should map allergens with case insensitivity', () => {
    const dto: BackendMenuItem = {
      id: 1,
      item_name: 'Test',
      item_price: 10,
      item_description: '',
      item_picture_url: '',
      allergens: ['DAIRY', ' nuts ', 'Gluten']
    };
    const result = mapMenuItemDtoToDomain(dto);
    expect(result.allergens?.length).toBe(3);
    expect(result.allergens).toInclude('Dairy');
    expect(result.allergens).toInclude('Nuts');
    expect(result.allergens).toInclude('Gluten');
  });

  suite.it('should preserve hierarchical group mapping', () => {
    const dto: BackendMenuItem = {
      id: 5,
      item_name: 'Al Pastor',
      item_price: 12,
      item_description: '...',
      item_picture_url: '',
      item_group_name: 'Tacos Portfolio'
    };
    const result = mapMenuItemDtoToDomain(dto);
    expect(result.group).toBe('Tacos Portfolio');
  });
});
// ✅ ADD THIS CODE TO ACTUALLY RUN THE TESTS
(async () => {
  console.log('🧪 Running Menu Mapper Tests...\n');
  
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
    console.log('');
  });

  console.log(`📊 Results: ${passedTests}/${totalTests} tests passed\n`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed!');
  } else {
    console.log(`⚠️  ${totalTests - passedTests} test(s) failed`);
  }
})();