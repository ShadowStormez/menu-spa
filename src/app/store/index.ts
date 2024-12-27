// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';
import globalReducer from './globalSlice';
import authReducer from './authSlice';
import logSignReducer from './logSignSlice';

// Define persistence configurations
const globalPersistConfig = {
  key: 'global',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

// Create persisted reducers
const persistedGlobalReducer = persistReducer(globalPersistConfig, globalReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Combine reducers
const rootReducer = combineReducers({
  category: categoryReducer,
  cart: cartReducer,
  global: persistedGlobalReducer,
  auth: persistedAuthReducer,
  logSign: logSignReducer
});

// Configure Store with Redux DevTools Enabled
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

// Create persistor
export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
