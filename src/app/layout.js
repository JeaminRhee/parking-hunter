'use client';

import { useState } from 'react';
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

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="kr">
      <head>
        <meta name="google-site-verification" content="bzv-sleP2VCnEvq6l7fCuXOzprn7SjOXkJrVrkdLJeM" />
        <meta name="naver-site-verification" content="9f0f3b5da8f20841069e6889d9683854e1ca3763" />
        <meta title='주차헌터' description='주차헌터 : 불법주차 척결 & 인구 지키자'/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Navigation Bar */}
        <header className="navbar">
          <a className="logo" href="/">주차헌터</a>
          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="/">홈</a>
            <a href="/lottery">랜덤 기프티콘 응모하기</a>
            <a href="/lectures">교육자료</a>
          </nav>
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
        </header>

        {/* Main Content */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
