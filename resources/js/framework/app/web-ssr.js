import React from 'react';
import { Provider } from 'react-redux';

// store
import { store } from '@app/store';
// core modules
import DataProvider from '@providers/DataProvider';
// layout - use SSR version without lazy loading
import WebsiteSSR from '@website/index-ssr';

/** Server-side rendering version without PersistGate and lazy loading */
const WebSSR = () => {
  return (
    <Provider store={store}>
      <DataProvider>
        <WebsiteSSR />
      </DataProvider>
    </Provider>
  );
};

export default WebSSR;
