"use client";
import Link from 'next/link'

export default function WeatherSummaryPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>天気アプリの概要</h1>

      <section style={{ marginBottom: '2rem' }}>
        <p>
          この天気アプリは、Next.js を使用して構築されたシンプルなウェブアプリケーションです。ユーザーが入力した都市の現在の天気情報を取得し、表示します。
        </p>
        <h2>主な機能:</h2>
        <ul>
          <li><strong>都市検索:</strong> 検索ボックスに都市名を入力し、検索ボタンをクリックすることで、その都市の天気情報を取得できます。</li>
          <li><strong>天気情報の表示:</strong> 検索された都市の以下の情報を表示します。
            <ul>
              <li>都市名</li>
              <li>天気概況（例: 晴れ、曇り、雨など）</li>
              <li>気温（摂氏）</li>
              <li>湿度</li>
              <li>風速</li>
              <li>天気アイコン</li>
            </ul>
          </li>
          <li><strong>エラーハンドリング:</strong>
            <ul>
              <li>都市名が入力されていない場合は、その旨をユーザーに通知します。</li>
              <li>入力された都市が見つからない場合は、「都市が見つかりませんでした」と表示します。</li>
              <li>APIからのデータ取得中にエラーが発生した場合は、一般的なエラーメッセージを表示します。</li>
            </ul>
          </li>
        </ul>
        <p>
          <Link href="/weather-demos/app">→ 天気アプリを試す</Link>
        </p>
      </section>

      <section>
        <h2>技術スタック:</h2>
        <ul>
          <li><strong>フレームワーク:</strong> Next.js (React)</li>
          <li><strong>天気データ:</strong> OpenWeatherMap API を利用して天気情報を取得しています。APIキーは環境変数 (`NEXT_PUBLIC_OPENWEATHER_API_KEY`) から読み込まれます。</li>
          <li><strong>データフェッチ:</strong> クライアントサイドで `fetch` を使用してAPIを呼び出しています。</li>
          <li><strong>データキャッシュ:</strong> クライアントサイドでのデータ取得は、ブラウザのキャッシュやクライアントサイドの状態管理によってデータの鮮度が管理されます。</li>
        </ul>
      </section>

      <p style={{ marginTop: '2rem' }}>
        <Link href="/">← トップページに戻る</Link>
      </p>
    </main>
  );
}
