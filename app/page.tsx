import Link from 'next/link';

export default function Page() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Next.js キャッシュデモ</h1>
      <p>以下のリンクから、異なるキャッシュ戦略の挙動を確認できます。</p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <Link href="/top-cache" style={{ fontSize: '1.2rem', color: 'blue' }}>
          1. トップレベルキャッシュ (Full Route Cache) のデモ
        </Link>
        <Link href="/func-cache" style={{ fontSize: '1.2rem', color: 'green' }}>
          2. 動的レンダリング + 関数キャッシュ (Data Cache) のデモ
        </Link>
        <Link href="/cache-summary" style={{ fontSize: '1.2rem', color: 'purple' }}>
          3. キャッシュ戦略のまとめ
        </Link>
      </nav>
    </main>
  );
}

