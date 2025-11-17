import React, { useRef } from 'react'

export default function ShareCard({ vision, goals }) {
  const ref = useRef(null)

  async function download() {
    const node = ref.current
    const svg = new XMLSerializer().serializeToString(node)
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'futureme-share-card.svg'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mt-6">
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950">
        <svg ref={ref} width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
          <rect width="1200" height="630" fill="#0b1220" />
          <circle cx="1000" cy="-50" r="300" fill="url(#g1)" opacity="0.35" />
          <text x="60" y="100" fontSize="42" fontWeight="700" fill="#e5e7eb">FutureMe Vision</text>
          <text x="60" y="160" fontSize="24" fill="#a7b0c0">{vision?.timeline || ''} · {vision?.career || ''}</text>
          <foreignObject x="60" y="200" width="1080" height="240">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: '#cbd5e1', fontSize: 22, lineHeight: 1.4 }}>
              {vision?.summary}
            </div>
          </foreignObject>
          <text x="60" y="490" fontSize="26" fontWeight="600" fill="#9dd0ff">Top Goals</text>
          {(goals || []).slice(0, 3).map((g, i) => (
            <text key={i} x="60" y={530 + i * 32} fontSize="22" fill="#d1d5db">• {g.title} — {g.progress || 0}%</text>
          ))}
        </svg>
      </div>
      <button onClick={download} className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white">Download Share Card</button>
    </div>
  )
}
