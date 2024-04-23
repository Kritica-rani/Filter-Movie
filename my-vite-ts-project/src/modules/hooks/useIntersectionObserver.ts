import { useRef, useEffect, MutableRefObject } from 'react';

type IntersectionObserverOptions = IntersectionObserverInit & {
  freezeOnceVisible?: boolean;
};

const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverOptions = {}
): MutableRefObject<null> => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, { ...options });
    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [callback, options]);

  return targetRef;
};

export default useIntersectionObserver;
