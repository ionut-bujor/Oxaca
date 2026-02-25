import React, { useEffect, useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const CustomerDashboardHeader: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); //holds logged user object or null (if not logged in)

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
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-background-light/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* left section of the header */}
        <div className="min-w-max hidden lg:block">
          <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-tighter whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>
              {/* if user is logged in + found, show welcome message, otherwise show general message */}
              {user ? `Welcome,\xa0 ${user.firstName}` : 'Welcome'}
            </span>
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
        </div>

      </div>
    </header>
  );
};

export default CustomerDashboardHeader;