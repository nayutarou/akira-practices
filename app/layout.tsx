import { ReactNode } from 'react'

'use cache'
 
export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
