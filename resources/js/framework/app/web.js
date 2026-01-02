import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// store
import { store, persistor } from '@app/store';
// core modules
import DataProvider from '@providers/DataProvider';
// layout
import Website from '@website';

/** React router to setup UI routes */
const Web = () => {
  // const RouterComponent = router || Router;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DataProvider>
          <Website />
        </DataProvider>
      </PersistGate>
    </Provider>
  );
};

export default Web;
