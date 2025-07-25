"use client";
import Link from 'next/link';

export default function HotelSearchSummaryPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>ホテル検索アプリの概要</h1>

      <section style={{ marginBottom: '2rem' }}>
        <p>
          このホテル検索アプリは、Next.js を使用して構築されたウェブアプリケーションです。楽天トラベルのAPIを利用して、指定したキーワードで日本のホテルを検索し、結果を表示します。
        </p>
        <h2>主な機能:</h2>
        <ul>
          <li><strong>キーワード検索:</strong> 検索ボックスにキーワード（例: 「東京」、「温泉」）を入力し、ホテルを検索できます。</li>
          <li><strong>並び替え機能:</strong> 関連度、料金（高い順・安い順）、人気度（評価の高い順・低い順）で検索結果を並び替えることができます。人気度での並び替えは、APIから取得したデータをクライアントサイドで処理します。</li>
          <li><strong>ページネーション:</strong> 検索結果が多数ある場合、10件ごとにページを区切って表示します。「次へ」「前へ」ボタンでページを移動できます。</li>
          <li><strong>ホテル情報の一覧表示:</strong> 検索結果として、ホテル名、説明、料金、住所、評価（詳細な星表示）、ホテルの画像などを一覧で表示します。</li>
          <li><strong>詳細ページへのリンク:</strong> 各ホテルの楽天トラベル上の詳細ページへのリンクを提供します。</li>
          <li><strong>エラーハンドリング:</strong> 検索キーワードが入力されていない場合や、検索結果が見つからない場合に、適切なメッセージを表示します。</li>
        </ul>
        <p>
          <Link href="/hotel-search-demos/hotel-search-app">→ ホテル検索アプリを試す</Link>
        </p>
      </section>

      <section>
        <h2>技術スタック:</h2>
        <ul>
          <li><strong>フレームワーク:</strong> Next.js (React)</li>
          <li><strong>ホテルデータ:</strong> 楽天トラベルキーワード検索APIを利用してホテル情報を取得します。APIの並び替え機能は料金順のみをサポートしており、人気度での並び替えはクライアントサイドで実装しています。APIの利用には、アプリケーションIDが必要です。</li>
          <li><strong>データフェッチ:</strong> サーバーサイドで `fetch` を使用してAPIを呼び出します。</li>
          <li><strong>画像表示:</strong> Next.jsのImageコンポーネントを使用し、`next.config.ts`に楽天の画像ドメインを登録することで、最適化された画像表示を実現しています。また、評価の星表示にはSVGを使用し、小数点以下の評価も正確に表現しています。</li>
        </ul>
      </section>

      <p style={{ marginTop: '2rem' }}>
        <Link href="/">← トップページに戻る</Link>
      </p>
    </main>
  );
}
