
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-slate-500 py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="serif-text text-4xl font-bold mb-6 tracking-widest uppercase text-primary">Oaxaca</h2>
          <p className="max-w-sm leading-relaxed mb-8 text-slate-600">
            A tribute to the culinary traditions of Mexico. Experience the heritage, taste the culture in every hand-crafted dish.
          </p>
          <div className="flex space-x-4">
            <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center hover:bg-primary transition-all text-slate-400 hover:text-white border border-slate-100"
              onClick={()=>{
                  navigator.clipboard.writeText("https://www.royalholloway.ac.uk/");
                  window.open("https://www.royalholloway.ac.uk/");
                }}>

              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
        <div>
          <h5 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Contact</h5>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-primary text-lg">location_on</span>
              <span>Royal Holloway, Egham Hill, Egham TW20 0EX</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-primary text-lg">mail</span>
              <span>EPMS-school@royalholloway.ac.uk</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-primary text-lg">call</span>
              <span>+44 1784 434455</span>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Hours</h5>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between border-b border-slate-50 pb-2">
              <span>Mon - Thu</span>
              <span className="text-slate-900 font-bold">12pm - 10pm</span>
            </li>
            <li className="flex justify-between border-b border-slate-50 pb-2">
              <span>Fri - Sat</span>
              <span className="text-slate-900 font-bold">12pm - 11pm</span>
            </li>
            <li className="flex justify-between border-b border-slate-50 pb-2">
              <span>Sun</span>
              <span className="text-slate-900 font-bold">10am - 9pm</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 text-[10px] uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© 2024 Oaxaca Mexican Heritage. Refined Gastronomy.</span>
        <div className="space-x-8">
          <a className="hover:text-primary transition-colors" href="portal">Staff Portal</a>
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
