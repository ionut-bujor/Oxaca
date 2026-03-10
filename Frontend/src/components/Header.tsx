
import React from 'react';
import { useAuth } from '../context/AuthContext';
import RoleBadge from './RoleBadge';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  const { user, isCustomer, isWaiter, isKitchen, isManager, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/portal';
  };

  {/* My Orders button - shows "Order Board" for waiters, "My Orders" for others */}
  const MyOrdersButton = (
    <button
      title={isWaiter() ? 'Order Board' : 'My Orders'}
      onClick={() => window.location.href = '/dashboard'}
      className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-accent transition-all shadow-md shadow-primary/20 active:scale-95 mr-2"
    >
      <span className="text-sm font-bold uppercase tracking-wider">{isWaiter() ? 'Order Board' : 'My Orders'}</span>
      <span className="material-symbols-outlined text-xl">receipt_long</span>
    </button>
  );

  {/* Order Basket button - will open the "Your Basket" sidebar */}
  const OrderBasketButton = (
    <button 
      title="My Basket"
      onClick={onCartClick}
      className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-accent transition-all shadow-md shadow-primary/20 active:scale-95 mr-2">
        <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">My Basket</span>
        <span className="material-symbols-outlined text-xl">shopping_basket</span>
        {cartCount > 0 && (
          <span className="ml-2 w-5 h-5 bg-white text-primary rounded-full flex items-center justify-center text-[10px] font-black">
            {cartCount}
          </span>
        )}
    </button>
  );

  {/* Sign In button - will redirect the user to the /portal page */}
  const SignInButton = (
    <a
      href="/portal"
      title="Sign In"
      className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-accent transition-all shadow-md shadow-primary/20 active:scale-95 mr-2"
    >
      <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">Sign In</span>
      <span className="material-symbols-outlined text-xl">person</span>
    </a>
  );

  {/* Logout button - will run the logout() method and invalidate the users session */}
  const LogoutButton = (
    <button
        title="Logout"
        onClick={handleLogout}
        className="flex items-center px-5 py-2.5 rounded-full bg-primary text-white hover:bg-accent transition-all shadow-md shadow-primary/20 active:scale-95 mr-2"
    >
        <span className="material-symbols-outlined text-xl">logout</span>
    </button>
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-background-light/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* left section of the header */}
        <div className="flex-1 flex items-center gap-2">
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
              {/* if user is logged in + found, show welcome message, otherwise show general message */}
              {isAuthenticated && user ? `Welcome,\xa0 ${user.firstName}` : 'Experience Oaxaca'} 
            </span>
            {/* Role Badge icon */}
            <RoleBadge />
        </div>

        {/* centre logo of the header */}
        <div
          className="flex-shrink-0 text-center cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <h1 className="serif-text text-4xl font-black tracking-widest uppercase text-primary">
            Oaxaca
          </h1>
        </div>
        <div className="flex-1 flex items-center justify-end gap-3">
          {/* Auth controls - show different buttons depending on whether user is logged in or not */}
          {isAuthenticated ? (
            <>
              {MyOrdersButton}
              {OrderBasketButton}
              {LogoutButton}
            </>
          ) : (
            <>
            {OrderBasketButton}
            {SignInButton}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
