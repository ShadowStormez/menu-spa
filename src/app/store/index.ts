import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';
import globalReducer from './globalSlice';
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['global'],
  };

  const persistedReducer = persistReducer(persistConfig, globalReducer);

const rootReducer = {
    category: categoryReducer,
    cart: cartReducer,
    global: persistedReducer,
    auth: authReducer,
};

// Configure Store with Redux DevTools Enabled
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
