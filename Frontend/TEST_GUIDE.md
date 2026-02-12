# Test Suite Documentation

## 📁 Test Structure

```
src/Tests/
├── assertions.ts                      # Testing framework (existing)
├── menuMapper.tests.ts               # Menu mapper tests (existing)
├── hooks/
│   ├── useCart.test.ts              # Cart hook tests (8 tests)
│   └── useMenu.test.ts              # Menu hook tests (10 tests)
├── services/
│   ├── apiClient.test.ts            # API client tests (5 tests)
│   └── menuService.test.ts          # Menu service tests (6 tests)
├── components/
│   ├── MenuItemCard.test.ts         # Menu item card tests (7 tests)
│   └── CartSidebar.test.ts          # Cart sidebar tests (9 tests)
└── integration/
    └── menuFlow.test.ts             # Integration tests (5 tests)
```

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run Test Categories
```bash
npm run test:hooks        # Run all hook tests
npm run test:services     # Run all service tests
npm run test:components   # Run all component tests
npm run test:integration  # Run integration tests
```

### Run Individual Test Files
```bash
npm run test:cart    # Cart hook tests
npm run test:menu    # Menu hook tests
npm run test:mapper  # Menu mapper tests
npm run test:api     # API client tests
```

### Run Specific Test File Directly
```bash
npx tsx src/Tests/hooks/useCart.test.ts
npx tsx src/Tests/components/MenuItemCard.test.ts
npx tsx src/Tests/integration/menuFlow.test.ts
```

## 📊 Test Coverage

| Category | Files | Tests | Status |
|----------|-------|-------|--------|
| **Hooks** | 2 files | 18 tests | ✅ Complete |
| **Services** | 3 files | 14 tests | ✅ Complete |
| **Components** | 2 files | 16 tests | ✅ Complete |
| **Integration** | 1 file | 5 tests | ✅ Complete |
| **TOTAL** | **8 files** | **53 tests** | ✅ Ready |

## 🎯 What Each Test Suite Covers

### useCart.test.ts (8 tests)
- ✅ Empty cart initialization
- ✅ Total count calculation
- ✅ Total price calculation
- ✅ Adding new items
- ✅ Incrementing existing items
- ✅ Updating quantities
- ✅ Minimum quantity enforcement
- ✅ Removing items
- ✅ Price precision handling

### useMenu.test.ts (10 tests)
- ✅ Category filtering
- ✅ "All" category behavior
- ✅ Single tag filtering
- ✅ Multiple tag filtering (AND logic)
- ✅ Combined category + tag filters
- ✅ Empty results handling
- ✅ Unique category extraction
- ✅ Empty items array
- ✅ Items without tags
- ✅ Original array preservation

### menuService.test.ts (6 tests)
- ✅ DTO to domain transformation
- ✅ Missing optional fields
- ✅ Group hierarchy preservation
- ✅ Fallback to mock data
- ✅ Empty response handling
- ✅ Price validation

### apiClient.test.ts (5 tests)
- ✅ Base URL construction
- ✅ Path concatenation
- ✅ Leading slash handling
- ✅ Mock data fallback
- ✅ JSON parsing errors

### MenuItemCard.test.ts (7 tests)
- ✅ Price formatting
- ✅ Image error fallback
- ✅ Calories display (when available)
- ✅ Calories hiding (when undefined)
- ✅ Tag rendering
- ✅ Allergen warnings
- ✅ Items without allergens

### CartSidebar.test.ts (9 tests)
- ✅ Subtotal calculation
- ✅ Currency formatting
- ✅ Empty state detection
- ✅ Item count display
- ✅ Minimum quantity enforcement
- ✅ Quantity increment
- ✅ Quantity decrement
- ✅ Minimum enforcement on decrement
- ✅ Line item total

### menuFlow.test.ts (5 integration tests)
- ✅ Fetch → Filter → Add to cart flow
- ✅ Tag filter → Select → Update quantity flow
- ✅ Multiple items → Calculate total flow
- ✅ All items → Group by category flow
- ✅ Add → Remove → Empty cart flow

## 🎓 Test Examples

### Example 1: Run Cart Tests
```bash
npm run test:cart
```

**Expected Output:**
```
🧪 Running useCart Tests...

📦 useCart Hook Tests
  ✅ should initialize with empty cart
  ✅ should calculate total count correctly
  ✅ should calculate total price correctly
  ✅ should add new item to cart
  ✅ should increment quantity if item exists
  ✅ should update item quantity
  ✅ should enforce minimum quantity of 1
  ✅ should remove item from cart
  ✅ should handle price precision correctly

📊 9/9 tests passed
```

### Example 2: Run All Tests
```bash
npm test
```

**This will run:**
1. All hook tests (useCart + useMenu)
2. All service tests (apiClient + menuService + menuMapper)
3. All component tests (MenuItemCard + CartSidebar)
4. Integration tests (menuFlow)

## ⚡ Quick Commands

| Command | What It Does |
|---------|-------------|
| `npm test` | Run all 53 tests |
| `npm run test:hooks` | Run 18 hook tests |
| `npm run test:cart` | Run 9 cart tests |
| `npm run test:menu` | Run 10 menu tests |
| `npm run test:integration` | Run 5 integration tests |

## ✅ Success Criteria

All tests should pass with output like:
```
📊 X/X tests passed
```

If you see failures, the output will show:
```
❌ test name
   Error: Expected X, but got Y
```

## 🔍 Debugging Failed Tests

If a test fails:
1. Read the error message carefully
2. Check the expected vs actual values
3. Verify the test logic matches your implementation
4. Run the individual test file for faster debugging

## 📝 Notes

- All tests are **unit tests** - they test logic in isolation
- No actual React components are rendered (would need React Testing Library)
- Tests verify **behavior** not **implementation details**
- Tests do NOT modify existing codebase logic
- Safe to run at any time without side effects
