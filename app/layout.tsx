import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BaseLayout from "./components/baseComponents/Layout/BaseLayout";
import { themeOption } from "./components/baseComponents/utils/helpers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conversation App",
  description: "Designed with Love ❤️ by @felixkpt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={themeOption} style={{ scrollPaddingTop: '5rem', scrollBehavior: 'smooth' }}>
      <body className={`${inter.className}`}>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
