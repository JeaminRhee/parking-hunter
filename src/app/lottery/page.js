'use client';

import { useState } from 'react';
import moment from 'moment-timezone';
import styles from './lottery.module.css';

export default function Lottery() {
  const [activeTab, setActiveTab] = useState('tab1');

  const [formData, setFormData] = useState({
    email: '',
    reportCode1: '',
    reportCode2: '',
    reportCode3: '',
    reportCode4: '',
    reportCode5: '',
  });

  const getAllowedPrefix = () => {
    const now = moment().tz('Asia/Seoul');
    const year = now.year();
    const month = now.month() + 1; // 1-based month
    const startOfCurrentRange = moment.tz(`${year}-${month}-07`, 'Asia/Seoul');
    const endOfCurrentRange = moment(startOfCurrentRange).add(1, 'month').date(6).endOf('day');

    if (now.isSameOrAfter(startOfCurrentRange) && now.isSameOrBefore(endOfCurrentRange)) {
      const formattedMonth = month < 10 ? `0${month}` : month;
      return `SPP-${year.toString().slice(-2)}${formattedMonth}`;
    } else {
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      const formattedPrevMonth = prevMonth < 10 ? `0${prevMonth}` : prevMonth;
      return `SPP-${prevYear.toString().slice(-2)}${formattedPrevMonth}`;
    }
  };

  const validateReportCode = (code) => {
    const now = moment().tz('Asia/Seoul'); // Current time in KST
    const year = now.year().toString().slice(-2); // Last two digits of the year (e.g., 24)
    const month = now.month() + 1; // Current month (1-based)
    const today = now.date(); // Today's date (e.g., 17)
  
    // Allowed prefix: SPP-YYMM
    const prefixMonth = month < 10 ? `0${month}` : month; // Ensure two digits for the month
    const allowedPrefix = `SPP-${year}${prefixMonth}`;
  
    // Build regex: SPP-YYMM-DDNNNNN
    const regex = new RegExp(`^${allowedPrefix}-(0[1-9]|[12][0-9]|3[01])\\d{5}$`);
  
    // Test format first
    if (!regex.test(code)) return false;
  
    // Extract day part (DD)
    const dayMatch = code.match(new RegExp(`^${allowedPrefix}-(\\d{2})\\d{5}$`));
    if (!dayMatch) return false;
  
    const dayPart = parseInt(dayMatch[1], 10);
  
    // Validate day range: Day must not exceed today's date
    if (dayPart < 1 || dayPart >= today) {
      return false;
    }
  
    return true;
  };
  

  // 이메일 validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(naver\.com|kakao\.com|gmail\.com)$/i;
    return regex.test(email);
  };

  // 응모하기 Validation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert('이메일은 naver.com, kakao.com, 또는 gmail.com 도메인만 허용됩니다.');
      return;
    }

    const reportCodes = [
      formData.reportCode1,
      formData.reportCode2,
      formData.reportCode3,
      formData.reportCode4,
      formData.reportCode5,
    ];

    const uniqueCodes = new Set(reportCodes);

    if (uniqueCodes.size !== reportCodes.length) {
      alert('신고 번호는 중복될 수 없습니다.');
      return;
    }

    for (const code of reportCodes) {
      if (!validateReportCode(code)) {
        alert(
          `입력한 코드가 잘못되었습니다. 현재는 ${getAllowedPrefix().slice(-2)}월 어제 날짜까지의 수용건만 허용합니다.\n올바른 형식: ${getAllowedPrefix()}-DDNNNNN`
        );
        return;
      }
    }

    console.log('Form Data Submitted:', formData);
    alert('응모가 완료되었습니다! 🎉');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tabContents = {
    tab1: (
      <div className={styles.content}>
        <h2 style={{ margin: '10px auto' }}>🎁 랜덤 기프티콘 추첨 참여하기</h2>
        <p>
          <strong style={{ color: 'red', margin: '10px auto' }}>수용</strong>된 신고번호만 입력하세요.
        </p>
        <p>
          현재는 {getAllowedPrefix().slice(-2)}월 <strong style={{ color: 'red' }}>수용</strong>건만
          허용합니다.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            이메일:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@naver, @kakao, @gmail.com만 허용"
              minLength={14}
              maxLength={70}
              required
            />
          </label>
          {Array.from({ length: 5 }).map((_, index) => (
            <label key={index}>
              신고 번호 {index + 1}:
              <input
                type="text"
                name={`reportCode${index + 1}`}
                value={formData[`reportCode${index + 1}`]}
                onChange={handleChange}
                maxLength={16}
                required
              />
            </label>
          ))}
          <button type="submit" className={styles.submitButton}>
            응모하기
          </button>
        </form>
      </div>
    ),
    tab2: <div className={styles.content}>🔍 기프티콘 목록 조회 중...</div>,
    tab3: <div className={styles.content}>🎉 당첨자 명단 조회</div>,
    tab4: <div className={styles.content}>📊 후기</div>,
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🎁 랜덤 기프티콘 응모하기 🎁</h1>
      <div className={styles.tabs}>
        {['랜덤 추첨 참여', '참여 방법', '당첨자 명단', '후기'].map((tab, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${activeTab === `tab${index + 1}` ? styles.active : ''}`}
            onClick={() => setActiveTab(`tab${index + 1}`)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{tabContents[activeTab]}</div>
    </div>
  );
}
