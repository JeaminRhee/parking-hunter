export default function ImpairedPage() {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>장애인차량 조회</h1>
        <p>
          <br/>장애인차량을 조회 하시려면 아래 링크를 클릭하세요:<br/>
        </p>
        <h2>↓</h2>
        <a
          href="https://q90wu8atvd.execute-api.ap-northeast-2.amazonaws.com/parkofjustice"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '1.2rem',
            margin: '20px auto',
          }}
        >
          장애인차량 조회
        </a>
      </div>
    );
  }
  