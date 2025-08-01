'use client'
import { useState } from 'react'
import '../login/login.css' // Reuse the login theme for consistency

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMouse({ x: e.clientX, y: e.clientY })
  }

  const handleRegister = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    setLoading(false)
    if (res.ok) {
      setSuccess('User registered! You can now login.')
      setEmail('')
      setPassword('')
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data?.error || 'Registration failed.')
    }
  }

  return (
    <div className="login-bg" onMouseMove={handleMouseMove}>
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />
      <div className="blob blob4" />
      <div className="blob blob5" />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.15) 0%, transparent 80%)`
        }}
      />
      <div className="login-card">
        <div className="flex flex-col items-center mb-6">
          <svg width="56" height="56" fill="none" className="mb-2 drop-shadow-lg">
            <circle cx="28" cy="28" r="28" fill="#f472b6" opacity="0.25"/>
            <path d="M28 33c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" fill="#f472b6"/>
          </svg>
          <h2 className="login-title" style={{ background: 'linear-gradient(90deg, #f472b6, #6366f1, #fde047)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Create Account</h2>
          <p className="text-gray-700 text-sm">Register to get started</p>
        </div>
        <form onSubmit={handleRegister}>
          <label className="login-label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="login-input"
            required
            autoComplete="username"
          />
          <label className="login-label">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
            required
            autoComplete="new-password"
          />
          {error && <div className="login-error">{error}</div>}
          {success && <div className="text-green-600 text-center font-medium mb-2">{success}</div>}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{' '}
          <a href="/login" className="login-link">Login</a>
        </div>
      </div>
    </div>
  )
}
