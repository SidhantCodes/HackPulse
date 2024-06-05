import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";


const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ['400','500','600', '700'],
});

export const metadata: Metadata = {
  title: "HackPulse",
  description: "Pulsing with Hackathon Opportunities",
  icons: {
    icon: '/assets/images/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
