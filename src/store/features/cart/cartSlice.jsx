import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
const initialState = {
  cartItems: [],
  loading: false,
  error: false,
};

export const saveCartFromFireBase = createAsyncThunk(
  "cart/savecart",
  async ({ userId, cart }, thunkApi) => {
    if (!userId) return thunkApi.rejectWithValue("user authenticated");
    try {
      const userRef = doc(db, "cart", userId);
      await setDoc(userRef, { list: cart }, { merge: true });
      return "Cart saved  successfully ";
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveCartFromFireBase.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});
export const { addToCart, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
