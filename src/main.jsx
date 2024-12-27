import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';

const spinner = (
  <div className="min-h-screen min-w-full bg-white flex justify-center items-center">
    <div className="spinner-dot-circle">
      <div className="spinner-dot spinner-warning"></div>
      <div className="spinner-dot spinner-warning"></div>
      <div className="spinner-dot spinner-warning"></div>
      <div className="spinner-dot spinner-warning"></div>
      <div className="spinner-dot spinner-warning"></div>
      <div className="spinner-dot spinner-warning"></div>
      <div className="spinner-dot spinner-warning"></div>
      <div className="spinner-dot spinner-warning"></div>
    </div>
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={spinner} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);