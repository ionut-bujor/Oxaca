
import React, { useState } from 'react';
import { type MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  const [imgError, setImgError] = useState(false);
  
  const displayImage = imgError || !item.image 
    ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop' 
    : item.image;

  return (
    <div className="group flex flex-col sm:flex-row bg-white p-5 rounded-2xl border border-slate-100 hover:border-primary/40 transition-all shadow-sm hover:shadow-2xl">
      <div className="w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50">
        <img 
          alt={item.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
          src={displayImage}
          onError={() => setImgError(true)}
        />
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-8 flex-grow flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="serif-text text-2xl font-bold group-hover:text-primary transition-colors">{item.name}</h4>
            <div className="text-right">
              <div className="text-slate-900 group-hover:text-accent transition-colors font-bold text-xl">
                £{item.price.toFixed(2)}
              </div>
              {item.calories && (
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                  {item.calories} kcal
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed line-clamp-2">{item.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {item.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] uppercase font-bold tracking-wider rounded border border-primary/10">
                {tag}
              </span>
            ))}
          </div>

          {item.allergens && item.allergens.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5 text-accent/80">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              <span className="text-[10px] font-bold uppercase tracking-tight">
                Allergens: {item.allergens.join(', ')}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end mt-4 sm:mt-0">
          <button 
            onClick={() => onAddToCart(item)}
            aria-label={`Add ${item.name} to cart`}
            className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-all active:scale-95 shadow-lg shadow-primary/25"
          >
            <span className="material-symbols-outlined text-2xl">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
