import { ReactNode } from 'react'

export default async function TopCacheLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: '2px solid blue', padding: 16 }}>
      <h2>TopCacheLayout (サーバーコンポーネント)</h2>
      {children}
    </div>
  )
}
