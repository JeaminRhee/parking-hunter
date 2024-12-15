'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const [count, setCount] = useState(0);
  const [fatalities, setFatalities] = useState(0);
  const fullText = "주차 헌터 ";
  const maxRepeats = 20;

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
    const duration = 3500;
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
    const duration = 3500;
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
        <h6 className={styles.redText}>불법주차 척결 & 인구 지키자</h6>
        <h6 className={styles.redText}><i>Eliminate illegal parking & save lives ✞</i></h6>
        <h2>1년 평균 교통사고 수: <br /><code><i>{count.toLocaleString()}</i></code> 건</h2>
        <h2>1년 평균 교통사고 사망자 수: <br /><code><i>{fatalities.toLocaleString()}</i></code> 건</h2>
        <h2>청소년 사망원인 2위: <br /><code>교통사고 및 안전사고</code></h2>
        <div className={styles.responsiveImageContainer}>
          <Image
            className={styles.responsiveImage}
            src="/illegal_parkings01.PNG"
            alt="부산불법주정차사진전01"
            width={100}
            height={45}
          />
        </div>
        <a><code>대한민국 주차 문화 현실 ...</code> </a>
        <div className={styles.responsiveImageContainer}>
          <Image
            className={styles.responsiveImage}
            src="/illegal_parkings02.PNG"
            alt="부산불법주정차사진전02"
            width={100}
            height={45}
          />
        </div>
        <a><code>주차질서 의식 부족 ... <br/>근접 주차 선호 ...<br/>주차는 원래 공짜 인식 ...</code><br/><br/> 근접 주차를 선호하는 경향과 주차를 공짜로 이용하는 인식이 불법주정차 문제를 악화시킵니다.
<br/><br/>
이렇게 불법주정차 차량 때문에 목숨을 잃는 사람이 매년 <code>1,000명</code> 이상... <br/><br/></a>
<a><code>반면 옆나라는 ...</code> </a>
        <div className={styles.responsiveImageContainer}>
          <Image
            className={styles.responsiveImage}
            src="/japan_example01.PNG"
            alt="일본불법주정차없는이유01"
            width={100}
            height={45}
          />
        </div>
        <div className={styles.responsiveImageContainer}>
          <Image
            className={styles.responsiveImage}
            src="/japan_example02.PNG"
            alt="일본불법주정차없는이유02"
            width={100}
            height={45}
          />
        </div>
        <div className={styles.responsiveImageContainer}>
          <Image
            className={styles.responsiveImage}
            src="/japan_example03.PNG"
            alt="일본불법주정차없는이유03"
            width={100}
            height={45}
          />
        </div>
        <div className={styles.responsiveImageContainer}>
          <Image
            className={styles.responsiveImage}
            src="/japan_example04.PNG"
            alt="일본불법주정차없는이유04"
            width={100}
            height={45}
          />
        </div>
        <div className={styles.responsiveImageContainer}>
          <Image
            className={styles.responsiveImage}
            src="/japan_example05.PNG"
            alt="일본불법주정차없는이유05"
            width={100}
            height={45}
          />
        </div>
        <div className={styles.responsiveImageContainer}>
          <Image
            className={styles.responsiveImage}
            src="/japan_example06.PNG"
            alt="일본불법주정차없는이유06"
            width={100}
            height={45}
          />
        </div>
        <div className={styles.ctas}>
          <a className={styles.primary} href="/" rel="noopener noreferrer">
            <Image className={styles.logo} src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
            불법주정차 신고하고 기프티콘 받기
          </a>
          <a className={styles.primary} href="/lectures" rel="noopener noreferrer">
            <Image className={styles.logo} src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
            불법주정차 신고방법 교육자료
          </a>
          <a href="/" rel="noopener noreferrer" className={styles.secondary}>
            Home
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
