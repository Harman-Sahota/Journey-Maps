import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/sonner"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/ui/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Journey Maps",
  description: "Start your journey to happiness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          {children}
          
          <Toaster />
          <Footer />

        </ThemeProvider>

      </body>
    </html >
  );
}
