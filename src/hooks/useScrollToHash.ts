import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Smooth-scrolls to the in-page anchor on mount/hash change, respecting
// prefers-reduced-motion (ARCHITECTURE.md §4/§17).
export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [hash]);
}
