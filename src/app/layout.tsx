import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "ANORRA | Calm, Thoughtful Living",
  description: "Design-led, sustainable living brand creating calm experiences across hospitality, wellness, and gifting.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 10,
    minimumScale: 0.5,
    userScalable: true,
    viewportFit: 'cover',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#1A1814] text-[#F5F3EE]`}>
        {children}
      </body>
    </html>
  );
}
