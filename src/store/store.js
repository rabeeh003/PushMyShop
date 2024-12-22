import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menuSlice'
import cartReducer from './cartSlice';
import appReducer from './appSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    app: appReducer,
  },
});
export default store;