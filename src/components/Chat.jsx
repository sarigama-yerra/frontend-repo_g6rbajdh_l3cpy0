import React, { useEffect, useRef, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Chat() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hey! I\'m your Future Self. What\'s one tiny step you can take today?' }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  async function send() {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTyping(true)
    const res = await fetch(API + '/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: 'demo', message: userMsg.content }) })
    const data = await res.json()
    // Simulate streaming
    const text = data.reply || ''
    let sofar = ''
    for (let i = 0; i < text.length; i++) {
      await new Promise(r => setTimeout(r, 12))
      sofar += text[i]
      setMessages(m => {
        const base = m.filter(msg => msg.role !== 'assistant_pending')
        return [...base, { role: 'assistant_pending', content: sofar }]
      })
    }
    setMessages(m => [...m.filter(msg => msg.role !== 'assistant_pending'), { role: 'assistant', content: text }])
    setTyping(false)
  }

  return (
    <section className="min-h-[70vh] bg-slate-950 text-slate-100 flex flex-col">
      <div ref={listRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[80%] rounded-2xl px-4 py-2 ${m.role.startsWith('assistant') ? 'bg-slate-800 text-slate-100' : 'bg-blue-600 ml-auto'}`}>
            {m.content}
          </div>
        ))}
        {typing && <div className="w-14 rounded-full bg-slate-800/60 px-3 py-2 text-slate-300 text-sm">typing…</div>}
      </div>
      <div className="px-4 pb-6">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Message your future self" className="flex-1 rounded-xl bg-slate-900 border border-slate-800 px-4 py-3" />
          <button onClick={send} className="rounded-xl bg-blue-600 px-5">Send</button>
        </div>
      </div>
    </section>
  )
}
