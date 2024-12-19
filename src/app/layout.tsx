'use client'
import './globals.css'; // Import global CSS (assuming you have your fonts defined here)
import { Provider } from 'react-redux';
import store from './store';
import { Toaster } from 'react-hot-toast';

 const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <html lang="fa">
        <body>
          <main>
          <Toaster position="top-center" />
          {children} 
          </main>
        </body>
      </html>
    </Provider>
  );
}
export default Layout;
