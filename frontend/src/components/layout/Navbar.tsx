import React from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { Bell, Moon, Bot, User } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

interface TopbarProps {
  pageTitle: string
}

const landingNavLinks = [
  { path: '/route-planner', label: 'Route Planner' },
  { path: '/station-map', label: 'Station Map' },
  { path: '/crowd-monitoring', label: 'Crowd Monitoring' },
  { path: '/sos-center', label: 'SOS Center' },
]

export const LandingNavbar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, userId, setShowLoginModal } = useAppStore()

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isLoggedIn) {
      setShowLoginModal(true)
    } else {
      if (userId === 'admin') {
        navigate('/admin')
      } else {
        navigate('/route-planner')
      }
    }
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(18, 18, 18, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 52,
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          border: '1.5px solid #D8B4E2',
          background: '#1F1F23',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Bot size={14} color="#D8B4E2" />
        </div>
        <span style={{ fontWeight: 800, fontSize: 15, color: '#F8FAFC' }}>RailMate AI</span>
      </Link>

      <nav style={{ display: 'flex', gap: 0 }}>
        {landingNavLinks.map((link) => {
          const isActive = location.pathname === link.path
          return (
            <NavLink key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '8px 16px', fontSize: 12, fontWeight: 500,
                color: isActive ? '#A855F7' : '#64748B',
                borderBottom: isActive ? '2px solid #A855F7' : '2px solid transparent',
                transition: 'all 0.15s',
              }}>
                {link.label}
              </div>
            </NavLink>
          )
        })}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button 
          onClick={handleProfileClick}
          aria-label="Profile" 
          style={{ 
            color: isLoggedIn ? (userId === 'admin' ? '#10B981' : '#A855F7') : '#475569', 
            background: 'transparent',
            border: 'none',
            display: 'flex',
            cursor: 'pointer'
          }}
        >
          <User size={15} />
        </button>
      </div>
    </header>
  )
}

export const PageTopbar: React.FC<TopbarProps> = ({ pageTitle }) => {
  return (
    <div style={{
      padding: '20px 32px 16px',
      borderBottom: '1px solid var(--color-border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text)' }}>{pageTitle}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button aria-label="Notifications" style={{
          background: 'transparent', border: '1px solid var(--color-border)',
          borderRadius: 8, color: 'var(--color-muted)', cursor: 'pointer', padding: '6px 8px',
          display: 'flex', alignItems: 'center',
        }}>
          <Bell size={16} />
        </button>
        <button aria-label="Toggle dark mode" style={{
          background: 'transparent', border: '1px solid var(--color-border)',
          borderRadius: 8, color: 'var(--color-muted)', cursor: 'pointer', padding: '6px 8px',
          display: 'flex', alignItems: 'center',
        }}>
          <Moon size={16} />
        </button>
      </div>
    </div>
  )
}
