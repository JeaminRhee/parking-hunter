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
  description: "Let us hunt down all illegal parkings and save lives!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
