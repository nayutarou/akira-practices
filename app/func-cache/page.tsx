import { ComponentA, ComponentB } from './ui/time-components'

// このページを動的レンダリングに設定します。
// これにより、リクエストごとにページが再生成されます。
export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <div>
      <h1>動的レンダリング + 関数キャッシュ (Data Cache)</h1>
      <p>このページは、リクエストのたびにサーバーで再生成されます。</p>
      <p>ブラウザをリフレッシュすると、下の時間が更新されることが確認できます。</p>
      <p>
        しかし、サーバー側のコンソールログを見ると、時間は1回しか取得されていません。
      </p>
      <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'green' }}>
        <ComponentA />
      </p>
      <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'green' }}>
        <ComponentB />
      </p>
    </div>
  )
}
