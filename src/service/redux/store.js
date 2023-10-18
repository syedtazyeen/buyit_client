import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";
import authSlice from "./authSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        allProducts: productSlice,
        categoryProducts: categorySlice,
        auth: authSlice

    }
})