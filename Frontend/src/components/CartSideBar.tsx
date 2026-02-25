
import React from 'react';
import { type CartItem } from '../types';
import { useNavigate } from "react-router-dom";


interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const navigate = useNavigate();  // 👈 ADD THIS LINE
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="serif-text text-2xl font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">shopping_basket</span>
            Your Basket
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-6xl mb-4">local_dining</span>
              <p className="text-sm uppercase tracking-widest">Your basket is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                    <span className="font-bold text-primary">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-1 hover:bg-slate-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">remove</span>
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-700">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-1 hover:bg-slate-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">add</span>
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-xs font-bold text-accent uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <span className="uppercase text-xs font-bold tracking-[0.2em] text-slate-500">Order Total</span>
              <span className="serif-text text-3xl font-bold text-slate-900">£{total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
              onClose();          // close sidebar
              navigate("/checkout"); // go to checkout page
  }}
  className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl shadow-primary/20 active:scale-95"
>
  Proceed to Checkout
</button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
