'use client';
import './globals.css'; // Import global CSS
import { Toaster } from 'react-hot-toast';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store'; // Adjust path as needed

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fa">
      <head>
        <title>menyou-spa</title> {/* Add a title for better SEO */}
        {/* You can add more meta tags here */}
      </head>
      <body>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster position="top-center" />
          <main>{children}</main> {/* Wrap children in main for semantic HTML */}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

export default Layout;
