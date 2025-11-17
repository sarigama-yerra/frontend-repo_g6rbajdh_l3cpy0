import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-[#0a0f1f]">
      <div className="absolute inset-0 opacity-60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(59,130,246,0.25),transparent)]" />
      </div>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 px-6 text-center max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">FutureMe</h1>
        <p className="mt-4 text-slate-300">Design a life youre proud to grow into. Capture your vision, track smart goals, and check in with your future self.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="/onboarding" className="rounded-full bg-blue-500/90 hover:bg-blue-500 text-white px-5 py-2.5 transition">Get started</a>
          <a href="/dashboard" className="rounded-full border border-slate-700 text-slate-200 hover:bg-slate-800 px-5 py-2.5 transition">View demo</a>
        </div>
      </div>
    </section>
  )
}
