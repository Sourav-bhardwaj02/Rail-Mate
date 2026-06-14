import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Mail, Lock, Eye, EyeOff, User, Phone, Shield, AlertCircle, CheckCircle, Loader, ArrowLeft } from 'lucide-react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

const API = import.meta.env.VITE_API_URL

/* ── Input Field ── */
const Field: React.FC<{
  label: string; id: string; type?: string; placeholder: string
  value: string; onChange: (v: string) => void; icon: React.ReactNode
  hint?: string; suffix?: React.ReactNode
}> = ({ label, id, type = 'text', placeholder, value, onChange, icon, hint, suffix }) => (
  <div style={{ marginBottom: 16 }}>
    <label htmlFor={id} style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>{icon}</span>
      <input
        id={id} type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)} autoComplete="off"
        style={{ width: '100%', background: '#1A1C22', border: '1px solid #2A2D35', borderRadius: 10, padding: '11px 40px 11px 40px', color: '#F8FAFC', fontSize: 13, outline: 'none', transition: 'border 0.2s' }}
        onFocus={e => e.target.style.borderColor = '#7C3AED'}
        onBlur={e => e.target.style.borderColor = '#2A2D35'}
      />
      {suffix && <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)' }}>{suffix}</span>}
    </div>
    {hint && <div style={{ fontSize: 10.5, color: '#64748B', marginTop: 5 }}>{hint}</div>}
  </div>
)

const AuthPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setLoggedIn } = useAppStore()

  const [tab, setTab] = useState<'login' | 'signup'>(location.state?.tab === 'signup' ? 'signup' : 'login')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass, setLoginPass] = useState('')

  // Signup fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [guardianName, setGuardianName] = useState('')
  const [guardianEmail, setGuardianEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    setLoading(true)
    try {
      // Admin shortcut
      if (loginEmail === 'Admin@123' && loginPass === '12345678') {
        setLoggedIn(true, 'admin')
        navigate('/admin')
        return
      }
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setLoggedIn(true, data.user.id)
        navigate('/route-planner')
      } else {
        setMsg({ type: 'error', text: data.error || 'Invalid credentials. Try again.' })
      }
    } catch {
      setMsg({ type: 'error', text: 'Cannot connect to server. Make sure backend is running.' })
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    if (pass !== confirm) { setMsg({ type: 'error', text: 'Passwords do not match.' }); return }
    if (pass.length < 8) { setMsg({ type: 'error', text: 'Password must be at least 8 characters.' }); return }
    if (!/[A-Z]/.test(pass)) { setMsg({ type: 'error', text: 'Password must contain at least one uppercase letter.' }); return }
    if (!/[0-9]/.test(pass)) { setMsg({ type: 'error', text: 'Password must contain at least one number.' }); return }
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pass, phone: phone || undefined, guardianEmail: guardianEmail || undefined })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        // Also save guardian name if provided
        if (guardianName && data.user?.id) {
          await fetch(`${API}/api/auth/guardian`, {
            method: 'PATCH', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: data.user.id, guardianName, guardianEmail })
          })
        }
        setMsg({ type: 'success', text: 'Account created! Redirecting…' })
        setLoggedIn(true, data.user.id)
        setTimeout(() => navigate('/route-planner'), 1000)
      } else {
        setMsg({ type: 'error', text: data.error || 'Registration failed.' })
      }
    } catch {
      setMsg({ type: 'error', text: 'Cannot connect to server. Make sure backend is running.' })
    } finally {
      setLoading(false)
    }
  }

  const eyeBtn = (show: boolean, toggle: () => void) => (
    <button type="button" onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#64748B' }}>
      {show ? <EyeOff size={15} /> : <Eye size={15} />}
    </button>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0D0E12', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* Back to home */}
      <Link to="/" style={{ position: 'fixed', top: 24, left: 24, display: 'flex', alignItems: 'center', gap: 6, color: '#94A3B8', textDecoration: 'none', fontSize: 13, fontWeight: 500, zIndex: 10 }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div style={{ width: '100%', maxWidth: 460 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid #7C3AED', background: '#1A1C22', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <Bot size={26} color="#A78BFA" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC', marginBottom: 4, fontFamily: 'Georgia, serif' }}>RailMate AI</h1>
          <p style={{ fontSize: 13, color: '#64748B' }}>Intelligent transit, accessible for everyone.</p>
        </div>

        {/* Card */}
        <div style={{ background: '#13141A', borderRadius: 16, border: '1px solid #1E2028', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', overflow: 'hidden' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #1E2028' }}>
            {(['login', 'signup'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setMsg(null) }}
                style={{ flex: 1, padding: '16px', fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                  background: tab === t ? '#1A1C22' : 'transparent',
                  color: tab === t ? '#F8FAFC' : '#64748B',
                  borderBottom: tab === t ? '2px solid #7C3AED' : '2px solid transparent'
                }}>
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <div style={{ padding: '28px 28px 24px' }}>
            {/* Message Banner */}
            <AnimatePresence>
              {msg && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', borderRadius: 10, marginBottom: 20,
                    background: msg.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                    border: `1px solid ${msg.type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
                  }}>
                  {msg.type === 'error' ? <AlertCircle size={15} color="#EF4444" style={{ flexShrink: 0, marginTop: 1 }} /> : <CheckCircle size={15} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />}
                  <span style={{ fontSize: 12.5, color: msg.type === 'error' ? '#FCA5A5' : '#6EE7B7', lineHeight: 1.5 }}>{msg.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── LOGIN FORM ── */}
            {tab === 'login' && (
              <form onSubmit={handleLogin}>
                <Field id="l-email" label="Email Address" type="email" placeholder="you@example.com"
                  value={loginEmail} onChange={setLoginEmail} icon={<Mail size={15} color="#64748B" />} />
                <Field id="l-pass" label="Password" type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  value={loginPass} onChange={setLoginPass} icon={<Lock size={15} color="#64748B" />}
                  suffix={eyeBtn(showPass, () => setShowPass(!showPass))} />

                <div style={{ textAlign: 'right', marginTop: -8, marginBottom: 20 }}>
                  <a href="#" style={{ fontSize: 12, color: '#7C3AED', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
                </div>

                <button type="submit" disabled={loading || !loginEmail || !loginPass}
                  style={{ width: '100%', background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', color: '#FFF', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading || !loginEmail || !loginPass ? 0.7 : 1, transition: 'opacity 0.2s' }}>
                  {loading ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : null}
                  {loading ? 'Signing in…' : 'Sign In →'}
                </button>

                <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12.5, color: '#64748B' }}>
                  No account?{' '}
                  <button type="button" onClick={() => setTab('signup')} style={{ background: 'none', border: 'none', color: '#A78BFA', cursor: 'pointer', fontWeight: 600, fontSize: 12.5 }}>
                    Create one free
                  </button>
                </div>

                {/* Admin hint */}
                <div style={{ marginTop: 20, padding: '10px 14px', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.1)', borderRadius: 8, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <AlertCircle size={13} color="#38BDF8" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.6 }}>
                    <strong style={{ color: '#CBD5E1' }}>Admin access:</strong> Email <code style={{ background: '#1E2028', padding: '1px 5px', borderRadius: 4 }}>Admin@123</code> / Password <code style={{ background: '#1E2028', padding: '1px 5px', borderRadius: 4 }}>12345678</code>
                  </div>
                </div>
              </form>
            )}

            {/* ── SIGNUP FORM ── */}
            {tab === 'signup' && (
              <form onSubmit={handleSignup}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <Field id="s-name" label="Full Name" placeholder="Rahul Sharma"
                    value={name} onChange={setName} icon={<User size={15} color="#64748B" />} />
                  <Field id="s-phone" label="Phone (optional)" placeholder="+91 98765 43210"
                    value={phone} onChange={setPhone} icon={<Phone size={15} color="#64748B" />} />
                </div>

                <Field id="s-email" label="Email Address" type="email" placeholder="you@example.com"
                  value={email} onChange={setEmail} icon={<Mail size={15} color="#64748B" />} />

                <Field id="s-pass" label="Password" type={showPass ? 'text' : 'password'} placeholder="Min 8 chars, 1 uppercase, 1 number"
                  value={pass} onChange={setPass} icon={<Lock size={15} color="#64748B" />}
                  suffix={eyeBtn(showPass, () => setShowPass(!showPass))} />

                <Field id="s-confirm" label="Confirm Password" type={showConfirm ? 'text' : 'password'} placeholder="Re-enter password"
                  value={confirm} onChange={setConfirm} icon={<Lock size={15} color="#64748B" />}
                  suffix={eyeBtn(showConfirm, () => setShowConfirm(!showConfirm))} />

                {/* Guardian Section */}
                <div style={{ borderTop: '1px solid #1E2028', paddingTop: 16, marginTop: 4, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <Shield size={14} color="#A78BFA" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Emergency Guardian</span>
                    <span style={{ fontSize: 10, color: '#64748B' }}>(optional)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <Field id="s-gname" label="Guardian Name" placeholder="Parent / Spouse"
                      value={guardianName} onChange={setGuardianName} icon={<User size={15} color="#64748B" />} />
                    <Field id="s-gemail" label="Guardian Email" type="email" placeholder="guardian@email.com"
                      value={guardianEmail} onChange={setGuardianEmail} icon={<Mail size={15} color="#64748B" />}
                      hint="Notified automatically when you trigger SOS" />
                  </div>
                </div>

                <button type="submit" disabled={loading || !name || !email || !pass || !confirm}
                  style={{ width: '100%', background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', color: '#FFF', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading || !name || !email || !pass || !confirm ? 0.7 : 1, transition: 'opacity 0.2s' }}>
                  {loading ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : null}
                  {loading ? 'Creating account…' : 'Create Account →'}
                </button>

                <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12.5, color: '#64748B' }}>
                  Already have an account?{' '}
                  <button type="button" onClick={() => setTab('login')} style={{ background: 'none', border: 'none', color: '#A78BFA', cursor: 'pointer', fontWeight: 600, fontSize: 12.5 }}>
                    Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 11, color: '#374151' }}>
          © 2024 RailMate AI · By using this service you agree to our Terms of Service
        </p>
      </div>

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  )
}

export default AuthPage
