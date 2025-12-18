import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { SnowEffect } from "@/components/seasonal/SnowEffect";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { CartProvider } from "@/contexts/CartContext";
import { envs } from "@/core/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${envs.NEXT_PUBLIC_COMPANY_META_TITLE_MAIN} - ${envs.NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION}`,
  description: `${envs.NEXT_PUBLIC_COMPANY_META_DESCRIPTION}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {children}
            <CartSidebar />
          </CartProvider>
          <SnowEffect />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
