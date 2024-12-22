import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Array to store cart items
  totalItems: 0, // Total number of items in the cart
  totalPrice: 0, // Total price of items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      updateTotals(state);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      updateTotals(state);
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.quantity += 1;
      }
      updateTotals(state);
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
      }
      updateTotals(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      updateTotals(state);
    },
  },
});

// Helper function to update totals
const updateTotals = (state) => {
  state.totalItems = state.cartItems.reduce((count, item) => count + item.quantity, 0);
  state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price.offer * item.quantity, 0);
};

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalItems = (state) => state.cart.totalItems;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
