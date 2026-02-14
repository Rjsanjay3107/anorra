import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Anorra | Premium Brand - Bespoke Solutions",
  description: "Anorra - Premium UK-based brand offering bespoke solutions, quality craftsmanship, and modern premium design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#0D0D0D] text-white`}>
        {children}
      </body>
    </html>
  );
}
