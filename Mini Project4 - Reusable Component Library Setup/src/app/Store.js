import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Features/Products/ProductSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
