import { ComponentA, ComponentB } from './ui/time-components'

export default async function Page() {
  return (
    <div>
      <p>Func Cache ページ</p>
      <p>このページでは、複数のコンポーネントが同じサーバー時間を取得しています。</p>
      <p>React.cacheにより、サーバーコンソールのログは1回しか表示されません。</p>
      <br />
      <ComponentA />
      <ComponentB />
    </div>
  )
}
