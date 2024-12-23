import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';
import globalReducer from './globalSlice';
import authReducer from './authSlice';

// Persist Configurations
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['global'], // Specify reducers to persist
};

// Wrapping specific reducers with persistReducer
const rootReducer = {
    category: categoryReducer,
    cart: cartReducer,
    global: persistReducer(persistConfig, globalReducer),
    auth: authReducer,
};

// Configure Store with Redux DevTools Enabled
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

// Create Persistor
export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
