import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { setup } from '@app/init';
import { startPersistence } from '@app/store';
import { Web } from '@app/web';
import Engine from '@app/engine';

const appRoot = document.getElementById('app');
const webRoot = document.getElementById('web');
const { hydrateIcons } = setup();

hydrateIcons();

if (appRoot) {
  startPersistence();
  const app = createRoot(appRoot);
  app.render(<Engine />);
}

if (webRoot) {
  const web = createRoot(webRoot);
  web.render(<Web />);
}
