import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Array to store cart items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const item = action.payload;
        // Check if the item is already in the cart
        const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          // If the item exists, increment its quantity
          existingItem.quantity += 1;
        } else {
          // If the item doesn't exist, add it with a quantity of 1
          state.cartItems.push({ ...item, quantity: 1 });
        }
      },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId); // Remove item from the cart
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.quantity += 1; // Increase item quantity by 1
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Decrease item quantity by 1
      }
    },
    clearCart: (state) => {
      state.cartItems = []; // Clear all items from the cart
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
