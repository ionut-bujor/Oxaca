
import React from 'react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  const { user, isCustomer, isWaiter, isKitchen, isAdmin, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/portal';
  };

  //myorders button - will take the user to the customer dashboard
  const MyOrdersButton = (
    <button
      onClick={() => window.location.href = '/dashboard'}
      className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-accent transition-all shadow-md shadow-primary/20 active:scale-95"
    >
      <span className="material-symbols-outlined text-xl">
        receipt_long
      </span>
      <span className="text-sm font-bold uppercase tracking-wider">
        My Orders
      </span>
    </button>
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-background-light/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* left section of the header */}
        <div className="w-40 hidden lg:block flex-shrink-0">
          <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-tighter">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>
              {/* if user is logged in + found, show welcome message, otherwise show general message */}
              {isAuthenticated && user ? `Welcome,\xa0 ${user.firstName}` : 'Experience Oaxaca'} 
            </span>
          </div>
        </div>
        {/* role display */}
        {isCustomer() && (
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                  Customer
                </span>
              )}
        {isWaiter() && (
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                  Waiter
                </span>
              )}
        {isKitchen() && (
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                  Kitchen
                </span>
              )}
        {isAdmin() && (
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                  Admin
                </span>
              )}
        {/* centre logo of the header */}
        <div
          className="flex-1 text-center cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <h1 className="serif-text text-4xl font-black tracking-widest uppercase text-primary">
            Oaxaca
          </h1>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Auth controls */}
          {isAuthenticated ? (
            <>
              {MyOrdersButton}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-all active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/portal"
              className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-all"
            >
              Sign In
            </a>
          )}

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
