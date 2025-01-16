import React, { useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      // CSV 파일을 줄 단위로 분리하고 각 줄을 콤마로 분리하여 2차원 배열로 변환
      const rows = text.split('\n').map(row => row.split(','));
      setData(rows);
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    // data 배열을 CSV 문자열로 변환
    const csvContent = data.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // 임시 a 태그를 만들어 CSV 파일 다운로드 실행
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "scores.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Park Golf Score Recorder</h1>
      <div style={{ marginBottom: "10px" }}>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <button onClick={handleExport} style={{ marginLeft: "10px" }}>Export CSV</button>
      </div>
      <table border="1" cellPadding="5" cellSpacing="0">
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
