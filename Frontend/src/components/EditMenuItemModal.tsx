import React, { useState, useEffect } from 'react';
import { menuService, type MenuItemPayload } from '../services/menuService';

const ITEM_GROUPS = [
  'Oaxacan Specialties',
  'Seafood Starters',
  'Classic Mains',
  'Beverages',
];
const DIETARY_TAG_OPTIONS = ['VEGAN', 'GLUTEN_FREE', 'SPICY', 'VEGETARIAN'];
const ALLERGEN_OPTIONS = ['DAIRY', 'NUTS', 'GLUTEN', 'SHELLFISH', 'SOY', 'EGG', 'SESAME', 'FISH'];

interface EditMenuItemModalProps {
  /** Backend id (numeric) of the item being edited. */
  itemId: number;
  /** Pre-fill data in the backend DTO shape. */
  initial: MenuItemPayload;
  onClose: () => void;
  onSaved: () => void;
}

const EditMenuItemModal: React.FC<EditMenuItemModalProps> = ({
  itemId,
  initial,
  onClose,
  onSaved,
}) => {
  const [form, setForm] = useState<MenuItemPayload>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Sync if initial changes (e.g. different item selected)
  useEffect(() => setForm(initial), [initial]);

  const toggleArrayField = (field: 'dietary_flags' | 'allergen_list', value: string) => {
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

    if (!form.title.trim() || !form.desc.trim() || !form.img.trim()) {
      setError('Title, description and image URL are required.');
      return;
    }

    setSubmitting(true);
    try {
      await menuService.updateMenuItem(itemId, form);
      onSaved();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update item.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="serif-text text-2xl font-bold text-slate-800">Edit Menu Item</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {error && <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Item name"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="w-full p-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />

          <textarea
            placeholder="Description"
            value={form.desc}
            onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
            className="w-full p-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            rows={3}
            required
          />

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

          <input
            type="url"
            placeholder="Image URL"
            value={form.img}
            onChange={e => setForm(f => ({ ...f, img: e.target.value }))}
            className="w-full p-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            required
          />

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

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-slate-200 rounded-xl font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50"
            >
              {submitting ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuItemModal;
