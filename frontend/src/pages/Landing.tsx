import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation, Eye, ChevronRight } from 'lucide-react'

/* ─────────────────────────────────────────────
   Route visualization inside the Route Adjust card
   Shows: Central Station (green) → Platform 6 Rerouting (red box)
   ───────────────────────────────────────────── */
const RouteVisual = () => (
  <div style={{
    width: 200, flexShrink: 0,
    background: '#0F172A', borderRadius: 10, padding: 16,
    border: '1px solid rgba(255,255,255,0.06)',
  }}>
    {/* From station */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: '#E2E8F0' }}>Central Station</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <div style={{ width: 8 }} />
      <span style={{ fontSize: 10, color: '#10B981' }}>● On Time</span>
    </div>

    {/* Connecting line */}
    <div style={{ marginLeft: 3, width: 2, height: 16, background: 'linear-gradient(to bottom, #10B981, #EF4444)' }} />

    {/* Platform 6 rerouting box */}
    <div style={{
      background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
      borderRadius: 8, padding: '10px 12px', marginTop: 4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: '#FCA5A5' }}>Platform 6</span>
      </div>
      <div style={{ fontSize: 10, color: '#EF4444', paddingLeft: 14 }}>→ Rerouting...</div>
    </div>
  </div>
)

/* ─────────────────────────────────────────────
   Crowd bar chart inside the Crowd Intelligence card
   Green / Yellow / Green / Red / Red bars
   ───────────────────────────────────────────── */
