import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Skip scroll on hash links (e.g., #section)
    if (window.location.hash) {
      return;
    }

    // Instantly scroll to top first to prevent seeing old content
    window.scrollTo(0, 0);

    // Then apply smooth scroll for visual effect
    const smoothScrollToTop = () => {
      // Check if smooth scroll is supported
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    };

    // Use a small timeout to ensure the page has changed
    const timeoutId = setTimeout(() => {
      smoothScrollToTop();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, search]); // Now also triggers on query parameter changes

  return null;
};

export default ScrollToTop; 