import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GEM CERT - Trusted Gem & Diamond Certification Laboratory",
  description: "Professional gem and diamond certification services. Trusted laboratory for accurate gemstone identification and certification.",
  keywords: ["gem certification", "diamond certification", "gemology", "gemstone identification", "laboratory"],
  authors: [{ name: "GEM CERT" }],
  openGraph: {
    title: "GEM CERT - Gem & Diamond Certification",
    description: "Trusted laboratory for professional gemstone certification",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-black text-gray-100`}
      >
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
