import { ReactNode } from 'react'

function CachedComponent({ children }: { children: ReactNode }) {
  'use cache'
  return <div>{children}</div>
}
