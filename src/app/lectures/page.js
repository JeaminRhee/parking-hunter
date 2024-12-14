import styles from './lectures.page.module.css';

export default function Lectures() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        딸배헌터 교수님의 불법주정차 신고 방법 교육자료
      </h1>
      <div className={styles.videoWrapper}>
        <iframe
          src="https://www.youtube.com/embed/7lE5_H4_WVQ"
          title="불법 주차 신고 3분 컷 하는 방법, 안전신문고"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={styles.iframe}
        ></iframe>
      </div>
    </div>
  );
}
