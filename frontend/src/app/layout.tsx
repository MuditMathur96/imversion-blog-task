import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrendTales",
  description: "Share your thougths",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any"></link>
        </head>
        <body className={inter.className}>
          <div className="max-w-7xl min-h-screen mx-auto">
            <Navbar />
            <div className="min-h-[calc(100vh-80px)]">
            {children}
            </div>
          </div>
          </body>
      </html>
    </ClerkProvider>
  );
}
