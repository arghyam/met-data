import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const noto = Noto_Serif({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MET DATA "
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <Navbar />
        {children}</body>
    </html>
  );
}
