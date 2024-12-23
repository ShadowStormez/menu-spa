'use client'
import './globals.css'; // Import global CSS (assuming you have your fonts defined here)
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import { Toaster } from 'react-hot-toast';

 const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <html lang="fa">
        <body>
          <main>
          <Toaster position="top-center" />
          {children} 
          </main>
        </body>
      </html>
      </PersistGate>
    </Provider>
  );
}
export default Layout;
