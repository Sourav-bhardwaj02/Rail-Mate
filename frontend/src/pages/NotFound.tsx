import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, ArrowLeft } from 'lucide-react'

const NotFound: React.FC = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center', padding: 20 }}>
    <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, #2563EB, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Zap size={32} color="white" />
    </div>
    <h1 style={{ fontSize: 64, fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>404</h1>
    <h2 style={{ fontSize: 22, fontWeight: 700 }}>Page Not Found</h2>
    <p style={{ color: 'var(--color-muted)', maxWidth: 360 }}>This route doesn't exist on the RailMate network. Let's get you back on track.</p>
    <Link to="/" className="btn-primary" aria-label="Return to home page">
      <ArrowLeft size={16} /> Back to Home
    </Link>
  </div>
)

export default NotFound
