import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { GlobalToastHandler } from "@/components/GlobalToastHandler";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shekla Tour and Travel | Ethiopian Weekend Escapes",
  description: "Curated Ethiopian weekend escapes to Wenchi Crater Lake, Doho Lodge and Beynouna Village. Forget the predictable weekend.",
  keywords: ["Ethiopia tours", "Weekend escapes Ethiopia", "Wenchi Crater Lake", "Doho Lodge", "Shekla Tour"],
  openGraph: {
    title: "Shekla Tour and Travel",
    description: "Curated Ethiopian weekend escapes designed to take you further from routine.",
    url: "https://shekla-tour-red.vercel.app",
    siteName: "Shekla Tour and Travel",
    images: [
      {
        url: "/images/hero1.webp",
        width: 1200,
        height: 630,
        alt: "Shekla Tour and Travel - Ethiopian Escapes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shekla Tour and Travel",
    description: "Curated Ethiopian weekend escapes.",
    images: ["/images/hero1.webp"],
  },
};

import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} antialiased bg-[#f4f1e9] text-[#11120f] font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <Toaster position="top-center" />
          <GlobalToastHandler />
          {children}
          <FloatingWhatsApp />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
