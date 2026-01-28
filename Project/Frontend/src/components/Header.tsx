
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background-light/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="w-40 hidden lg:block">
          <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-tighter">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>Experience Oaxaca</span>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <h1 className="serif-text text-4xl font-black tracking-widest uppercase text-primary">Oaxaca</h1>
        </div>
        <div className="flex items-center">
          <button 
            onClick={onCartClick}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-accent transition-all shadow-md shadow-primary/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">shopping_basket</span>
            <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">Order Basket</span>
            {cartCount > 0 && (
              <span className="ml-2 w-5 h-5 bg-white text-primary rounded-full flex items-center justify-center text-[10px] font-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
