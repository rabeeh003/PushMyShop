import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default localStorage

import menuReducer from './menuSlice';
import cartReducer from './cartSlice';
import appReducer from './appSlice';

// Set up the persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'app'], // Specify which reducers to persist
  debug: true,
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  app: appReducer,
  menu: menuReducer,
});

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
