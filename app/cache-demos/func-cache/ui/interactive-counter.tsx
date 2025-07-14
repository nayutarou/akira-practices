'use client'

import { useState } from 'react'

export default function InteractiveCounter() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '2rem', borderRadius: '8px' }}>
      <h3>クライアントサイドカウンター</h3>
      <p>このカウンターはブラウザ上で動作します。</p>
      <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>カウント: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        カウントアップ
      </button>
    </div>
  )
}
