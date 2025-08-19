import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Sid Note",
  description: "Web application for viewing and presenting bass fingering with more specific notation than TAB",
  keywords: "bass, fingering, notation, TAB, music, ベース, 指使い, 楽譜",
  authors: [{ name: "kako-jun" }],
  openGraph: {
    title: "Sid Note",
    description: "Web application for viewing and presenting bass fingering with more specific notation than TAB",
    type: "website",
    locale: "ja_JP",
    url: "https://sid-note.llll-ll.com",
  },
  twitter: {
    card: "summary",
    title: "Sid Note",
    description: "Web application for viewing and presenting bass fingering with more specific notation than TAB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.drawio.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Sid Note",
              "description": "Web application for viewing and presenting bass fingering with more specific notation than TAB",
              "url": "https://sid-note.llll-ll.com",
              "author": {
                "@type": "Person",
                "name": "kako-jun"
              },
              "applicationCategory": "MusicApplication",
              "operatingSystem": "Web Browser"
            })
          }}
        />
      </head>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
