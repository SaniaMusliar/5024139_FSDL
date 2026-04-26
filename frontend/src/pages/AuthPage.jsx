import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { login as loginAPI, register as registerAPI } from '../api'
import './Auth.css'

const AuthPage = () => {
  const { login } = useAuth()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      let res
      if (mode === 'login') {
        res = await loginAPI({ email: form.email, password: form.password })
      } else {
        if (!form.name.trim()) { setError('Name is required.'); setLoading(false); return }
        res = await registerAPI(form)
      }
      login(res.data.token, res.data.user)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = () => {
    setForm({ name: '', email: 'demo@expiryguard.com', password: 'demo1234' })
    setMode('login')
  }

  return (
    <div className="auth-root">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo-wrap">
            <span className="auth-logo-icon">🛡️</span>
          </div>
          <h1>ExpiryGuard</h1>
          <p>Smart food expiry tracking for zero waste living.</p>
        </div>
        <div className="auth-features">
          {[
            { icon: '📊', title: 'Real-time Analytics', desc: 'Track waste metrics and expiry patterns at a glance.' },
            { icon: '🔔', title: 'Expiry Alerts', desc: "Know exactly what needs attention before it's too late." },
            { icon: '♻️', title: 'Waste Reduction', desc: 'Save money and the planet by managing food smarter.' },
          ].map((f, i) => (
            <div className="auth-feature" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
              <span className="auth-feature-icon">{f.icon}</span>
              <div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card fade-in">
          <div className="auth-card-header">
            <div className="auth-mobile-logo">🛡️ <span>ExpiryGuard</span></div>
            <h2>{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>
            <p>{mode === 'login' ? 'Sign in to your dashboard' : 'Start tracking your food today'}</p>
          </div>

          <div className="auth-toggle">
            <button className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setError('') }}>Sign In</button>
            <button className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setError('') }}>Sign Up</button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'register' && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrap">
                  <span className="input-icon">👤</span>
                  <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                </div>
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">✉️</span>
                <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input type="password" name="password" placeholder={mode === 'login' ? 'Your password' : 'Min. 6 characters'} value={form.password} onChange={handleChange} required minLength={6} />
              </div>
            </div>

            {error && <div className="auth-error"><span>⚠️</span> {error}</div>}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : null}
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <button className="auth-demo-btn" onClick={fillDemo}>⚡ Use demo account</button>

          <p className="auth-switch">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}>
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
