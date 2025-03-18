import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth/authSlice";
import wishlistReducer from "../store/features/wishlist/wishListSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
