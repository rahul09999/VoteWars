import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "VoteWars App",
  description: "Your Vote, Your Power, Your Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={cn(
          "min-h-screen bg-slate-100 font-sans antialiased",
          fontSans.variable
        )}>{children}</body>
    </html>
  );
}