const CrowdBars = () => {
  const bars = [
    { h: 55, color: '#10B981' },
    { h: 75, color: '#F59E0B' },
    { h: 40, color: '#10B981' },
    { h: 95, color: '#EF4444' },
    { h: 85, color: '#EF4444' },
  ]
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', gap: 8, height: 70,
      padding: '10px 14px', background: 'rgba(0,0,0,0.25)', borderRadius: 8,
    }}>
      {bars.map((b, i) => (
        <div key={i} style={{
          flex: 1, height: `${b.h}%`, background: b.color,
          borderRadius: '3px 3px 0 0', opacity: 0.85,
          transition: 'height 0.5s ease',
        }} />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════ */
const Landing: React.FC = () => (
  <div style={{ background: '#121212', minHeight: '100vh', color: '#F8FAFC' }}>
    {/* Navbar height spacer */}
    <div style={{ height: 52 }} />

    <div style={{ maxWidth: 1060, margin: '0 auto', padding: '28px 28px 0' }}>

      {/* ═══════ HERO SECTION ═══════ */}
      <section style={{
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        height: 380,
        marginBottom: 52,
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Real train station background image */}
        <img
          src="/hero-station.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 40%',
          }}
        />
        {/* Dark gradient overlay — heavier on left for text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(18,18,18,0.92) 0%, rgba(18,18,18,0.75) 50%, rgba(18,18,18,0.55) 100%)',
        }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 1, padding: '48px 48px', maxWidth: 520, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Live badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
            background: 'transparent', border: '1px solid rgba(79, 70, 229, 0.4)',
            padding: '5px 14px', borderRadius: 20, fontSize: 10, fontWeight: 600, color: '#818CF8',
            marginBottom: 20, letterSpacing: '0.03em',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} className="dot-pulse" />
            Live Station Status: Sydney
          </div>

          <h1 style={{
            fontSize: 42, fontWeight: 800, lineHeight: 1.08,
            marginBottom: 16, letterSpacing: '-0.02em',
            color: '#F8FAFC',
          }}>
            Plan Smarter,<br />Travel Better.
          </h1>

          <p style={{
            fontSize: 13, color: '#94A3B8', lineHeight: 1.65,
            marginBottom: 28, maxWidth: 400,
          }}>
            Experience frictionless travel with an AI station expert. From predictive routing to real-time crowd intelligence, RailMate ensures your journey is calm, safe, and efficient.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/route-planner" style={{
              background: '#6C2BD9', color: '#fff',
              padding: '12px 24px', borderRadius: 6,
              fontSize: 13, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 7,
              textDecoration: 'none', border: 'none',
            }}>
              <Navigation size={14} /> Plan My Journey
            </Link>
            <button style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#E2E8F0', padding: '12px 24px', borderRadius: 6,
              fontSize: 13, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 7,
              cursor: 'pointer',
            }}>
              <Eye size={14} /> See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES SECTION ═══════ */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, color: '#F8FAFC' }}>
          Intelligence at Every Stop
        </h2>
        <p style={{ fontSize: 12, color: '#64748B', marginBottom: 24 }}>
          Advanced features designed for accessibility and peace of mind.
        </p>

        {/* Two-column feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, marginBottom: 16 }}>

          {/* ── Route Adjust AI ── */}
          <div style={{
            background: '#1A1A1A', borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.04)',
            padding: '28px 28px', display: 'flex', gap: 24, alignItems: 'center',
          }}>
            {/* Left text */}
            <div style={{ flex: 1 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 7,
                background: 'rgba(99,102,241,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14, color: '#818CF8',
              }}>
                <Navigation size={14} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#F8FAFC' }}>Route Adjust AI</h3>
              <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.65, marginBottom: 18 }}>
                Never get caught in a delay again. Our predictive models anticipate disruptions before they happen and automatically offer stop-free, optimised alternatives tailored to your mobility profile.
              </p>
              <Link to="/route-planner" style={{
                fontSize: 12, color: '#818CF8', textDecoration: 'none',
                fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                Learn more <ChevronRight size={13} />
              </Link>
            </div>
            {/* Right route visual */}
            <RouteVisual />
          </div>

          {/* ── Crowd Intelligence ── */}
          <div style={{
            background: '#1A1A1A', borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.04)',
            padding: '28px 24px', display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 7,
              background: 'rgba(16,185,129,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14, color: '#34D399',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="12" width="4" height="9" /><rect x="10" y="7" width="4" height="14" /><rect x="17" y="3" width="4" height="18" />
              </svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#F8FAFC' }}>Crowd Intelligence</h3>
            <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.65, flex: 1 }}>
              Find a quiet carriage to avoid congested platforms. Realtime sensors provide live capacity stats, guiding you to the most comfortable boarding zones.
            </p>
            <CrowdBars />
          </div>
        </div>

        {/* ── One-Tap SOS Center ── */}
        <div style={{
          background: 'linear-gradient(to right, #240A0F, #1A1A1A 60%)',
          borderRadius: 8,
          border: '1px solid rgba(239,68,68,0.15)',
          padding: '36px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.35)',
              color: '#EF4444', fontSize: 9, fontWeight: 700,
              padding: '3px 8px', borderRadius: 4, marginBottom: 14,
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              Priority Safety
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#F8FAFC' }}>One-Tap SOS Center</h3>
            <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.65 }}>
              Your safety is our absolute priority. A dedicated hardware-mapped emergency button ensures you are instantly notified to railway station staff, sharing your precise location and mobility needs.
            </p>
          </div>
          {/* SOS Button */}
          <Link to="/sos-center" style={{ textDecoration: 'none', flexShrink: 0, marginLeft: 32 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%, #EF4444, #B91C1C)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 32px rgba(239,68,68,0.4), 0 0 60px rgba(239,68,68,0.15)',
              border: '2px solid rgba(239,68,68,0.6)',
              color: 'white', cursor: 'pointer',
            }}>
              <span style={{ fontSize: 22, lineHeight: 1 }}>✳</span>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>SOS</span>
            </div>
          </Link>
        </div>
      </section>
    </div>

    {/* ═══════ FOOTER ═══════ */}
    <footer style={{
      maxWidth: 1060, margin: '0 auto',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '16px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 10,
    }}>
      <span style={{ fontSize: 11, color: '#334155' }}>
        © 2024 RailMate AI. Modern AI-Powered Railway Support.
      </span>
      <div style={{ display: 'flex', gap: 20 }}>
        {['Emergency Contacts', 'Accessibility Policy', 'System Health', 'Terms'].map(l => (
          <a key={l} href="#" style={{ fontSize: 11, color: '#475569', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
          >{l}</a>
        ))}
      </div>
    </footer>
  </div>
)

export default Landing
