import React, { useState } from 'react';
import './frontweather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  // const [apiKey, setApiKey] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // 오류 초기화
    setResult(''); // 결과 초기화

    try {
      const response = await fetch('http://localhost:8080/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: city }),
      });

      const data = await response.json();

      if (data.error) {
        setError(`오류 발생: ${data.error}`);
      } else {
        setResult(data.answer);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('날씨 정보를 가져오는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="weather-container">
      <h1>날씨 정보 조회</h1>
      <form onSubmit={handleSubmit} className="weather-form">
        <div className="form-group">
          <label htmlFor="city">도시 이름:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="도시 이름을 입력하세요"
            required
          />
        </div>
        <br />
        <button type="submit" className="submit-button">날씨 조회</button>
      </form>

      <h2>결과:</h2>
      {result && (
        <ul className="result-list">
          {result.split(', ').map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Weather;
