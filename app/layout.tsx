import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Libre_Baskerville } from "next/font/google";
import { Toaster } from "sonner";
import { LogSnagProvider } from '@logsnag/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connect3 | Waitlist",
  description:
    "Join the waitlist for Connect3, an AI-Powered Search Engine for University Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <LogSnagProvider token={process.env.NEXT_PUBLIC_LOGSNAG_TOKEN!} project={process.env.NEXT_PUBLIC_LOGSNAG_PROJECT!} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-center"
        />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </html>
  );
}
