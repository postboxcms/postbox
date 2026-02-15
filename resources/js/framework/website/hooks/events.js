import { useEffect } from 'react';

export const useScrollEffect = (callback, dependencies) => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      callback();
    }
  };

  useEffect(() => {
    if (typeof window !== typeof undefined) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, dependencies);
};
