import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Hero from './components/Hero'
import Auth from './components/Auth'
import VisionForm from './components/VisionForm'
import Dashboard from './components/Dashboard'
import Chat from './components/Chat'

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-white font-semibold">FutureMe</Link>
        <nav className="flex items-center gap-3 text-slate-300">
          <a href="/vision" className="hover:text-white">Vision</a>
          <a href="/dashboard" className="hover:text-white">Dashboard</a>
          <a href="/chat" className="hover:text-white">Chat</a>
          <a href="/onboarding" className="rounded-full bg-blue-600 px-3 py-1.5 text-white">Sign in</a>
        </nav>
      </header>
      {children}
      <footer className="px-6 py-10 text-center text-slate-500">© {new Date().getFullYear()} FutureMe</footer>
    </div>
  )
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Shell><Hero /></Shell>} />
      <Route path="/onboarding" element={<Shell><Auth /></Shell>} />
      <Route path="/vision" element={<Shell><VisionForm /></Shell>} />
      <Route path="/dashboard" element={<Shell><Dashboard /></Shell>} />
      <Route path="/chat" element={<Shell><Chat /></Shell>} />
    </Routes>
  )
}
