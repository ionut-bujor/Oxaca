
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Category, type MenuItem } from '../types';
import { menuService } from '../services/menuService';

export const useMenu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await menuService.fetchMenuItems();
      setItems(data);
    } catch {
      setError("We're having trouble reaching our kitchen. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const init = async () => {
      await load();
      if (!active) return;
    };
    init();
    return () => { active = false; };
  }, [load]);

  const categories = useMemo(() => {
    return ['All', ...Object.values(Category)];
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const catMatch = selectedCategory === 'All' || item.category === selectedCategory;
      const tagMatch = activeFilters.length === 0 || activeFilters.every(f => item.tags.includes(f as any));
      return catMatch && tagMatch;
    });
  }, [items, selectedCategory, activeFilters]);

  const toggleFilter = (f: string) => {
    setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  return {
    items,
    filteredItems,
    categories,
    selectedCategory,
    setSelectedCategory,
    activeFilters,
    toggleFilter,
    isLoading,
    error,
    /** Re-fetch the menu from backend. Call after add / edit / delete. */
    refetch: load,
  };
};
