import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default localStorage
import menuReducer from './menuSlice';
import cartReducer from './cartSlice';
import appReducer from './appSlice';

// Set up the persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'app'], // specify which reducers to persist
};

// Wrap reducers with persistReducer
const rootReducer = {
  cart: persistReducer(persistConfig, cartReducer),
  app: persistReducer(persistConfig, appReducer),
  menu: menuReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
