import { ReactNode } from 'react'

export default async function FuncCacheLayout({ children }: { children: ReactNode }) {
  'use cache'

  return (
    <div style={{ border: '2px solid green', padding: 16 }}>
      <h2>FuncCacheLayout (use cache: 関数内 async)</h2>
      {children}
    </div>
  )
}
