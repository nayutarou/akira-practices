import Link from 'next/link'

export default function FolderStructureGuidePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Next.js `app` ディレクトリのフォルダ構造ガイド</h1>
      <p>Next.js の `app` ディレクトリ内では、プロジェクトの規模や複雑さに応じて様々なフォルダ構造が採用されます。ここでは、よく使われるフォルダやファイルの役割について解説します。</p>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Next.js 特有のファイル</h2>
        <ul>
          <li>
            <strong><code>page.tsx</code> (または <code>.js</code>, <code>.jsx</code>):</strong>
            <p>ルーティングされたパスに対応するUIをレンダリングするファイルです。各ルートセグメントに必須です。</p>
          </li>
          <li>
            <strong><code>layout.tsx</code>:</strong>
            <p>子ルートセグメントや子ページで共有されるUIを定義します。ネストされたレイアウトを作成できます。</p>
          </li>
          <li>
            <strong><code>loading.tsx</code>:</strong>
            <p>ルートセグメントのコンテンツがロードされている間に表示されるUIを定義します。</p>
          </li>
          <li>
            <strong><code>error.tsx</code>:</strong>
            <p>ルートセグメントとその子セグメントで発生したエラーを捕捉し、フォールバックUIを表示します。</p>
          </li>
          <li>
            <strong><code>not-found.tsx</code>:</strong>
            <p>ルートセグメント内で <code>notFound()</code> 関数が呼び出されたときに表示されるUIを定義します。</p>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>一般的なフォルダ</h2>
        <ul>
          <li>
            <strong><code>components/</code>:</strong>
            <p>アプリケーション全体で再利用されるUIコンポーネントを格納します。これらは、状態を持つもの、ロジックを含むもの、複数のUI要素を組み合わせたものなど、比較的汎用的なコンポーネントが多いです。</p>
            <p>例: <code>Button.tsx</code>, <code>Header.tsx</code>, <code>UserCard.tsx</code></p>
          </li>
          <li>
            <strong><code>ui/</code>:</strong>
            <p>より純粋な「見た目」に特化したUIコンポーネントを格納します。これらは通常、状態を持たず、親から渡されたプロパティに基づいてUIをレンダリングするだけの「プレゼンテーションコンポーネント」です。デザインシステムの一部となるような、再利用性の高い基本的な要素が多いです。</p>
            <p>例: <code>Input.tsx</code>, <code>Avatar.tsx</code>, <code>Badge.tsx</code></p>
          </li>
          <li>
            <strong><code>lib/</code>:</strong>
            <p>データフェッチ、API呼び出し、データベース操作、認証ロジックなど、サーバーサイドで実行されるビジネスロジックやユーティリティ関数を格納します。サーバーコンポーネントから直接呼び出されることが多いです。</p>
            <p>例: <code>db.ts</code>, <code>auth.ts</code>, <code>data.ts</code></p>
          </li>
          <li>
            <strong><code>hooks/</code>:</strong>
            <p>カスタムReactフックを格納します。コンポーネント間でロジックを再利用可能にするために使用されます。</p>
            <p>例: <code>useAuth.ts</code>, <code>useForm.ts</code></p>
          </li>
          <li>
            <strong><code>styles/</code>:</strong>
            <p>グローバルスタイル、CSSモジュール、Tailwind CSSの設定ファイルなど、スタイリングに関連するファイルを格納します。</p>
            <p>例: <code>globals.css</code>, <code>variables.css</code></p>
          </li>
          <li>
            <strong><code>utils/</code>:</strong>
            <p>日付フォーマット、文字列操作、バリデーションなど、アプリケーション全体で利用される汎用的なユーティリティ関数を格納します。クライアントサイドでもサーバーサイドでも使用される可能性があります。</p>
            <p>例: <code>formatDate.ts</code>, <code>validateEmail.ts</code></p>
          </li>
          <li>
            <strong><code>types/</code>:</strong>
            <p>TypeScriptの型定義ファイルを格納します。アプリケーション全体で共有されるインターフェースや型エイリアスなどです。</p>
            <p>例: <code>user.ts</code>, <code>post.ts</code></p>
          </li>
          <li>
            <strong><code>constants/</code>:</strong>
            <p>アプリケーション全体で利用される定数を格納します。APIエンドポイント、マジックナンバー、設定値などです。</p>
            <p>例: <code>api.ts</code>, <code>app.ts</code></p>
          </li>
          <li>
            <strong><code>config/</code>:</strong>
            <p>アプリケーションの設定ファイルや環境変数に関連するファイルを格納します。</p>
            <p>例: <code>firebase.ts</code>, <code>stripe.ts</code></p>
          </li>
          <li>
            <strong><code>api/</code>:</strong>
            <p>App Routerでは直接APIルートを定義する代わりに、ルートハンドラ（<code>route.ts</code>）を使用することが多いですが、従来のAPIルート（<code>pages/api</code>）のような役割を持つファイルをまとめるためにこのフォルダを使用することもあります。</p>
          </li>
        </ul>
      </section>

      <p style={{ marginTop: '2rem' }}>
        <Link href="/">← トップページに戻る</Link>
      </p>
    </main>
  )
}
