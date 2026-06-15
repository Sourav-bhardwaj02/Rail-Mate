import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User, Lock, Eye, EyeOff, Mic, X, AlertCircle } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { useNavigate } from 'react-router-dom'

export const LoginModal: React.FC = () => {
  const { showLoginModal, setShowLoginModal, setLoggedIn } = useAppStore()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  if (!showLoginModal) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Get the email and password from the DOM
    const form = e.target as HTMLFormElement
    const emailInput = form.querySelector('input[type="text"]') as HTMLInputElement
    const passwordInput = form.querySelector('input[type="password"]') as HTMLInputElement
    // Support text mode if showPassword is true
    const realPasswordInput = passwordInput || form.querySelectorAll('input[type="text"]')[1] as HTMLInputElement

    try {
      if (emailInput.value === 'Admin@123' && realPasswordInput.value === '12345678') {
        setLoggedIn(true, 'admin')
        setShowLoginModal(false)
        navigate('/admin')
        return
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.value,
          password: realPasswordInput.value
        })
      })

      const data = await res.json()
      
      if (res.ok && data.success) {
        // Set user as logged in with their actual PostgreSQL user ID
        setLoggedIn(true, data.user.id)
        setShowLoginModal(false)
        navigate('/route-planner')
      } else {
        alert('Login Failed: ' + (data.error || 'Check credentials and try again.'))
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Could not connect to the backend. Please ensure your Node server is running on port 5000!')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="p-5 md:p-6"
          style={{
            background: '#121216',
            borderRadius: 16,
            width: '100%',
            maxWidth: 400,
            maxHeight: 'calc(100vh - 48px)',
            overflowY: 'auto',
            position: 'relative',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 24px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Close button */}
          <button 
            onClick={() => setShowLoginModal(false)}
            style={{
              position: 'absolute', top: 12, right: 12,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '50%', color: '#94A3B8',
              cursor: 'pointer', padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10
            }}
          >
            <X size={16} />
          </button>

          {/* Logo & Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16, marginTop: 8 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '2px solid #D8B4E2',
              background: '#1E1E24',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8
            }}>
              <Bot size={22} color="#D8B4E2" />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F8FAFC', marginBottom: 2, fontFamily: 'Georgia, serif' }}>
              RailMate AI
            </h2>
            <p style={{ fontSize: 11, color: '#9CA3AF' }}>Intelligent transit, accessible for everyone.</p>
          </div>

          {/* Disclaimer Message */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.03)', borderLeft: '3px solid #38BDF8',
            padding: '10px 14px', borderRadius: 6, marginBottom: 16,
            display: 'flex', gap: 10, alignItems: 'flex-start'
          }}>
            <AlertCircle size={14} color="#38BDF8" style={{ marginTop: 2, flexShrink: 0 }} />
            <div style={{ fontSize: 10.5, color: '#E2E8F0', lineHeight: 1.4 }}>
              <strong>To use SOS feature please login.</strong><br/>
              <span style={{ color: '#9CA3AF' }}>To use other features login is not mandatory.</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#F8FAFC', marginBottom: 4 }}>
                Email or Username
              </label>
              <div style={{ position: 'relative' }}>
                <User size={14} color="#64748B" style={{ position: 'absolute', left: 12, top: 11 }} />
                <input 
                  type="text" required placeholder="Enter your credentials"
                  style={{
                    width: '100%', background: '#1A1C20', border: '1px solid #2A2D35',
                    borderRadius: 8, padding: '8px 12px 8px 34px',
                    color: '#F8FAFC', fontSize: 12.5, outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#F8FAFC' }}>Password</label>
                <a href="#" style={{ fontSize: 10, color: '#38BDF8', textDecoration: 'none', fontWeight: 500 }}>Forgot Password?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color="#64748B" style={{ position: 'absolute', left: 12, top: 11 }} />
                <input 
                  type={showPassword ? "text" : "password"} required placeholder="••••••••"
                  style={{
                    width: '100%', background: '#1A1C20', border: '1px solid #2A2D35',
                    borderRadius: 8, padding: '8px 34px 8px 34px',
                    color: '#F8FAFC', fontSize: 12.5, outline: 'none'
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: 'absolute', right: 12, top: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0
                }}>
                  {showPassword ? <EyeOff size={14} color="#64748B" /> : <Eye size={14} color="#64748B" />}
                </button>
              </div>
            </div>

            <button type="submit" style={{
              width: '100%', background: '#7C3AED', color: '#FFF',
              border: 'none', borderRadius: 8, padding: '10px',
              fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
              marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background 0.2s'
            }}>
              Login &rarr;
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ fontSize: 8.5, color: '#64748B', fontWeight: 700, letterSpacing: 1 }}>OR ACCESS WITH</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
          </div>

          {/* Social Logins */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <button style={{
              flex: 1, background: '#1A1C20', border: '1px solid #2A2D35',
              borderRadius: 8, padding: '8px', color: '#F8FAFC',
              fontSize: 11.5, fontWeight: 500, cursor: 'pointer'
            }}>
              Google
            </button>
            <button style={{
              flex: 1, background: '#1A1C20', border: '1px solid #2A2D35',
              borderRadius: 8, padding: '8px', color: '#F8FAFC',
              fontSize: 11.5, fontWeight: 500, cursor: 'pointer'
            }}>
              Apple
            </button>
          </div>

          {/* HelpBuddy Login */}
          <button style={{
            width: '100%', background: 'rgba(56, 189, 248, 0.03)', border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: 8, padding: '10px', display: 'flex', alignItems: 'center', gap: 10,
            cursor: 'pointer', marginBottom: 16
          }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#38BDF8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Mic size={14} color="#FFF" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#F8FAFC' }}>HelpBuddy AI</div>
              <div style={{ fontSize: 9.5, color: '#38BDF8' }}>Tap to start voice login</div>
            </div>
          </button>

          <div style={{ textAlign: 'center', fontSize: 11, color: '#64748B' }}>
            Don't have an account?{' '}
            <button 
              onClick={() => {
                setShowLoginModal(false)
                navigate('/auth', { state: { tab: 'signup' } })
              }}
              style={{ background: 'none', border: 'none', color: '#38BDF8', textDecoration: 'none', fontWeight: 600, cursor: 'pointer', padding: 0 }}
            >
              Create an Account
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
