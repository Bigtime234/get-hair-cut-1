import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/navigation/nav";
import { Providers } from "./components/providers";
import { Toaster } from "@/components/ui/sonner"
import { Cormorant_Garamond } from 'next/font/google';
import Footer from "@/app/homepage/Footer"


const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Premium Cutz",
  description: "Hair cutz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cormorantGaramond.className}
      >
        <Providers>
          <Nav/>
          {children}
        </Providers>
        <Toaster/>
        <Footer/>
      </body>
    </html>
  );
}