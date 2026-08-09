import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CookieConsent, GoogleAnalytics } from "@/components/analytics";
import { CartSidebar } from "@/components/cart/CartSidebar";

import {
  LocalBusinessJsonLd,
  OrganizationJsonLd,
  WebSiteJsonLd,
} from "@/components/seo";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { CartProvider } from "@/contexts/CartContext";
import { envs } from "@/core/config";
import { DEFAULT_OG_IMAGE_URL } from "@/lib/seo/company";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(envs.NEXT_PUBLIC_BASE_URL_APP),
  title: `${envs.NEXT_PUBLIC_COMPANY_META_TITLE_MAIN} | ${envs.NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION}`,
  description: envs.NEXT_PUBLIC_COMPANY_META_DESCRIPTION,
  keywords: [
    "informática",
    "eletrônicos",
    "perfumes importados",
    "notebooks",
    "computadores",
    "periféricos",
    "hardware",
    "software",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: envs.NEXT_PUBLIC_BASE_URL_APP,
    siteName: envs.NEXT_PUBLIC_COMPANY_NAME,
    title: `${envs.NEXT_PUBLIC_COMPANY_META_TITLE_MAIN} | ${envs.NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION}`,
    description: envs.NEXT_PUBLIC_COMPANY_META_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: envs.NEXT_PUBLIC_COMPANY_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${envs.NEXT_PUBLIC_COMPANY_META_TITLE_MAIN} | ${envs.NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION}`,
    description: envs.NEXT_PUBLIC_COMPANY_META_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://assents01.comsuporte.com.br" />
        <link rel="dns-prefetch" href="https://assents01.comsuporte.com.br" />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
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

          {envs.NEXT_PUBLIC_GA_MEASUREMENT_ID ? <CookieConsent /> : null}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
