'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
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
  const menuRef = useRef(null); // Reference for the menu container
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pathname = usePathname();

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dynamic Titles
  useEffect(() => {
    const titles = {
      '/': '주차헌터 - 홈',
      '/lottery': '주차헌터 - 신고 & 기프티콘',
      '/impaired': '주차헌터 - 장애인차량 조회',
      '/lectures': '주차헌터 - 교육자료',
      '/statistics': '주차헌터 - 신고통계',
    };
    document.title = titles[pathname] || '주차헌터 - 페이지를 찾을 수 없음';
  }, [pathname]);

  return (
    <html lang="ko">
      <head>
        <title>주차헌터</title>
        <link rel="icon" href="/vercel.svg" />
        <meta name="google-site-verification" content="bzv-sleP2VCnEvq6l7fCuXOzprn7SjOXkJrVrkdLJeM" />
        <meta name="naver-site-verification" content="9f0f3b5da8f20841069e6889d9683854e1ca3763" />
        <meta name="description" content="주차헌터 : 불법주차 척결 & 인구 지키자" />
        <meta property="og:url" content="parking-hunter.vercel.app" />
        <meta property="og:title" content="주차헌터" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/illegal_parkings01.PNG" />
        <meta property="og:description" content="불법주차 척결 & 인구 지키자" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Navigation Bar */}
        <header className="navbar" ref={menuRef}>
          <a className="logo" href="/">주차헌터</a>
          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="/">    홈    </a>
            <a href="/lottery">신고하고 기프티콘 받기</a>
            <a href="/impaired">장애인차량 조회</a>
            <a href="/lectures">  교육자료  </a>
            <a href="https://open.kakao.com/o/g0yUseOg" target="_blank">  커뮤니티  </a>
            <a href="/statistics">  신고 통계  </a>
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
