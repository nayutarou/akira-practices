import Link from 'next/link';

export default function Page() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Next.js キャッシュデモ</h1>
      <p>以下のリンクから、異なるキャッシュ戦略の挙動を確認できます。</p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <Link href="/folder-structure-guide" style={{ fontSize: '1.2rem', color: 'orange' }}>
          -- フォルダ構造ガイド --
        </Link>
        <h2 style={{margin: "0"}}>cacheについて</h2>
        <div style={{backgroundColor: '#fff', padding: '1rem',border: '2px solid #ccc', borderRadius: '20px'}}>
        <Link href="/cache-demos/top-cache" style={{ fontSize: '1.2rem', color: 'blue',display: 'block' }}>
          1. トップレベルキャッシュ (Full Route Cache) のデモ
        </Link>
        <Link href="/cache-demos/func-cache" style={{ fontSize: '1.2rem', color: 'green',display: 'block' }}>
          2. 動的レンダリング + 関数キャッシュ (Data Cache) のデモ
        </Link>
        <Link href="/cache-demos/cache-summary" style={{ fontSize: '1.2rem', color: 'purple',display: 'block' }}>
          3. キャッシュ戦略のまとめ
        </Link>
        </div>
        <h2>天気アプリについて</h2>
        <div>
          <Link href="/weather-demos/weather-app" style={{ fontSize: '1.2rem', color: 'red', display: 'block' }}>
            天気アプリ
          </Link>
          <Link href="/weather-demos/summary" style={{ fontSize: '1.2rem', color: 'brown', display: 'block' }}>
            天気アプリ概要
          </Link>
        </div>
        <h2>ホテル検索アプリについて</h2>
        <div>
          <Link href="/hotel-search-demos/hotel-search-app" style={{ fontSize: '1.2rem', color: 'navy', display: 'block' }}>
            ホテル検索アプリ
          </Link>
          <Link href="/hotel-search-demos/summary" style={{ fontSize: '1.2rem', color: 'teal', display: 'block' }}>
            ホテル検索アプリ概要
          </Link>
        </div>
      </nav>
    </main>
  );
}

