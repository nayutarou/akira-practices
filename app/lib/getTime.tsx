import { cache } from 'react'

// export async function getServerTime() {
//   console.log('🔄 getServerTime 実行')
//   return new Date().toISOString()
// }

// 日本時間を返して、format変化
export const getServerTime = cache(async (): Promise<string> => {
  const now = new Date()

  // 日本時間に変換（JST = UTC+9）
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000)

  // 見やすい形式にフォーマット
  const jpTime = jst.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: 'long', // 例: "7月"
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  console.log('🔄 getServerTimeJST 実行:', jpTime)
  return jpTime
})
