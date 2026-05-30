import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DriveMotion AI | Cinema per il tuo Autosalone",
  description: "Crea Reel virali per le tue auto in pochi minuti con l'AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {/* 1. TRACCIAMENTO GOOGLE ANALYTICS */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QJJHF2Q1P7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-QJJHF2Q1P7');
          `}
        </Script>

        {/* 2. BANNER DEI COOKIE RM STUDIO */}
        <Script src="https://rmstudio.app/cookie-banner.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
