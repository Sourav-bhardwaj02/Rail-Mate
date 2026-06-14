import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Navigation, Users, AlertTriangle, User,
  Accessibility, Settings, HelpCircle, Bot, Asterisk, ScanFace, X, ShieldCheck
} from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
  ariaLabel: string
}

const navItems: NavItem[] = [
  { path: '/route-planner', label: 'Route Planner', icon: <Navigation size={18} />, ariaLabel: 'Navigate to Route Planner' },
  { path: '/station-map', label: 'Station Map', icon: <MapPin size={18} />, ariaLabel: 'Navigate to Station Map' },
  { path: '/crowd-monitoring', label: 'Crowd Monitoring', icon: <Users size={18} />, ariaLabel: 'Navigate to Crowd Monitoring' },
  { path: '/sos-center', label: 'SOS Center', icon: <AlertTriangle size={18} />, ariaLabel: 'Navigate to SOS Emergency Center' },
  { path: '/missing-person', label: 'Missing Person', icon: <ScanFace size={18} />, ariaLabel: 'Navigate to Missing Person AI Locator' },
  { path: '/accessibility', label: 'Accessibility', icon: <Accessibility size={18} />, ariaLabel: 'Navigate to Accessibility Hub' },
]

const adminNavItems: NavItem[] = [
  { path: '/admin', label: 'Admin Dashboard', icon: <ShieldCheck size={18} />, ariaLabel: 'Navigate to Admin Dashboard' },
  { path: '/admin/sos-feed', label: 'Live SOS Feed', icon: <AlertTriangle size={18} />, ariaLabel: 'Navigate to Live SOS Feed' },
  { path: '/admin/missing-persons', label: 'Person Monitoring', icon: <ScanFace size={18} />, ariaLabel: 'Navigate to Person Monitoring' },
  { path: '/admin/crowd-analytics', label: 'Crowd Analytics', icon: <Users size={18} />, ariaLabel: 'Navigate to Crowd Analytics' },
]

export const Sidebar: React.FC = () => {
  const { sosActive, isLoggedIn, userId, setShowLoginModal, mobileMenuOpen, setMobileMenuOpen } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()

  // Overlay for mobile
  const overlay = mobileMenuOpen ? (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      onClick={() => setMobileMenuOpen(false)}
    />
  ) : null

  return (
    <>
      {overlay}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col h-full bg-[#1A1C20] border-r border-[var(--color-border)] w-[240px] transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Mobile close button */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={20} />
        </button>

        {/* Logo */}
      <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div style={{ padding: '40px 16px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16
            }}
          >
            <Bot size={28} color="#D8B4E2" />
          </motion.div>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#F8FAFC', lineHeight: 1.2, textAlign: 'center' }}>RailMate</div>
          <div style={{ fontWeight: 800, fontSize: 16, color: '#F8FAFC', lineHeight: 1.2, textAlign: 'center', marginBottom: 16 }}>AI</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textAlign: 'center', letterSpacing: '0.05em' }}>Your Station Expert</div>
        </div>
      </NavLink>

      {/* Nav Items */}
      <nav style={{ padding: '12px 8px' }}>
        {userId !== 'admin' && navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path)
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              aria-label={item.ariaLabel}
              style={{ textDecoration: 'none', display: 'block', marginBottom: 2 }}
            >
              <motion.div
                whileHover={{ x: 2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '10px 16px',
                  margin: '0 8px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  background: isActive ? '#5B21B6' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#9CA3AF',
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.15s',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.path === '/sos-center' && sosActive && (
                  <span className="status-badge badge-red" style={{ marginLeft: 'auto', fontSize: 9, padding: '2px 6px' }}>
                    ACTIVE
                  </span>
                )}
              </motion.div>
            </NavLink>
          )
        })}

        {userId === 'admin' && (
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', letterSpacing: 1, padding: '0 16px', marginBottom: 8, marginTop: 12 }}>ADMINISTRATION</div>
            {adminNavItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={item.ariaLabel}
                  style={{ textDecoration: 'none', display: 'block', marginBottom: 2 }}
                >
                  <motion.div
                    whileHover={{ x: 2 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '10px 16px', margin: '0 8px', borderRadius: 6, cursor: 'pointer',
                      background: isActive ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                      color: isActive ? '#10B981' : '#9CA3AF',
                      fontSize: 12, fontWeight: isActive ? 600 : 500,
                      transition: 'all 0.15s', borderLeft: isActive ? '3px solid #10B981' : '3px solid transparent'
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.div>
                </NavLink>
              )
            })}
          </div>
        )}
      </nav>

      {/* Emergency SOS button */}
      {userId !== 'admin' && (
      <div style={{ padding: '16px 16px' }}>
        <motion.button
          onClick={() => {
            if (!isLoggedIn) {
              setShowLoginModal(true)
            } else {
              navigate('/sos-center')
            }
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Emergency SOS — tap to open emergency center"
          style={{
            width: '100%',
            background: '#991B1B',
            border: 'none',
            borderRadius: 6,
            color: '#FFFFFF',
            padding: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          <Asterisk size={16} />
          Emergency SOS
        </motion.button>
      </div>
      )}

      {/* Footer links */}
      <div style={{ padding: '8px 16px 24px', marginTop: 'auto' }}>
        {[
          { path: '/about', icon: <Bot size={16} />, label: 'About RailMate' },
          { path: '/settings', icon: <Settings size={16} />, label: 'Settings' },
          { path: '/help', icon: <HelpCircle size={16} />, label: 'Help' },
        ].map((item) => (
          <NavLink key={item.path} to={item.path} style={{ textDecoration: 'none', display: 'block', marginBottom: 4 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '8px 8px', borderRadius: 6, cursor: 'pointer',
              color: '#9CA3AF', fontSize: 12,
              transition: 'color 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          </NavLink>
        ))}

        {/* Explicit Login / Logout Button */}
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {!isLoggedIn ? (
            <button
              onClick={() => setShowLoginModal(true)}
              style={{
                width: '100%', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: 6, color: '#38BDF8', padding: '10px 12px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600, fontSize: 13
              }}
            >
              <User size={16} /> Login
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#F8FAFC', fontSize: 13, fontWeight: 600 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: userId === 'admin' ? '#10B981' : '#A855F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {userId === 'admin' ? <ShieldCheck size={14} color="#FFF" /> : <User size={14} color="#FFF" />}
                </div>
                {userId === 'admin' ? 'Admin' : 'User'}
              </div>
              <button
                onClick={() => {
                  useAppStore.getState().setLoggedIn(false, undefined)
                  navigate('/')
                }}
                style={{
                  background: 'transparent', border: '1px solid #EF4444',
                  borderRadius: 6, color: '#EF4444', padding: '4px 10px', cursor: 'pointer',
                  fontSize: 11, fontWeight: 600
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      </aside>
    </>
  )
}
