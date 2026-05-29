import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SkillSignal",
  description:
    "AI-powered job-market analysis for students and early-career developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", openSans.variable, poppins.variable)}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
