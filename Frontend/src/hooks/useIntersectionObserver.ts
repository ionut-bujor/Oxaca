
import { useState, useEffect, useRef } from 'react';

/**
 * Custom Hook: useIntersectionObserver
 * Handles the logic for revealing elements when they scroll into view.
 */
export const useIntersectionObserver = (options: IntersectionObserverInit = { threshold: 0.1 }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(element);
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { elementRef, isIntersecting };
};
