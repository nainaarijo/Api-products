import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "./slices/add-cart/addCartSlice";
import SliceProduct from './slices/product/SliceProduct'

export const store = configureStore({
    reducer: {
        counter : counterReducer,
        product: SliceProduct,
    },
  })