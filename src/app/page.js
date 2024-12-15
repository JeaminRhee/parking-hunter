'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const [count, setCount] = useState(0);
  const [fatalities, setFatalities] = useState(0);
  const fullText = "주차 헌터 ";
  const maxRepeats = 10;

  useEffect(() => {
    let index = 0;
    let currentText = '';

    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setDisplayText(currentText);
        index++;
      } else {
        if (maxRepeats > 1) {
          index = 0;
          currentText = '';
        } else {
          clearInterval(interval);
        }
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const targetNumber = 199296;
    const duration = 2500;
    const increment = Math.ceil(targetNumber / (duration / 10));

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev + increment >= targetNumber) {
          clearInterval(interval);
          return targetNumber;
        }
        return prev + increment;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const targetNumber = 3349;
    const duration = 2500;
    const increment = Math.ceil(targetNumber / (duration / 10));

    const interval = setInterval(() => {
      setFatalities((prev) => {
        if (prev + increment >= targetNumber) {
          clearInterval(interval);
          return targetNumber;
        }
        return prev + increment;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.animatedText}>{displayText}</h1>
        <h6 className={styles.redText}>불법주차 척결 & 생명 구하자</h6>
        <h6 className={styles.redText}><i>Eliminate illegal parking & save lives ✞</i></h6>
        <h2>1년 평균 교통사고 수: <br /><code><i>{count.toLocaleString()}</i></code> 건</h2>
        <h2>1년 평균 교통사고 사망자 수: <br /><code><i>{fatalities.toLocaleString()}</i></code> 건</h2>
        <h2>청소년 사망원인 2위: <br /><code>교통사고 및 안전사고</code></h2>
        
        <div className={styles.ctas}>
          <a className={styles.primary} href="/lectures" rel="noopener noreferrer">
            <Image className={styles.logo} src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
            불법주정차 교육자료
          </a>
          <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className={styles.secondary}>
            우리의 docs 읽기
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="https://nextjs.org/learn" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a href="https://vercel.com/templates" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
