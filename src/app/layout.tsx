// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "کافه ابر",
  description: "آدرس: گیشا، بین خیابان ۳۸ و ۴۰- تلفن: +۹۸۹۱۲۱۳۴۲۳۹۰",
  icons: {
    icon: "/LogoFinal.png", // <- This will point to public/favicon.ico
    shortcut: "/LogoFinal.png",
  }
};
export const viewport = "width=device-width, initial-scale=1, viewport-fit=cover";

import ClientLayout from "./ClientLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}