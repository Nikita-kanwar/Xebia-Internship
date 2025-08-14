import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Features/Products/ProductSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
