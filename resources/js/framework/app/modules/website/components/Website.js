import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

// Dynamic import for theme - memoized to prevent re-imports
const createThemeComponent = (() => {
  const cache = {};
  return (theme) => {
    if (!cache[theme]) {
      cache[theme] = lazy(() =>
        import(`@themes/${theme}/index.js`)
      );
    }
    return cache[theme];
  };
})();

export const Website = () => {
  const theme = useSelector((state) => state.site.theme);
  const ThemeComponent = createThemeComponent(theme);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeComponent />
    </Suspense>
  );
};

export default Website;