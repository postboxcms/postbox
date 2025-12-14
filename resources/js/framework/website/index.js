import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

export const Website = () => {
  const theme = useSelector((state) => state.site.theme);
  const [isSiteReady, setIsSiteReady] = React.useState(false);
  const ThemeComponent = lazy(() =>
    import(`@themes/${theme}/index.js`)
  );

  React.useEffect(() => {
    setIsSiteReady(true); // to hydrate the theme variable
  },[]);
  
  return (
    <Box>
      <Suspense fallback={null}>
        {isSiteReady && <ThemeComponent />}
      </Suspense>
    </Box>
  );
};

export default Website;
