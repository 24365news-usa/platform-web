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
  title: {
    default: "24365.News - Citizen Journalism Network",
    template: "%s | 24365.News",
  },
  description: "The distributed citizen journalist network covering news 24 hours a day, 365 days a year. Real people. Real stories. Real news.",
  keywords: ["citizen journalism", "news", "independent media", "video news", "local news"],
  authors: [{ name: "24365.News" }],
  creator: "24365.News",
  publisher: "24365.News",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://24365.news",
    siteName: "24365.News",
    title: "24365.News - Citizen Journalism Network",
    description: "The distributed citizen journalist network covering news 24 hours a day, 365 days a year.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "24365.News - News That Never Sleeps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "24365.News - Citizen Journalism Network",
    description: "Real people. Real stories. Real news. 24 hours a day, 365 days a year.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
