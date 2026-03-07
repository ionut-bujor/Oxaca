import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RoleBadge from './RoleBadge';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const CustomerDashboardHeader: React.FC = () => {
  const { user, isCustomer, isWaiter, isKitchen, isAdmin, logout, isAuthenticated } = useAuth();
  
    const handleLogout = async () => {
      await logout();
      window.location.href = '/portal';
    };

  {/* Back To Menu button - redirects the user back to the menu page */}
  const BackToMenuButton = (
    <button
            onClick={() => window.location.href = '/'}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-accent transition-all shadow-md shadow-primary/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">
              arrow_back
            </span>
            <span className="text-sm font-bold uppercase tracking-wider">
              Back to Menu
            </span>
          </button>
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-background-light/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* left section of the header */}
        <div className="w-40 hidden lg:block flex-shrink-0 whitespace-nowrap">
          <div className="flex items-center space-x-2 text-primary font-bold text-s uppercase tracking-tighter">
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
              {/* if user is logged in + found, show welcome message, otherwise show general message */}
              {isAuthenticated && user ? `Welcome,\xa0 ${user.firstName}` : 'Experience Oaxaca'} 
            </span>
            {/* Role Badge icon */}
            <RoleBadge />
          </div>
        </div>

        {/* centre logo of the header */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center cursor-pointer">
          <h1 className="serif-text text-4xl font-black tracking-widest uppercase text-primary">
            <a href="/">Oaxaca</a>
          </h1>
        </div>

        {/* right section of the header */}
        <div className="flex items-center space-x-6">
          {BackToMenuButton}
        </div>

      </div>
    </header>
  );
};

export default CustomerDashboardHeader;