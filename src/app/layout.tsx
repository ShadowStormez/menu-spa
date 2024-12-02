'use client'
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";

const VazirMatn = localFont({
  src: "./fonts/Vazirmatn-VariableFont_wght.ttf",
  variable: "--font-Vazir-Matn",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
         <html lang="fa">
      <body
        className={`${VazirMatn.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </Provider>
 
  );
}

