export default function StatisticsPage() {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>불법주정차 통계</h1>
        <p>
          <br/>지역별 전일, 전월 신고 통계 정보를 보려면 아래 링크를 클릭하세요:<br/>
        </p>
        <h2>↓</h2>
        <a
          href="https://www.safetyreport.go.kr/#introduction/safeSingoStatistics"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '1.2rem',
            margin: '10px auto',
          }}
        >
          지역별 불법주정차 통계
        </a>
        <p>
          <br/>전국 연도별, 월별 통계 정보를 보려면 아래 링크를 클릭하세요:<br/>
        </p>
        <h2>↓</h2>
        <a
          href="https://bigdata.epeople.go.kr/bigdata/pot/stst/mwkwrd/forwardStstMwkwrdDetail.npaid?mwkwrd=%EB%B6%88%EB%B2%95_%EC%A3%BC%EC%A0%95%EC%B0%A8&amp;dspMenuId=P0053&amp;dspLinkMenuId=P0053"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '1.2rem',
            margin: '10px auto',
          }}
        >
          전국 불법주정차 통계
        </a>
      </div>
    );
  }
  