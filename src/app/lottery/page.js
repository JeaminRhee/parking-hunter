'use client';

import { supabase } from '../../utils/supabase/server';
import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import styles from './lottery.module.css';
import Image from "next/image";
import { DateTime } from 'luxon';

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

  const [reportCodes, setReportCodes] = useState([]);

  // Fetch data from Supabase on component mount
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('report_code_lottery').select();
      if (error) {
        console.error('Error fetching report codes:', error.message);
      } else {
        setReportCodes(data);
        // console.log('Fetched report codes:', data);
      }
    };

    fetchData();
  }, []);


  // 캐시 로컬스토리지에 같은 날짜의 응모 이력이 있는지 확인
  const checkLocalStorageSubmission = () => {
    const today = moment().tz('Asia/Seoul').format('YYYY-MM-DD');
    const lastSubmission = localStorage.getItem('lastLotterySubmission');
    return lastSubmission === today;
  };

  // 캐시 로컬스토리지에 응모 이력 저장
  const updateLocalStorageSubmission = () => {
    const today = moment().tz('Asia/Seoul').format('YYYY-MM-DD');
    localStorage.setItem('lastLotterySubmission', today);
  };



  const getAllowedPrefix = () => {
    const now = DateTime.now().setZone('Asia/Seoul');
    const year = now.year;
    const month = now.month;
    const startOfCurrentRange = now.set({ day: 7, hour: 0, minute: 0, second: 0 }).startOf('day');
    const endOfCurrentRange = startOfCurrentRange.plus({ months: 1 }).set({ day: 6 }).endOf('day');
  
    if (now >= startOfCurrentRange && now <= endOfCurrentRange) {
      return `SPP-${String(year).slice(-2)}${String(month).padStart(2, '0')}`;
    } else {
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      return `SPP-${String(prevYear).slice(-2)}${String(prevMonth).padStart(2, '0')}`;
    }
  };

  // 신고 번호 validation
  const validateReportCode = (code) => {
    const now = moment().tz('Asia/Seoul'); // Current time in KST
    const currentYear = now.year(); // Current year (e.g., 2025)
    const currentMonth = now.month() + 1; // Current month (1-based)
    const today = now.date(); // Today's date (e.g., 5)
  
    // Calculate the start date of the current range (7th of last month)
    const rangeStart = now.clone().date(7).subtract(1, 'month'); // 7th of the previous month
    const rangeEnd = rangeStart.clone().add(1, 'month').subtract(1, 'day'); // 6th of the current month
  
    // Determine allowed prefixes
    const formatPrefix = (year, month) => {
      const yearStr = year.toString().slice(-2); // Last two digits of the year
      const monthStr = month < 10 ? `0${month}` : month; // Two-digit month
      return `SPP-${yearStr}${monthStr}`;
    };
  
    const prevYear = rangeStart.year();
    const prevMonth = rangeStart.month() + 1; // Last month (1-based)
    const currentPrefix = formatPrefix(currentYear, currentMonth);
    const previousPrefix = formatPrefix(prevYear, prevMonth);
  
    // Build regex for the allowed prefixes
    const regex = new RegExp(
      `^(${previousPrefix}|${currentPrefix})-(0[1-9]|[12][0-9]|3[01])\\d{5}$`
    );
  
    // Test format first
    if (!regex.test(code)) return false;
  
    // Extract day and prefix parts from the code
    const match = code.match(/^SPP-(\d{4})-(\d{2})/);
    if (!match) return false;
  
    const [_, prefixYearMonth, dayPart] = match;
    const day = parseInt(dayPart, 10);
  
    // Validate day range: must be within 1-31
    if (day < 1 || day > 31) {
      return false;
    }
  
    // Determine the effective date range for the prefix
    let prefixDateRange;
    if (prefixYearMonth === previousPrefix.slice(4)) {
      prefixDateRange = {
        start: rangeStart.clone().startOf('month'),
        end: rangeStart.clone().endOf('month'),
      };
    } else if (prefixYearMonth === currentPrefix.slice(4)) {
      prefixDateRange = {
        start: rangeEnd.clone().startOf('month'),
        end: rangeEnd.clone().endOf('month'),
      };
    } else {
      return false;
    }
  
    // Check if the day is within the allowed range
    const prefixDate = prefixDateRange.start.clone().date(day);
    if (!prefixDate.isValid() || prefixDate.isBefore(prefixDateRange.start) || prefixDate.isAfter(prefixDateRange.end)) {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Email Validation
    if (!validateEmail(formData.email)) {
      alert('이메일은 naver.com, kakao.com, 또는 gmail.com 도메인만 허용됩니다.');
      return;
    }
  
    // ✅ Gather and Validate Report Codes
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
  
    // Add localStorage check
    // 응모하기는 하루에 한 번만 validation (캐시 로컬 스토리지)
    if (checkLocalStorageSubmission()) {
      alert('오늘 이미 응모를 완료하셨습니다. 내일 다시 시도해주세요. 하루에 한 번만 응모 가능합니다.');
      return;
    }


    // ✅ Check for Daily Submission for the Email
    // 응모하기는 하루에 한 번만 validation (DB table)
    const { data: todaySubmission, error: dateError } = await supabase
      .from('report_code_lottery')
      .select('submitted_at')
      .eq('email', formData.email)
      .gte('submitted_at', moment().tz('Asia/Seoul').startOf('day').toISOString())
      .lte('submitted_at', moment().tz('Asia/Seoul').endOf('day').toISOString());
  
    if (dateError) {
      console.error('Error checking daily submission:', dateError.message);
      alert('일일 응모 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
  
    if (todaySubmission.length > 0) {
      alert('오늘 이미 응모를 완료하셨습니다. 내일 다시 시도해주세요. 하루에 한 번만 응모 가능합니다.');
      return;
    }
  
    // ✅ Check if Report Codes Exist in the Database
    // 중복 신고 번호 validation
    const { data: existingCodes, error: duplicateError } = await supabase
      .from('report_code_lottery')
      .select('report_code')
      .in('report_code', reportCodes);
  
    if (duplicateError) {
      console.error('Error checking report codes:', duplicateError.message);
      alert('신고 코드 검증 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
  
    if (existingCodes.length > 0) {
      const duplicateCodes = existingCodes.map((record) => record.report_code).join(', ');
      alert(`다음 신고 코드가 이미 존재합니다: ${duplicateCodes}`);
      return;
    }
  
    // ✅ Insert Data in a Single Query
    // 응모하기 데이터 insert
    try {
      const insertData = reportCodes.map((code) => ({
        email: formData.email,
        report_code: code,
        submitted_at: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'),
      }));
  
      const { error: insertError } = await supabase.from('report_code_lottery').insert(insertData);
  
      if (insertError) {
        console.error('Error inserting data:', insertError.message);
        alert('데이터 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        return;
      }
  
      console.log('Form Data Submitted:', formData);
      alert('응모가 완료되었습니다! 🎉');
      updateLocalStorageSubmission(); // 캐시 로컬스토리지에 응모 이력 저장
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [winners, setWinners] = useState([]);

  // Tab 3 당첨자 명단 조회를 위한 
  useEffect(() => {
    const fetchWinners = async () => {
      const { data, error } = await supabase
        .from('report_code_lottery_winner')
        .select('email, report_code, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching winners:', error.message);
        setWinners([]);
      } else {
        setWinners(data || []);
      }
    };

    if (activeTab === 'tab3') {
      fetchWinners();
    }
  }, [activeTab]);

  const tabContents = {
    // TAB 1: 랜덤 추첨 참여
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
        <br/>
        <p>{getAllowedPrefix().slice(-2)}월 총 응모 건수: <i>{reportCodes.length}</i></p>
        <br/>
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

    // TAB 2: 참여방법
    tab2: (
      <div className={styles.content}>
        <h2 style={{ margin: '10px auto' }}>🔍 안전신문고 신고번호 복사 방법</h2>
        <p><br/>*참여를 위해 총 <strong style={{ color: 'red', margin: '20px auto' }}>5개</strong>의 수용 신고번호가 필요합니다<br/>.</p>
        <p>
          I. <strong style={{ color: 'red', margin: '20px auto' }}>안전신문고 앱</strong> 열기.
        </p>
        <p style={{ margin: '30px auto' }}>
          II. 우측 상단 <strong style={{ color: 'red', margin: '20px auto' }}>햄버거 메뉴</strong> 열기.
        </p>
        <div className={styles.responsiveImageContainer} style={{margin: '20px auto' }}>
          <Image
            className={styles.responsiveImage}
            src="../report_demonstration_process01.jpg"
            alt="주차헌터_안전신문고_절차01"
            width={300}
            height={350}
            quality={100}
            unoptimized
          />
        </div>
        <p style={{ margin: '30px auto' }}>
          III. <strong style={{ color: 'red', margin: '20px auto' }}>'나의신고'</strong> &nbsp; 클릭
        </p>
        <div className={styles.responsiveImageContainer} style={{margin: '20px auto' }}>
          <Image
            className={styles.responsiveImage}
            src="../report_demonstration_process02.jpg"
            alt="주차헌터_안전신문고_절차02"
            width={300}
            height={350}
            quality={100}
            unoptimized
          />
        </div>
        <p style={{ margin: '30px auto' }}>
          IV. '신고내역' &nbsp; 클릭
        </p>
        <div className={styles.responsiveImageContainer} style={{margin: '20px auto' }}>
          <Image
            className={styles.responsiveImage}
            src="../report_demonstration_process03.jpg"
            alt="주차헌터_안전신문고_절차03"
            width={300}
            height={350}
            quality={100}
            unoptimized
          />
        </div>
        <p style={{ margin: '30px auto' }}>
          V. '신고번호' 복사
        </p>
        <div className={styles.responsiveImageContainer} style={{margin: '20px auto' }}>
          <Image
            className={styles.responsiveImage}
            src="../report_demonstration_process04.jpg"
            alt="주차헌터_안전신문고_절차04"
            width={300}
            height={350}
            quality={100}
            unoptimized
          />
        </div>
        <p style={{ margin: '30px auto' }}>
          VI. '신고번호' 붙여넣기
        </p>
        <div className={styles.responsiveImageContainer} style={{margin: '20px auto' }}>
          <Image
            className={styles.responsiveImage}
            src="../report_demonstration_process05.jpg"
            alt="주차헌터_안전신문고_절차05"
            width={300}
            height={400}
            quality={100}
            unoptimized
          />
        </div>
        <p style={{ margin: '30px auto' }}>
          VII. '신고번호' 5개 복붙하고 응모하기
        </p>
        <p style={{ margin: '30px auto'}}>
          <strong>- 끝 -</strong>
        </p>
      </div>
    ),

    // TAB 3: 당첨자 명단
    tab3: (
      <div className={styles.content}>
        <h2>🎉 당첨자 명단</h2>
        {winners?.length > 0 ? (
          <ul className={styles.winnerList}>
            {winners.map((winner, index) => (
              <li key={index} className={styles.winnerItem}>
                <strong>{moment(winner.created_at).format('YYYY-MM')} 당첨자</strong> <br /><br />
                <strong>📧이메일:</strong> {winner.email} <br />
                <strong>📝신고번호:</strong> {winner.report_code} <br />
                <strong>📅당첨일:</strong> {moment(winner.created_at).format('YYYY-MM-DD HH:mm')}
              </li>
            ))}
          </ul>
        ) : (
          <p>아직 당첨자가 없습니다.</p>
        )}
      </div>
    ),
    
    // TAB 4: 후기
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
