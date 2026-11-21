import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { setup } from '@app/init';
import { Web } from '@app/web';

const el = document.getElementById('web');
const { hydrateIcons } = setup();

hydrateIcons();

if (el) {
  hydrateRoot(el, <Web />);
}
