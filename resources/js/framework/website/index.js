import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

export const Website = () => {
  const theme = useSelector((state) => state.site.theme);
  const ThemeComponent = lazy(() =>
    import(`@themes/${theme}/index.js`)
  );
  
  return (
    <Box>
      <Suspense fallback={null}>
        <ThemeComponent />
      </Suspense>
    </Box>
  );
};

export default Website;
