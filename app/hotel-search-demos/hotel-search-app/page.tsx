"use client";

import { useState } from 'react';
import Image from 'next/image';
import { getHotelData } from '../lib/getHotels';
import Link from 'next/link';

export default function HotelSearchPage() {
  const [keyword, setKeyword] = useState('');
  const [hotelData, setHotelData] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setHotelData([]);
    if (!keyword) {
      setError('キーワードを入力してください。');
      return;
    }
    try {
      const data = await getHotelData(keyword);
      if (data.length > 0) {
        setHotelData(data);
      } else {
        setError('ホテルが見つかりませんでした。');
      }
    } catch (err) {
      setError('ホテル情報の取得中にエラーが発生しました。');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ホテル検索</h1>
      <div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="キーワードを入力 (例: 東京, 温泉)"
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '300px' }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: '8px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: 'white', cursor: 'pointer' }}
        >
          検索
        </button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <div style={{ marginTop: '20px' }}>
        {hotelData.map((hotel, index) => (
          <div key={index} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '15px', maxWidth: '600px' }}>
            <h2>{hotel.hotel[0].hotelBasicInfo.hotelName}</h2>
            <p>{hotel.hotel[0].hotelBasicInfo.hotelSpecial}</p>
            <p>料金: {hotel.hotel[0].hotelBasicInfo.hotelMinCharge ? `¥${hotel.hotel[0].hotelBasicInfo.hotelMinCharge.toLocaleString()}〜` : '料金未定'}</p>
            <p>住所: {hotel.hotel[0].hotelBasicInfo.address1}{hotel.hotel[0].hotelBasicInfo.address2}</p>
            <p>評価: {hotel.hotel[0].hotelBasicInfo.reviewAverage}</p>
            {hotel.hotel[0].hotelBasicInfo.hotelImageUrl && (
              <Image
                src={hotel.hotel[0].hotelBasicInfo.hotelImageUrl}
                alt={hotel.hotel[0].hotelBasicInfo.hotelName}
                width={200}
                height={200}
                style={{ objectFit: 'cover' }}
              />
            )}
            <p style={{ marginTop: '10px' }}>
              <a href={hotel.hotel[0].hotelBasicInfo.hotelInformationUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                楽天トラベルで詳細を見る
              </a>
            </p>
          </div>
        ))}
      </div>

      <Link href="/" style={{ fontSize: '1.2rem', color: 'blue', display: 'block', marginTop: '20px' }}>
        Topページに戻る
      </Link>
    </div>
  );
}
