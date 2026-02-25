
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main><CartProvider>
      <Navbar />
      
      <main className="min-h-screen">
        {children}
      </main>  
      <Footer /></CartProvider>
    </main>
  );
}
