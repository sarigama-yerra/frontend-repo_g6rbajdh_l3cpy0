import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const res = await fetch(API + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Request failed')
      localStorage.setItem('fm_token', data.token)
      localStorage.setItem('fm_user', JSON.stringify(data.user))
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function googleAuth() {
    setLoading(true)
    setError('')
    try {
      const id_token = Math.random().toString(36).slice(2)
      const res = await fetch(API + '/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Google auth failed')
      localStorage.setItem('fm_token', data.token)
      localStorage.setItem('fm_user', JSON.stringify(data.user))
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-6">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/50 border border-slate-800 p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-blue-400 hover:text-blue-300 text-sm">
            {mode === 'login' ? 'New here? Sign up' : 'Have an account? Log in'}
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-slate-300 text-sm mb-1">Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg bg-slate-800 text-white px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
          )}
          <div>
            <label className="block text-slate-300 text-sm mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg bg-slate-800 text-white px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg bg-slate-800 text-white px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button disabled={loading} className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white py-2 transition">
            {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}
          </button>
        </form>
        <div className="mt-4">
          <button onClick={googleAuth} disabled={loading} className="w-full rounded-lg border border-slate-700 text-slate-200 py-2 hover:bg-slate-800 transition">Continue with Google</button>
        </div>
      </div>
    </section>
  )
}
