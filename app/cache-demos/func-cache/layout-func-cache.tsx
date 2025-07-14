'use client'

import { ReactNode } from 'react'

export default function FuncCacheLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: '2px solid green', padding: 16 }}>
      <h2>FuncCacheLayout (use client)</h2>
      {children}
    </div>
  )
}
