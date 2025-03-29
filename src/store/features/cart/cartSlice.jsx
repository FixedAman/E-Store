import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { data } from "react-router-dom";
import { Turtle } from "lucide-react";
const initialState = {
  cartItems: [],
  loading: false,
  error: false,
};
export const loadCartFromFireBase = createAsyncThunk(
  "cart/loadcart",
  async (userId, thunkApi) => {
    if (!userId) return [];
    try {
      const userRef = doc(db, "cart", userId);
      const snapingCart = await getDoc(userRef);
      if (snapingCart.exists()) {
        console.log("this cart data ", snapingCart.data().list);
        return snapingCart.data().list || [];
      }
      return [];
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
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
    decreamentItem: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((i) => i.id === itemId);
      if (item.quantity > 1) {
        item.quantity = item.quantity - 1;
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
    builder
      .addCase(saveCartFromFireBase.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loadCartFromFireBase.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(loadCartFromFireBase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadCartFromFireBase.pending, (state) => {
        state.loading = true;
      });
  },
});
export const { addToCart, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
