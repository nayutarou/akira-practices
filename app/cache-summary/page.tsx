import Link from 'next/link'

export default function CacheSummaryPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Next.js キャッシュ戦略のまとめ</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>1. トップレベルキャッシュ (Full Route Cache)</h2>
        <p>
          Next.jsのApp Routerにおけるデフォルトのキャッシュ戦略です。ページ全体（HTML、CSS、JavaScriptなど）をビルド時に生成し、CDNなどにキャッシュします。ユーザーからのリクエストがあった際に、サーバーはキャッシュされた静的なファイルをそのまま返します。
        </p>
        <h3>使う場面:</h3>
        <ul>
          <li><strong>内容が頻繁に更新されないページ:</strong> ブログ記事、ニュース記事、製品紹介ページ、会社概要など。</li>
          <li><strong>SEOが重要なページ:</strong> 検索エンジンは静的に生成されたHTMLをクロールしやすいため、SEOに有利です。</li>
          <li><strong>パフォーマンスが最優先されるページ:</strong> リクエストごとにサーバーでレンダリングするオーバーヘッドがないため、非常に高速に表示されます。</li>
          <li><strong>サーバー負荷を軽減したい場合:</strong> サーバーは静的なファイルを返すだけなので、動的な処理が不要になり、サーバーへの負荷が大幅に軽減されます。</li>
        </ul>
        <p>
          <Link href="/top-cache">→ デモページで確認する</Link>
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>2. 関数キャッシュ (Data Cache)</h2>
        <p>
          <code>React.cache</code> を使用して、サーバーコンポーネント内で実行される非同期関数の結果を、<strong>単一のリクエストのライフサイクル内</strong>でキャッシュする機能です。同じリクエスト内で同じ関数が複数回呼び出されても、実際の処理は一度しか実行されず、2回目以降はキャッシュされた結果が返されます。
        </p>
        <h3>使う場面:</h3>
        <ul>
          <li><strong>同じリクエスト内で、複数の場所で同じデータを必要とする場合:</strong> データベースへのクエリなどを効率化します。</li>
          <li><strong>サーバーサイドでの重複するデータフェッチや計算を避けたい場合:</strong> 複雑な計算やAPI呼び出しの結果を、同じリクエスト内で再利用したい場合に有効です。</li>
          <li><strong>サーバーコンポーネントのレンダリングパフォーマンスを最適化したい場合:</strong> 特に、動的にレンダリングされるページで、サーバー側の処理を効率化するのに役立ちます。</li>
        </ul>
        <p>
          <Link href="/func-cache">→ デモページで確認する</Link>
        </p>
      </section>

      <section>
        <h2>まとめと使い分けのポイント</h2>
        <ul>
          <li><strong>トップレベルキャッシュ:</strong> ページ全体をキャッシュし、リクエスト間で再利用。静的なコンテンツや、ビルド時に内容が確定するページに最適。</li>
          <li><strong>関数キャッシュ:</strong> 関数呼び出しの結果をキャッシュし、単一のリクエスト内でのみ再利用。動的なページや、サーバーコンポーネント内でのデータフェッチ効率化に最適。</li>
        </ul>
        <p>両者は異なるレイヤーで機能し、互いに補完し合う関係にあります。ページの性質に応じて、適切なキャッシュ戦略を選択することが重要です。</p>
      </section>

      <p style={{ marginTop: '2rem' }}>
        <Link href="/">← トップページに戻る</Link>
      </p>
    </main>
  )
}
