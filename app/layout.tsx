import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO Metadata Configuration ---
export const metadata: Metadata = {
  title: {
    default: "BEMEN | WEAR BEMEN TO BE MEN",
    template: "%s | BEMEN",
  },
  icons: {
    icon: "/assets/favicon.jpeg",
    shortcut: "/assets/favicon.jpeg",
    apple: "/assets/favicon.jpeg",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/assets/favicon.jpeg",
    },
  },
  description:
    "Discover BEMEN's exclusive collection of premium linen shirts, cotton trousers, denim jeans, and plus-size fashion for men. Quality craftsmanship meets modern style.",
  keywords: [
    "men's fashion",
    "linen shirts",
    "premium trousers",
    "plus size men's clothing",
    "BEMEN clothing",
    "Bangladeshi menswear",
  ],
  authors: [{ name: "BEMEN" }],
  creator: "BEMEN",
  publisher: "BEMEN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: "BEMEN | Premium Men's Fashion",
    description: "Elevate your wardrobe with BEMEN's premium collection.",
    url: "https://thebemen.com",
    siteName: "BEMEN",
    locale: "en_IN",
    type: "website",
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "BEMEN | WEAR BEMEN TO BE MEN",
    description: "Premium Men's Apparel for the Modern Man.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <main className="min-h-screen">{children}</main>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            style: {
              background: "#000",
              color: "#fff",
              fontSize: "12px",
              borderRadius: "8px",
              padding: "12px 24px",
            },
          }}
        />
      </body>
    </html>
  );
}
