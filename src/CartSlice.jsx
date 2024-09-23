import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      
      if (existingItem) {
        existingItem.quantity += 1; // Increase the quantity if the item is already in the cart
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1, // Initialize quantity to 1 for new items
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity = amount; // Update the quantity of the item
      }
    },
  },
});

// Export the action creators to use them in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as the default to use in store.js
export default CartSlice.reducer;
