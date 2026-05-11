// resources/js/entry-server.jsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { setup } from '@app/init';
import { store } from '@app/store';
import { WebSSR } from '@app/web';

export function render(url = '/') {
  const { theme } = setup();
  const html = renderToString(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StaticRouter location={url}>
          <WebSSR />
        </StaticRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
  return { html };
}
