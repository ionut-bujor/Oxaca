
import React from 'react';

const Hero: React.FC = () => {
  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-pattern pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-full max-w-md">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <img 
                alt="Authentic Mexican Tacos" 
                className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border border-white" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAQUIuIxL3csvypxCAMcs45wYOI-TGxCaU9dii-74zOwI_8Z-fnBj9nIU63uvewhNpWNh6N5Dby2K4MiFbKldLePlEcR9vaxlZDvclhhCxtvdtLn7JB3MXxNeSzS2IY0UOtDNR-ugjJE5rFsLvLpmFGDTdY3jr96WD7arnnJwUeEdVC6GTzA2AleQcD0q0hibYlxYeG0mqrBNBkk0A-1d1766xgO0jI3m6OiqA0oUNZeag17Sv0ddap0mP7ew1ITiSZ1ZLmAjCgUU"
              />
              <img 
                alt="Fresh Mole Poblano" 
                className="rounded-xl shadow-2xl mt-8 transform hover:scale-105 transition-transform duration-500 border border-white" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVB68KPsGThyPgDqx_RL3fB_DdsguxqxkPp1RDziTBqCNxjanQGg_h6CMylG9Y_ZYAZF5NOr2ChNVtgIsX9kPhJZrG9KvrVdCpmtooWNsy4T9F8goxaMH7sNJn0OoX0xHIlF8i2cSeyBI2hc7QwFTkVuxfvn1YS6G1nO-8h_iKP0cze9WM_ElKaiyBxes9huAHL1dOKMl8vEuc0xTFqibqO2h4koCV-ppGIXESGfWD5kzzXNfmD1S-aJaTqxhrKU0Fp6XOn225cVc"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
              <p className="serif-text text-primary text-lg font-bold">World-Class</p>
              <p className="text-xs tracking-widest uppercase text-slate-400">Mexican Heritage</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-8">
          <div className="max-w-xl">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Authentic Experience</span>
            <h2 className="serif-text text-5xl lg:text-7xl mt-4 leading-tight">Heritage in <br/><span className="italic text-primary">Every Bite</span></h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Discover the soul of Mexico through recipes passed down through generations. From the vibrant markets of Oaxaca to your table, experience a journey rooted in history.
            </p>
            <div className="mt-8">
              <button 
                onClick={scrollToMenu}
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                Explore Our Menu
              </button>
            </div>
          </div>
          <div className="pt-8 flex items-center space-x-8 opacity-40">
            <div className="w-24 h-24 border-2 border-primary/30 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-primary">restaurant</span>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-primary/50 to-transparent"></div>
            <div className="w-16 h-16 border border-primary/30 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-primary">local_bar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
