import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface IntersectionObserverHookReturn {
  isIntersecting: boolean;
  ref: React.RefObject<HTMLElement>;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): IntersectionObserverHookReturn => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { isIntersecting, ref };
};

// Multi-element intersection observer
export const useMultiIntersectionObserver = (
  elementIds: string[],
  options: UseIntersectionObserverOptions = {}
) => {
  const [visibleElements, setVisibleElements] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const { threshold = 0.1, rootMargin = '0px' } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          setVisibleElements(prev => ({
            ...prev,
            [id]: entry.isIntersecting
          }));
        });
      },
      { threshold, rootMargin }
    );

    Object.values(refs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const setRef = (id: string) => (element: HTMLElement | null) => {
    refs.current[id] = element;
  };

  return { visibleElements, setRef };
}; 