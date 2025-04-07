import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth/authSlice";
import wishlistReducer from "../store/features/wishlist/wishListSlice";
import cartReducer from "./features/cart/cartSlice";
import { useSelector } from "react-redux";
import orderReducer from "./features/order/orderSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
