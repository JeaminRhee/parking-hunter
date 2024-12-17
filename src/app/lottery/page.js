'use client';

import { useState } from 'react';
import moment from 'moment-timezone';
import styles from './lottery.module.css';

export default function Lottery() {
  // State to track active tab
  const [activeTab, setActiveTab] = useState('tab1');

  // State for form fields
  const [formData, setFormData] = useState({
    email: '',
    reportCode1: '',
    reportCode2: '',
    reportCode3: '',
    reportCode4: '',
    reportCode5: '',
  });

  // Function to get the allowed prefix dynamically
  const getAllowedPrefix = () => {
    const now = moment().tz('Asia/Seoul'); // Current time in KST
    const year = now.year().toString().slice(-2); // '24' for 2024
    const month = now.month() + 1; // Month is zero-based, so add 1
    const prefixMonth = month < 10 ? `0${month}` : month; // Ensure two digits
    return `SPP-${year}${prefixMonth}`; // Example: SPP-2401
  };
  
  // Function to validate the report code format
  const validateReportCode = (code) => {
    const allowedPrefix = getAllowedPrefix();
    const regex = new RegExp(`^${allowedPrefix}-DD\\d{5}$`);
    return regex.test(code);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(naver\.com|kakao\.com|gmail\.com)$/i; // 'i' makes it case-insensitive
    return regex.test(email);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert('이메일은 naver.com, kakao.com, 또는 gmail.com 도메인만 허용됩니다.');
      return;
    }

    if (!validateReportCode(formData.reportCode1)) {
      alert(
        `입력한 코드가 잘못되었습니다. 현재는 ${getAllowedPrefix().slice(-2)}월 수용건만 허용합니다.\n올바른 형식: ${getAllowedPrefix()}-DDNNNNN`
      );
      return;
    }

    console.log('Form Data Submitted:', formData);
    alert('응모가 완료되었습니다! 🎉');
  };
  

  // Tab contents
  const tabContents = {
    tab1: (
      <div className={styles.content}>
        <h2 style={{margin: '10px auto'}}>🎁 랜덤 기프티콘 추첨 참여하기</h2>
        <p> <strong style={{color: 'red', margin: '10px auto'}}>수용</strong>된 신고번호만 입력하세요.</p>
        <p> 현재는 {getAllowedPrefix().slice(-2)}월 <strong style={{color: 'red'}}>수용</strong>건만 허용합니다.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Email Field */}
          <label>
            이메일:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@naver, @kakao, @gmail.com만 허용"
              required
              pattern="^[a-zA-Z0-9._%+-]+@(naver\.com|kakao\.com|gmail\.com)$"
              title="이메일은 naver.com, kakao.com, 또는 gmail.com 도메인만 허용됩니다."
            />
          </label>

          {/* Report Code Fields */}
          <label>
            신고 번호 1:
            <input
              type="text"
              name="reportCode1"
              value={formData.reportCode1}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            신고 번호 2:
            <input
              type="text"
              name="reportCode2"
              value={formData.reportCode2}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            신고 번호 3:
            <input
              type="text"
              name="reportCode3"
              value={formData.reportCode3}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            신고 번호 4:
            <input
              type="text"
              name="reportCode4"
              value={formData.reportCode4}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            신고 번호 5:
            <input
              type="text"
              name="reportCode5"
              value={formData.reportCode5}
              onChange={handleChange}
              required
            />
          </label>

          {/* Submit Button */}
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

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'tab1' ? styles.active : ''}`}
          onClick={() => setActiveTab('tab1')}
        >
          랜덤 추첨 참여
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'tab2' ? styles.active : ''}`}
          onClick={() => setActiveTab('tab2')}
        >
          참여 방법
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'tab3' ? styles.active : ''}`}
          onClick={() => setActiveTab('tab3')}
        >
          당첨자 명단
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'tab4' ? styles.active : ''}`}
          onClick={() => setActiveTab('tab4')}
        >
          후기
        </button>
      </div>

      {/* Active Tab Content */}
      <div className={styles.tabContent}>{tabContents[activeTab]}</div>
    </div>
  );
}
