import { getServerTime } from '@/lib/getTime'

// このコンポーネントはサーバーサイドでレンダリングされます
export async function ComponentA() {
  const time = await getServerTime()
  return <p>ComponentA サーバー時間: {time}</p>
}

// このコンポーネントもサーバーサイドでレンダリングされます
export async function ComponentB() {
  const time = await getServerTime()
  return <p>ComponentB サーバー時間: {time}</p>
}
