import { getServerTime } from '@/lib/getTime'

// このコンポーネントはサーバーサイドでレンダリングされます
async function ComponentA() {
  const time = await getServerTime()
  return <p>ComponentA サーバー時間: {time}</p>
}

// このコンポーネントもサーバーサイドでレンダリングされます
async function ComponentB() {
  const time = await getServerTime()
  return <p>ComponentB サーバー時間: {time}</p>
}

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
