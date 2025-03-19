import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemsExistIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemsExistIndex >= 0) {
        state.items.splice(itemsExistIndex, 1);
      } else {
        state.items.push(action.payload);
        
      }
    },
  },
});
export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
