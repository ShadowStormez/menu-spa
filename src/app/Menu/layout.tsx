'use client'
import "../globals.css";
import { Provider } from "react-redux";
import store from "../store";
import { Toaster } from "react-hot-toast";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
    <html lang="fa">
      <body
        className={`antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
    </Provider>
  );
}
