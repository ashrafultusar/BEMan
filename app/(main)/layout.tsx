
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </main>
  );
}
