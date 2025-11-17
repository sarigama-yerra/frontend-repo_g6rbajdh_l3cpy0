import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function VisionForm() {
  const [step, setStep] = useState(1)
  const [career, setCareer] = useState('')
  const [lifestyle, setLifestyle] = useState('')
  const [timeline, setTimeline] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const user = JSON.parse(localStorage.getItem('fm_user') || '{}')

  async function submit() {
    setLoading(true)
    try {
      const res = await fetch(API + '/api/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id || 'demo', career, lifestyle, timeline })
      })
      const data = await res.json()
      setResult(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="px-6 py-8 bg-slate-950 text-slate-100">
      <div className="max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Create your vision</h3>
        {!result ? (
          <div className="space-y-6">
            {step === 1 && (
              <div>
                <label className="block mb-2 text-slate-300">Career</label>
                <input value={career} onChange={e => setCareer(e.target.value)} className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" placeholder="e.g., Senior Product Designer" />
              </div>
            )}
            {step === 2 && (
              <div>
                <label className="block mb-2 text-slate-300">Lifestyle</label>
                <input value={lifestyle} onChange={e => setLifestyle(e.target.value)} className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" placeholder="e.g., Remote-first, flexible, family time" />
              </div>
            )}
            {step === 3 && (
              <div>
                <label className="block mb-2 text-slate-300">Timeline</label>
                <input value={timeline} onChange={e => setTimeline(e.target.value)} className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" placeholder="e.g., 12 months" />
              </div>
            )}
            <div className="flex justify-between">
              <button onClick={() => setStep(Math.max(1, step - 1))} className="px-4 py-2 rounded-lg border border-slate-700">Back</button>
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="px-4 py-2 rounded-lg bg-blue-600">Next</button>
              ) : (
                <button onClick={submit} disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600">{loading ? 'Generating…' : 'Generate Vision'}</button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Summary</h4>
            <p className="text-slate-300">{result.summary}</p>
            <h4 className="text-lg font-semibold mt-4">Milestones</h4>
            <ul className="list-disc pl-5 text-slate-300">
              {result.milestones?.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
            <p className="text-slate-400 italic">{result.emotional_impact}</p>
            <a href="/dashboard" className="inline-block mt-4 rounded-lg bg-blue-600 px-4 py-2">Continue to dashboard</a>
          </div>
        )}
      </div>
    </section>
  )
}
