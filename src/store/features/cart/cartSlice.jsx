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
export const clearCartItem = createAsyncThunk(
  "cart/clearItem",
  async (userId, thunkApi) => {
    if (!userId) return thunkApi.rejectWithValue("user not value");
    try {
      const userRef = doc(db, "cart", userId);
      await setDoc(userRef, { list: [] }, { merge: true });
      return "cart cleared successfully";
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);
export const decrementItemFromFirebase = createAsyncThunk(
  "cart/decreament",
  async ({ userId, itemId }, thunkApi) => {
    if (!userId) return thunkApi.rejectWithValue("userId not found");
    try {
      const userRef = doc(db, "cart", userId);
      const cartSnap = await getDoc(userRef);
      if (cartSnap.exists()) {
        let cart = cartSnap.data().list || [];
        const itemIndex = cart.findIndex((i) => i.id === itemId);
        if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
          const unitPrice = cart[itemIndex].price / cart[itemIndex].quantity;
          cart[itemIndex].quantity = cart[itemIndex].quantity - 1;
          cart[itemIndex].price = unitPrice * cart[itemIndex].quantity;
        }
        await setDoc(userRef, { list: cart }, { merge: true });
        return cart;
      }
      return thunkApi.rejectWithValue("cart is not found");
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const incrementItemFromFirebase = createAsyncThunk(
  "cart/increment",
  async ({ userId, itemId }, thunkApi) => {
    if (!userId) return thunkApi.rejectWithValue("user not found");
    try {
      const userRef = doc(db, "cart", userId);
      const cartSnap = await getDoc(userRef);
      if (cartSnap.exists()) {
        let cart = cartSnap.data().list || [];
        const itemIndex = cart.findIndex((i) => i.id === itemId);
        if (itemIndex !== -1) {
          const unitPrice = cart[itemIndex].price / cart[itemIndex].quantity;
          cart[itemIndex].quantity = cart[itemIndex].quantity + 1;
          cart[itemIndex].price = (
            unitPrice * cart[itemIndex].quantity
          ).toFixed(2);
        }
        await setDoc(userRef, { list: cart }, { merge: true });
        return cart;
      }
      return thunkApi.rejectWithValue("cart can not found ");
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
      })
      .addCase(clearCartItem.fulfilled, (state) => {
        state.cartItems = [];
        state.loading = false;
      })
      .addCase(clearCartItem.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(clearCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(incrementItemFromFirebase.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(decrementItemFromFirebase.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
});
export const {
  addToCart,
  removeItem,

  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
