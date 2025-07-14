// app/layout-func-cache.tsx
import { ReactNode } from 'react'

export default function LayoutFuncCache({ children }: { children: ReactNode }) {
  'use cache'  // この関数だけにキャッシュ適用

  return (
    <div style={{ border: '2px solid green', padding: 16 }}>
      <h2>関数内に 'use cache'</h2>
      {children}
    </div>
  )
}
