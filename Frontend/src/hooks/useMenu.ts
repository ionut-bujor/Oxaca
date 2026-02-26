
import { useState, useEffect, useMemo } from 'react';
import { Category, type MenuItem } from '../types';
import { menuService } from '../services/menuService';

export const useMenu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await menuService.fetchMenuItems();
        if (active) {
          setItems(data);
        }
      } catch (err) {
        if (active) {
          setError("We're having trouble reaching our kitchen. Please try again later.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };
    load();
    return () => { active = false; };
  }, []);

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
    error
  };
};
