import React, { useMemo } from 'react';
import { useCartStore } from '../context/CartContext';
import { useMenu } from '../hooks/useMenu';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { type MenuItem } from '../types';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import MenuItemCard from '../components/MenuItemCard';
import CartSidebar from '../components/CartSideBar';

const Menu: React.FC = () => {
  const cartService = useCartStore();
  const menuService = useMenu();
  const revealService = useIntersectionObserver();

  const dietaryFilters = [
    { label: 'Vegan', icon: 'eco' },
    { label: 'Gluten-Free', icon: 'grain' },
    { label: 'Spicy', icon: 'local_fire_department' },
    { label: 'Vegetarian', icon: 'potted_plant' }
  ];

  const groupedItems = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    menuService.filteredItems.forEach(item => {
      const groupName = item.group || 'General';
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(item);
    });
    return groups;
  }, [menuService.filteredItems]);

  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary">
      <Header cartCount={cartService.totalCount} onCartClick={cartService.openCart} />

      <main>
        <Hero />

        <section 
          id="menu-section" 
          ref={revealService.elementRef as React.RefObject<HTMLElement>}
          className={`py-24 bg-background-light min-h-screen relative z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.05)] reveal-hidden ${revealService.isIntersecting ? 'reveal-visible' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">Culinary Selection</span>
              <h2 className="serif-text text-5xl lg:text-6xl text-slate-900 italic font-medium">The Menu</h2>
              <div className="w-16 h-1 bg-primary mx-auto mt-6"></div>
            </div>

            <div className="sticky top-20 z-40 bg-background-light/95 py-6 mb-8 border-b border-slate-100 backdrop-blur-lg">
              <div className="flex flex-wrap gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {menuService.categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => menuService.setSelectedCategory(cat as any)}
                    className={`px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all border whitespace-nowrap ${
                      menuService.selectedCategory === cat 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20 border-primary' 
                        : 'bg-white text-slate-500 border-slate-200 hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {dietaryFilters.map((filter) => (
                  <button 
                    key={filter.label}
                    onClick={() => menuService.toggleFilter(filter.label)}
                    className={`flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-semibold transition-all ${
                      menuService.activeFilters.includes(filter.label)
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-accent hover:text-accent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{filter.icon}</span>
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12 space-y-16">
              {menuService.isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-2xl" />
                  ))}
                </div>
              ) : menuService.error ? (
                <div className="py-24 text-center">
                  <span className="material-symbols-outlined text-6xl text-accent/20">cloud_off</span>
                  <p className="mt-4 text-slate-900 font-bold serif-text text-2xl">Kitchen Connection Lost</p>
                  <button onClick={() => window.location.reload()} className="mt-8 px-6 py-2 bg-primary text-white rounded-lg font-bold uppercase text-xs tracking-widest">
                    Try Reconnecting
                  </button>
                </div>
              ) : Object.keys(groupedItems).length > 0 ? (
                Object.entries(groupedItems).map(([groupName, items]) => (
                  <div key={groupName} className="space-y-8">
                    {groupName !== 'General' && (
                      <div className="flex items-center gap-4">
                        <h3 className="serif-text text-3xl font-bold text-slate-800 italic">{groupName}</h3>
                        <div className="h-px flex-grow bg-gradient-to-r from-slate-200 to-transparent"></div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {items.map(item => (
                        <MenuItemCard 
                          key={item.id} 
                          item={item} 
                          onAddToCart={cartService.addToCart} 
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-24 text-center">
                  <span className="material-symbols-outlined text-6xl text-slate-200">restaurant_menu</span>
                  <p className="mt-4 text-slate-500 font-medium serif-text text-xl italic">No dishes found matching your selection.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartSidebar 
        isOpen={cartService.isCartOpen} 
        onClose={cartService.closeCart} 
        items={cartService.cart}
        onRemove={cartService.removeFromCart}
        onUpdateQuantity={cartService.updateQuantity}
      />
    </div>
  );
};

export default Menu;