'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import './login.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMouse({ x: e.clientX, y: e.clientY })
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, callbackUrl: '/dashboard', redirect: false })
    setLoading(false)
    if (res?.error) {
      setError('Invalid email or password.')
    } else {
      window.location.href = '/dashboard'
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
            <circle cx="28" cy="28" r="28" fill="#6366F1" opacity="0.25"/>
            <path d="M28 33c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" fill="#6366F1"/>
          </svg>
          <h2 className="login-title">Welcome Back</h2>
          <p className="text-gray-700 text-sm">Login to your account</p>
        </div>
        <form onSubmit={handleLogin}>
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
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
            required
            autoComplete="current-password"
          />
          {error && <div className="login-error">{error}</div>}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-700">
          Don&apos;t have an account?{' '}
          <a href="/register" className="login-link">Register</a>
        </div>
      </div>
    </div>
  )
}