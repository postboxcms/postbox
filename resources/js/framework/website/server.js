// resources/js/entry-server.jsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { setup } from '@app/init';
import { store } from '@app/store';
import { WebSSR } from '@app/web';

export function render(url = '/') {
  const { hydrateIcons } = setup();

  hydrateIcons();

  const html = renderToString(
    <StaticRouter location={url}>
      <WebSSR />
    </StaticRouter>
  );
  return { html };
}
