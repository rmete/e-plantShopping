import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Reducer to add an item to the cart
    addItem: (state, action) => {
      const item = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.items.find(i => i.name === item.name);
      if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If it doesn't exist, add it to the cart with a quantity of 1
        state.items.push({ ...item, quantity: 1 });
      }
    },
    // Reducer to remove an item from the cart
    removeItem: (state, action) => {
      const itemName = action.payload;
      // Filter out the item to be removed
      state.items = state.items.filter(item => item.name !== itemName);
    },
    // Reducer to update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(i => i.name === name);
      if (item) {
        item.quantity = quantity;
        // Remove the item if the quantity is zero or less
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
