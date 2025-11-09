import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Web from '@app/web';

const el = document.getElementById('web');

if (el.hasChildNodes()) {
    hydrateRoot(el, <Web />);
} else {
    createRoot(el).render(<Web />);
}