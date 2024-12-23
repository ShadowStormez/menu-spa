// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';
import globalReducer from './globalSlice'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    global: globalReducer,
    auth: authReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
