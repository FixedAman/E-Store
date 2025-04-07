import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase";


export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ userId, orderData }, thunkApi) => {
    try {
      const orderId = `ORDER${Date.now()}`;
      const newOrder = {
        ...orderData,
        userId,
        orderId,
        createdAt: Timestamp.now(),
      };
      const userRef = doc(db, "order", orderId);
      await setDoc(userRef, newOrder);
      return newOrder;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    success: false,
    error: null,
    latestOrder: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.success = false;
      state.latestOrder = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.latestOrder = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
