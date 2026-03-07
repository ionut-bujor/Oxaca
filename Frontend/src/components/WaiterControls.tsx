import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { menuService, type MenuItemPayload } from '../services/menuService';

/** Known item-group names from the database seed. Used for the category dropdown. */
const ITEM_GROUPS = [
  'Oaxacan Specialties',
  'Seafood Starters',
  'Classic Mains',
  'Beverages',
];

const DIETARY_TAG_OPTIONS = ['VEGAN', 'GLUTEN_FREE', 'SPICY', 'VEGETARIAN'];
const ALLERGEN_OPTIONS = ['DAIRY', 'NUTS', 'GLUTEN', 'SHELLFISH', 'SOY', 'EGG', 'SESAME', 'FISH'];

interface WaiterControlsProps {
  onItemAdded: () => void;
}

const WaiterControls: React.FC<WaiterControlsProps> = ({ onItemAdded }) => {
  const { isWaiter, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState<MenuItemPayload>({
    title: '',
    price_usd: 0,
    desc: '',
    img: '',
    cat: ITEM_GROUPS[0],
    kcal: 0,
    dietary_flags: [],
    allergen_list: [],
  });

  // Don't hide during loading
  if (!user) {
    return null;
  }

  if (!isWaiter()) {
    return null;
  }

  const resetForm = () => {
    setForm({
      title: '',
      price_usd: 0,
      desc: '',
      img: '',
      cat: ITEM_GROUPS[0],
      kcal: 0,
      dietary_flags: [],
      allergen_list: [],
    });
    setError('');
    setSuccess('');
  };

  const toggleArrayField = (
    field: 'dietary_flags' | 'allergen_list',
    value: string,
  ) => {
    setForm(prev => {
      const arr = prev[field] ?? [];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.title.trim() || !form.desc.trim() || !form.img.trim()) {
      setError('Title, description and image URL are required.');
      return;
    }

    setSubmitting(true);
    try {
      await menuService.addMenuItem(form);
      setSuccess(`"${form.title}" added successfully!`);
      resetForm();
      onItemAdded();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add menu item.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => { setIsOpen(o => !o); setError(''); setSuccess(''); }}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-accent transition-all shadow-lg shadow-primary/20 active:scale-95"
      >
        <span className="material-symbols-outlined text-xl">{isOpen ? 'close' : 'add_circle'}</span>
        {isOpen ? 'Cancel' : 'Add Menu Item'}
      </button>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-xl space-y-5 max-w-2xl"
        >
          <h3 className="serif-text text-2xl font-bold text-slate-800">New Menu Item</h3>

          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
          {success && <p className="text-green-600 text-sm font-semibold">{success}</p>}

          {/* Title */}
          <input
            type="text"
            placeholder="Item name"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="w-full p-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={form.desc}
            onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
            className="w-full p-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            rows={3}
            required
          />

          {/* Price + Calories */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1 block">Price (£)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price_usd || ''}
                onChange={e => setForm(f => ({ ...f, price_usd: parseFloat(e.target.value) || 0 }))}
                className="w-full p-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1 block">Calories</label>
              <input
                type="number"
                min="0"
                value={form.kcal || ''}
                onChange={e => setForm(f => ({ ...f, kcal: parseInt(e.target.value) || 0 }))}
                className="w-full p-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <input
            type="url"
            placeholder="Image URL"
            value={form.img}
            onChange={e => setForm(f => ({ ...f, img: e.target.value }))}
            className="w-full p-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />

          {/* Category */}
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1 block">Category</label>
            <select
              value={form.cat}
              onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}
              className="w-full p-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white"
            >
              {ITEM_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {/* Dietary Tags */}
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2 block">Dietary Tags</label>
            <div className="flex flex-wrap gap-2">
              {DIETARY_TAG_OPTIONS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleArrayField('dietary_flags', tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                    form.dietary_flags?.includes(tag)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-primary/40'
                  }`}
                >
                  {tag.replace('_', '-')}
                </button>
              ))}
            </div>
          </div>

          {/* Allergens */}
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2 block">Allergens</label>
            <div className="flex flex-wrap gap-2">
              {ALLERGEN_OPTIONS.map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleArrayField('allergen_list', a)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                    form.allergen_list?.includes(a)
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-accent/40'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Adding…' : 'Add Item'}
          </button>
        </form>
      )}
    </div>
  );
};

export default WaiterControls;
