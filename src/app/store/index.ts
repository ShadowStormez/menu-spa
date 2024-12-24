import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';
import globalReducer from './globalSlice';
import authReducer from './authSlice';

// Create a root reducer without persist configuration
const rootReducer = {
    category: categoryReducer,
    cart: cartReducer,
    global: globalReducer,
    auth: authReducer,
};

// Configure Store with Redux DevTools Enabled
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

// Export the store
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
