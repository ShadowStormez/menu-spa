"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import { Provider } from 'react-redux';
import { store } from './store';
import { Vazirmatn } from 'next/font/google';
import { Roboto } from 'next/font/google';
import EmotionProvider from "./EmotionProvider";

const vazirmatn = Vazirmatn({
  subsets: ['latin'],
  weight: ['400', '700'], // adjust as needed
  variable: '--font-vazirmatn',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vazirmatn.variable} ${roboto.variable}`}>
      <body className={inter.className}>
        <Provider store={store}>
          <EmotionProvider>
            {children}
          </EmotionProvider>
        </Provider>
      </body>
    </html>
  );
}
