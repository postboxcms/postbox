import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { setup } from '@app/init';
import { Web } from '@app/web';
import Engine from '@app/engine';

const appRoot = document.getElementById('app');
const webRoot = document.getElementById('web');
const { theme } = setup();

if (appRoot) {
  const app = createRoot(appRoot);
  app.render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Engine />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

if (webRoot) {
  const web = createRoot(webRoot);
  web.render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Web />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
