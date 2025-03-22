import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const initialState = {
  items: [],
  loading: false,
  error: false,
};
export const loadWishlistFromFireBase = createAsyncThunk(
  "wishlist/loadWishList",
  async (userId, thunkApi) => {
    if (!userId) return [];
    try {
      const userRef = doc(
        db,
        "wishlist",
        userId
      ); /* i pass on the user reference */
      const snapingWishlist = await getDoc(userRef);
      if (snapingWishlist.exists()) {
        console.log("loading data ", snapingWishlist.data().items);

        return snapingWishlist.data().items || [];
      }
      return [];
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const saveWishlistFromFireBase = createAsyncThunk(
  "wishlist/savewishlist",
  async ({ userId, wishlist }, thunkApi) => {
    if (!userId) return;
    try {
      const formattedWishlist = wishlist.map((entry) => ({
        id: entry.id || "",
        title: entry.title || "unknown title",
        image: entry.image || "asd",
        price: entry.price || 0,
      }));
      const userRef = doc(db, "wishlist", userId);
      await setDoc(userRef, { items: formattedWishlist }, { merge: true });
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { id, title, price, images } = action.payload;
      console.log('image data ' , images);
      const image = images?.[0];

      const itemsExistIndex = state.items.findIndex((i) => i.id === id);
      if (itemsExistIndex >= 0) {
        state.items.splice(itemsExistIndex, 1);
      } else {
        state.items.push({ id, title, price, image });
      }
    },
    setWishlist: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWishlistFromFireBase.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadWishlistFromFireBase.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loadWishlistFromFireBase.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(saveWishlistFromFireBase.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});
export const { addToWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
