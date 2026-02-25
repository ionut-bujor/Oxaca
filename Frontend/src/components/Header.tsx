
import React from 'react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

// defines what fields a user object has (on the frontend)
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  const [user, setUser] = useState<User | null>(null); //holds logged user object or null (if not logged in)
  const [loading, setLoading] = useState(true); //tracks progress of fetch request (used in error handling + response)
  
  //backend communication
  useEffect(() => {
    //gets currently logged in user and saves information if found - otherwise user is null
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/v1/auth/getCurrentUser', {
          method: 'GET',
          credentials: 'include', //needed to pass session to backend
        });

        if (!response.ok) throw new Error();

        const data = await response.json();

        if (data && data.email) {
          setUser(data); //if users session is found - store user
        } else {
          setUser(null); //if not - store null
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  //logs out a user by sending request to endpoint
  const handleLogout = async () => {
    try {
      await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed');
    }
  };
  
  //separated header buttons into their own consts

  //basket button - same code as before just contained here
  const OrderBasketButton = (
    <button 
      onClick={onCartClick}
      className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-accent transition-all shadow-md shadow-primary/20 active:scale-95"
    >
      <span className="material-symbols-outlined text-xl">shopping_basket</span>
      <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">
        Order Basket
      </span>

      {cartCount > 0 && (
        <span className="ml-2 w-5 h-5 bg-white text-primary rounded-full flex items-center justify-center text-[10px] font-black">
          {cartCount}
        </span>
      )}
    </button>
  );

  //login/logout button
  const AuthButtonClass =
    "flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-white hover:bg-red-600 transition-all shadow-md shadow-primary/20 active:scale-95";

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
        <div className="w-40 hidden lg:block">
          <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-tighter">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>
              {/* if user is logged in + found, show welcome message, otherwise show general message */}
              {user ? `Welcome,\xa0 ${user.firstName}` : 'Experience Oaxaca'} 
            </span>
          </div>
        </div>

        {/* centre logo of the header */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <h1 className="serif-text text-4xl font-black tracking-widest uppercase text-primary">
            Oaxaca
          </h1>
        </div>

        {/* right section of the header */}
        <div className="flex items-center space-x-6">
          {!loading && (
            user ? (
              // if user is logged in display:
              <>
                {MyOrdersButton}
                {OrderBasketButton}

                <button
                  onClick={handleLogout}
                  className={AuthButtonClass}
                  title="Logout"
                >
                  <span className="material-symbols-outlined text-xl">
                    logout
                  </span>
                </button>
              </>
            ) : (
              // else if user is not logged in display:
              <>
                {OrderBasketButton}

                <button
                  onClick={() => window.location.href = '/portal  '}
                  className={AuthButtonClass}
                  title="Login"
                >
                  <span className="material-symbols-outlined text-xl">
                    person
                  </span>
                </button>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
