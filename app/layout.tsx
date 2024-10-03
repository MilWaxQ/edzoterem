import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner"

const font = Noto_Sans({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Edzőterem",
  description: "Edzőterem"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={font.className + " text-white"}>
        <NavBar/>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
