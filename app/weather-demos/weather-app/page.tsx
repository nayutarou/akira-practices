"use client";

import { useState } from 'react';
import Image from 'next/image';
import { getWeatherData } from '../lib/getWeather';

export default function WeatherPage() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setWeatherData(null);
    if (!city) {
      setError('都市名を入力してください。');
      return;
    }
    try {
      const data = await getWeatherData(city);
      if (data) {
        setWeatherData(data);
      } else {
        setError('都市が見つかりませんでした。');
      }
    } catch (err) {
      setError('天気情報の取得中にエラーが発生しました。');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>天気アプリ</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="都市名を入力"
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: '8px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: 'white', cursor: 'pointer' }}
        >
          検索
        </button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px', maxWidth: '400px' }}>
          <h2>{weatherData.name}</h2>
          <p>天気: {weatherData.weather[0].description}</p>
          <p>気温: {weatherData.main.temp}°C</p>
          <p>湿度: {weatherData.main.humidity}%</p>
          <p>風速: {weatherData.wind.speed} m/s</p>
          {weatherData.weather[0].icon && (
            <Image
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              width={50}
              height={50}
          />
          )}
        </div>
      )}
    </div>
  );
}
