import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
 // Including your styles
import { Toaster } from './components/ui/sonner.jsx'; // Including Toaster
import { Provider } from 'react-redux'; // Redux Provider
import store from './redux/store.js'; // Redux store
import { PersistGate } from 'redux-persist/integration/react'; // PersistGate for redux-persist
import { persistStore } from 'redux-persist'; // For persisting the store

// Persistor configuration
let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Redux Provider wrapping the whole app */}
    <Provider store={store}>
      {/* PersistGate ensures that the persisted state is rehydrated */}
      <PersistGate loading={null} persistor={persistor}>
        <App /> {/* Your App component */}
        <Toaster /> {/* Notification Toaster component */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
