// app/layout-top-cache.tsx
'use cache'  // ファイル全体にキャッシュを適用

import { ReactNode } from 'react'

export default function LayoutTopCache({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: '2px solid blue', padding: 16 }}>
      <h2>ファイルトップに 'use cache'</h2>
      {children}
    </div>
  )
}
