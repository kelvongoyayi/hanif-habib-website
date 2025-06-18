import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// Debounce hook for search inputs and frequent updates
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for scroll events and frequent operations
export const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};

// Lazy loading hook for images and heavy components
export const useLazyLoad = (
  src: string,
  options: IntersectionObserverInit = {}
) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.onload = () => setLoaded(true);
          img.onerror = () => setError(true);
          img.src = src;
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, options]);

  return { loaded, error, imgRef };
};

// Virtual scrolling hook for large lists
export const useVirtualScroll = <T>(
  items: T[],
  containerHeight: number,
  itemHeight: number,
  overscan: number = 5
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    return {
      startIndex,
      endIndex,
      items: items.slice(startIndex, endIndex + 1),
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight
    };
  }, [items, scrollTop, containerHeight, itemHeight, overscan]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return { visibleItems, handleScroll };
};

// Memoized filter hook for large datasets
export const useFilteredData = <T>(
  data: T[],
  filterFn: (item: T) => boolean,
  sortFn?: (a: T, b: T) => number
) => {
  return useMemo(() => {
    let filtered = data.filter(filterFn);
    if (sortFn) {
      filtered = filtered.sort(sortFn);
    }
    return filtered;
  }, [data, filterFn, sortFn]);
};

// Pagination hook
export const usePagination = <T>(
  data: T[],
  itemsPerPage: number = 10
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    paginatedData,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};

// Memory optimization hook for component cleanup
export const useMemoryOptimization = () => {
  const timeoutsRef = useRef<number[]>([]);
  const intervalsRef = useRef<number[]>([]);
  const observersRef = useRef<IntersectionObserver[]>([]);

  const addTimeout = useCallback((timeout: number) => {
    timeoutsRef.current.push(timeout);
  }, []);

  const addInterval = useCallback((interval: number) => {
    intervalsRef.current.push(interval);
  }, []);

  const addObserver = useCallback((observer: IntersectionObserver) => {
    observersRef.current.push(observer);
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup timeouts
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      // Cleanup intervals
      intervalsRef.current.forEach(clearInterval);
      intervalsRef.current = [];

      // Cleanup observers
      observersRef.current.forEach(observer => observer.disconnect());
      observersRef.current = [];
    };
  }, []);

  return { addTimeout, addInterval, addObserver };
};

// Efficient state updates hook
export const useOptimizedState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const prevStateRef = useRef<T>(initialState);

  const setOptimizedState = useCallback((newState: T | ((prev: T) => T)) => {
    setState(prevState => {
      const nextState = typeof newState === 'function' 
        ? (newState as (prev: T) => T)(prevState)
        : newState;

      // Only update if state actually changed
      if (JSON.stringify(nextState) !== JSON.stringify(prevStateRef.current)) {
        prevStateRef.current = nextState;
        return nextState;
      }

      return prevState;
    });
  }, []);

  return [state, setOptimizedState] as const;
}; 