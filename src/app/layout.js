import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from './ThemeProvider.js';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "주차헌터",
  description: "주차헌터 : 불법주차 척결 & 인구 지키자",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <head>
        <meta name="google-site-verification" content="bzv-sleP2VCnEvq6l7fCuXOzprn7SjOXkJrVrkdLJeM" />
        <meta name="naver-site-verification" content="9f0f3b5da8f20841069e6889d9683854e1ca3763" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
