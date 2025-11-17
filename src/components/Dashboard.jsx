import React, { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function Ring({ value }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  return (
    <svg width="72" height="72" className="drop-shadow">
      <circle cx="36" cy="36" r={radius} stroke="#1f2937" strokeWidth="8" fill="none" />
      <circle cx="36" cy="36" r={radius} stroke="#60a5fa" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 600ms ease' }} />
      <text x="36" y="41" textAnchor="middle" fill="#e5e7eb" fontSize="14" fontWeight="600">{value}%</text>
    </svg>
  )
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [vision, setVision] = useState(null)
  const [goals, setGoals] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('fm_user') || 'null')
    setUser(u)
    if (!u) return
    fetch(`${API}/api/vision?user_id=${u.id}`).then(r => r.json()).then(setVision)
    fetch(`${API}/api/goals?user_id=${u.id}`).then(r => r.json()).then(setGoals)
  }, [])

  async function addGoal() {
    if (!title) return
    const res = await fetch(API + '/api/goals', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user?.id || 'demo', title })
    })
    const data = await res.json()
    setGoals(g => [data, ...g])
    setTitle('')
  }

  async function updateGoal(id, patch) {
    const res = await fetch(API + '/api/goals/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(patch) })
    const data = await res.json()
    setGoals(gs => gs.map(g => g.id === id ? data : g))
  }

  async function removeGoal(id) {
    await fetch(API + '/api/goals/' + id, { method: 'DELETE' })
    setGoals(gs => gs.filter(g => g.id !== id))
  }

  return (
    <section className="min-h-[70vh] px-6 py-8 bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Active Vision</h2>
          {!vision?.summary ? (
            <p className="text-slate-400 mt-2">No vision yet. <a href="/vision" className="text-blue-400">Create one</a>.</p>
          ) : (
            <div className="mt-3 rounded-xl bg-slate-900/60 border border-slate-800 p-4">
              <p className="text-slate-200">{vision.summary}</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Goals</h3>
          <div className="flex gap-2">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a SMART goal" className="flex-1 rounded-lg bg-slate-900 border border-slate-800 px-3 py-2" />
            <button onClick={addGoal} className="rounded-lg bg-blue-600 px-4">Add</button>
          </div>
          <ul className="mt-4 space-y-3">
            {goals.map(g => (
              <li key={g.id} className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 flex items-center gap-4">
                <Ring value={g.progress || 0} />
                <div className="flex-1">
                  <input className="w-full bg-transparent text-slate-100 font-medium" value={g.title} onChange={e => updateGoal(g.id, { title: e.target.value })} />
                  <input className="w-full bg-transparent text-slate-400 text-sm" placeholder="Notes" value={g.description || ''} onChange={e => updateGoal(g.id, { description: e.target.value })} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" min={0} max={100} value={g.progress || 0} onChange={e => updateGoal(g.id, { progress: parseInt(e.target.value || '0') })} className="w-16 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-right" />
                  <button onClick={() => removeGoal(g.id)} className="text-slate-400 hover:text-red-400">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
