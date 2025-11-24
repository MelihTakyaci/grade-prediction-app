import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "GradePredict",
  description: "Predict Your Academic Success",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Tailwind CDN with plugins; config script comes before the CDN so it's picked up */}
        <script
          dangerouslySetInnerHTML={{
            __html: `tailwind.config = { darkMode: "class", theme: { extend: { colors: { \"primary\": \"#4b43e5\", \"background-light\": \"#f6f6f8\", \"background-dark\": \"#121121\", }, fontFamily: { \"display\": [\"Space Grotesk\", \"sans-serif\"] }, borderRadius: { DEFAULT: \"0.25rem\", lg: \"0.5rem\", xl: \"0.75rem\", full: \"9999px\" }, }, }, }`,
          }}
        />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-light dark:bg-background-dark font-display text-gray-300`}>
        {children}
      </body>
    </html>
  );
}
