'use client'
import './globals.css'; // Import global CSS (assuming you have your fonts defined here)
import { Provider } from 'react-redux';
import store from './store';

 const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <html lang="fa">
        <body>
          <main>
          {children} 
          </main>
        </body>
      </html>
    </Provider>
  );
}
export default Layout;
