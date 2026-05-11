import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// store
import { store, persistor } from '@app/store';
// core modules
import DataProvider from '@providers/DataProvider';
// layout - use SSR version by default for hydration compatibility
import { WebsiteSSR } from '@website/components';

/** Server-side rendering version without PersistGate and lazy loading */
export const WebSSR = () => {
  return (
    <Provider store={store}>
      <DataProvider>
        <WebsiteSSR />
      </DataProvider>
    </Provider>
  );
};
/** React router to setup UI routes */
export const Web = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DataProvider>
          <WebsiteSSR />
        </DataProvider>
      </PersistGate>
    </Provider>
  );
};
