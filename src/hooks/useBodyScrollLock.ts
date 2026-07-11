import { useEffect } from 'react';

// Locks background scroll while a modal is mounted and restores the exact
// scroll position on unmount. Plain `overflow: hidden` on <body> isn't enough
// on mobile Safari/Chrome — it still allows momentum scroll and loses the
// offset, so the page is pinned via `position: fixed` instead.
export function useBodyScrollLock() {
  useEffect(() => {
    const scrollY = window.scrollY;
    const { body } = document;
    const previousStyle = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = previousStyle.position;
      body.style.top = previousStyle.top;
      body.style.width = previousStyle.width;
      body.style.overflow = previousStyle.overflow;
      window.scrollTo(0, scrollY);
    };
  }, []);
}
