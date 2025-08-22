// app/ClientLayout.tsx
"use client";

import { Provider } from 'react-redux';
import { store } from './store';
import EmotionProvider from "./EmotionProvider";
import { Vazirmatn, Roboto, Inter } from 'next/font/google';
import './globals.css';
import './fonts.css';

const vazirmatn = Vazirmatn({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-vazirmatn',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${vazirmatn.variable} ${roboto.variable} ${inter.className}`}>
      <Provider store={store}>
        <EmotionProvider>
          {children}
        </EmotionProvider>
      </Provider>
    </div>
  );
}