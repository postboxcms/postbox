import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// store
import { store } from '@app/store';
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
    <BrowserRouter>
      <Provider store={store}>
        <DataProvider>
          <WebsiteSSR />
        </DataProvider>
      </Provider>
    </BrowserRouter>
  );
};
