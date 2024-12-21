import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menuSlice'
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
  },
});
export default store;