import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
