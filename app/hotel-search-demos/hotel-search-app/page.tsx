"use client";

import { useState } from 'react';
import Image from 'next/image';
import { getHotelData } from '../lib/getHotels';
import Link from 'next/link';
import StarRating from '../ui/StarRating'; // StarRatingコンポーネントをインポート

// APIから取得するホテル情報の型定義
interface Hotel {
  hotelName: string;
  hotelSpecial: string;
  hotelMinCharge: number | null;
  address1: string;
  address2: string;
  reviewAverage: number | null;
  hotelImageUrl: string;
  hotelInformationUrl: string;
}

export default function HotelSearchPage() {
  // stateの定義
  const [keyword, setKeyword] = useState(''); // 検索キーワード
  const [hotelData, setHotelData] = useState<Hotel[]>([]); // ホテル情報の配列
  const [error, setError] = useState(''); // エラーメッセージ
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ番号
  const [totalPages, setTotalPages] = useState(0); // 総ページ数
  const [sortBy, setSortBy] = useState('standard'); // 並び替えの基準の初期値は関連度

  /**
   * 検索ボタンがクリックされたときに実行される関数
   * @param page 取得するページ番号
   * @param currentSortBy 現在の並び替え基準
   */
  const handleSearch = async (page = 1, currentSortBy: string = sortBy) => {
    setError(''); // エラーメッセージをリセット

    // キーワードが空の場合はエラーメッセージを表示して処理を中断
    if (!keyword) {
      setError('キーワードを入力してください。');
      setHotelData([]);
      setTotalPages(0);
      return;
    }

    try {
      let apiSortParam = '';
      // 楽天APIがサポートする並び替えパラメータのみをAPIに渡す
      // 'standard', '+roomCharge', '-roomCharge' はAPIに渡す
      // '-reviewAverage', '+reviewAverage' はクライアントサイドで処理するためAPIには渡さない
      if (currentSortBy === '-roomCharge' || currentSortBy === '+roomCharge' || currentSortBy === 'standard') {
        apiSortParam = currentSortBy;
      }

      // APIを叩いてホテル情報を取得
      const { hotels, pagingInfo } = await getHotelData(keyword, page, apiSortParam);

      let sortedHotels = hotels; // 並び替え後のホテルデータを保持する変数

      // クライアントサイドでの並び替え（評価順）
      if (currentSortBy === '-reviewAverage') {
        sortedHotels = [...hotels].sort((a, b) => (b.reviewAverage || 0) - (a.reviewAverage || 0));
      } else if (currentSortBy === '+reviewAverage') {
        sortedHotels = [...hotels].sort((a, b) => (a.reviewAverage || 0) - (b.reviewAverage || 0));
      }

      if (sortedHotels.length > 0) {
        // ホテル情報が見つかった場合
        setHotelData(sortedHotels);
        setTotalPages(pagingInfo.pageCount);
        setCurrentPage(pagingInfo.page);
      } else {
        // ホテル情報が見つからなかった場合
        setError('ホテルが見つかりませんでした。');
        setHotelData([]);
        setTotalPages(0);
      }
    } catch (err) {
      setError('ホテル情報の取得中にエラーが発生しました。');
      console.error(err);
      setHotelData([]);
      setTotalPages(0);
    }
  };

  /**
   * ページネーションのボタンがクリックされたときに実行される関数
   * @param newPage 新しいページ番号
   */
  const handlePageChange = (newPage: number) => {
    // ページ番号が有効な範囲内であれば、新しいページで再検索
    if (newPage > 0 && newPage <= totalPages) {
      handleSearch(newPage, sortBy);
    }
  };

  /**
   * 並び替えの選択が変更されたときに実行される関数
   * @param e イベントオブジェクト
   */
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    handleSearch(1, newSortBy); // 並び替えを変更したら1ページ目から再検索
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ホテル検索</h1>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="キーワードを入力 (例: 東京, 温泉)"
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '300px' }}
        />
        <button
          onClick={() => handleSearch(1)} // 新しい検索は常に1ページ目から
          style={{ padding: '8px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: 'white', cursor: 'pointer' }}
        >
          検索
        </button>
      </div>

      {/* 並び替えドロップダウン */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="sort-by" style={{ marginRight: '10px' }}>並び替え:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="standard">関連度</option>
          <option value="-roomCharge">料金の高い順</option>
          <option value="+roomCharge">料金の安い順</option>
          <option value="-reviewAverage">人気度 (評価の高い順)</option>
          <option value="+reviewAverage">人気度 (評価の低い順)</option>
        </select>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {/* ページネーションUI */}
      {totalPages > 0 && (
        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
            前へ
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
            次へ
          </button>
        </div>
      )}

      {/* ホテル情報の一覧表示 */}
      <div style={{ marginTop: '20px' }}>
        {hotelData.map((hotel, index) => (
          <div key={index} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '15px', maxWidth: '600px', display: 'flex', gap: '15px' }}>
            {hotel.hotelImageUrl && (
              <div style={{ flexShrink: 0 }}>
                <Image
                  src={hotel.hotelImageUrl}
                  alt={hotel.hotelName}
                  width={150}
                  height={150}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
            )}
            <div>
              <h2>{hotel.hotelName}</h2>
              <p>{hotel.hotelSpecial}</p>
              <p>料金: {hotel.hotelMinCharge ? `¥${hotel.hotelMinCharge.toLocaleString()}〜` : '料金未定'}</p>
              <p>住所: {hotel.address1}{hotel.address2}</p>
              <p>評価: <StarRating rating={hotel.reviewAverage} /></p>
              <p style={{ marginTop: '10px' }}>
                <a href={hotel.hotelInformationUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                  楽天トラベルで詳細を見る
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link href="/" style={{ fontSize: '1.2rem', color: 'blue', display: 'block', marginTop: '20px' }}>
        Topページに戻る
      </Link>
    </div>
  );
}