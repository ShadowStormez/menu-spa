'use client';
import './globals.css'; // Import global CSS
import { Provider } from 'react-redux';
import store from './store';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fa">
      <head>
        <title>menyou-spa</title> {/* Add a title for better SEO */}
        {/* You can add more meta tags here */}
      </head>
      <body>
        <Provider store={store}>
          <Toaster position="top-center" />
          <main>{children}</main> {/* Wrap children in main for semantic HTML */}
        </Provider>
      </body>
    </html>
  );
}

export default Layout;
