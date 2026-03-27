import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interactive World Map Explorer",
  description:
    "Explore the world with an interactive 3D globe featuring real-time data overlays, country information, and animated flight paths.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-space-dark text-gray-200 antialiased">
        {children}
      </body>
    </html>
  );
}
