import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTopbar } from '../components/layout/Navbar'
import { Search, Navigation } from 'lucide-react'

/* ─── Data ─── */
const FILTERS = ['All', 'Lifts', 'Escalators', 'Washrooms', 'Food', 'Accessible Routes']

const MAP_POINTS = [
<<<<<<< HEAD
  { id: 'p1', type: 'PLATFORM', name: 'Platform 1', desc: 'Rajdhani Express — Departs 16:25 · LOW CROWD', crowd: 'LOW' as const,
    accessible: true, svgX: '24%', svgY: '24%' },
  { id: 'p2', type: 'PLATFORM', name: 'Platform 2', desc: 'Shatabdi — Departs 06:00 · HIGH CROWD', crowd: 'HIGH' as const,
    accessible: true, svgX: '76%', svgY: '24%' },
  { id: 'p3', type: 'PLATFORM', name: 'Platform 3', desc: 'Vande Bharat — Departs 08:30 · HIGH CROWD', crowd: 'HIGH' as const,
    accessible: true, svgX: '24%', svgY: '76%' },
  { id: 'p4', type: 'PLATFORM', name: 'Platform 4', desc: 'Garib Rath — Departs 19:45 · LOW CROWD', crowd: 'LOW' as const,
    accessible: true, svgX: '76%', svgY: '76%' },
  { id: 'mc', type: 'CONCOURSE', name: 'Main Concourse L5A', desc: 'Connect to all platforms. This area is accessible; has elevator access.', crowd: 'MEDIUM' as const,
    accessible: true, svgX: '50%', svgY: '50%' },
  { id: 'e1', type: 'EXIT', name: 'Exit Gate 1', desc: 'Main entrance — taxi and auto-rickshaw stand nearby.', crowd: 'LOW' as const,
    accessible: true, svgX: '10%', svgY: '50%' },
  { id: 'f1', type: 'FOOD', name: 'Food Court', desc: 'Multiple food stalls, cafeteria and coffee shop.', crowd: 'LOW' as const,
    accessible: true, svgX: '90%', svgY: '50%' },
=======
  { id: 'p1', type: 'PLATFORM', name: 'Platform 1', desc: 'Rajdhani Express — Departs 16:25', crowd: 'LOW' as const,
    accessible: true, svgX: '20%', svgY: '28%' },
  { id: 'p2', type: 'PLATFORM', name: 'Platform 2', desc: 'Shatabdi — Departs 06:00 · HIGH CROWD', crowd: 'HIGH' as const,
    accessible: true, svgX: '72%', svgY: '28%' },
  { id: 'mc', type: 'CONCOURSE', name: 'Main Concourse L5A', desc: 'Connect to Platform 1 & 2. This platform is accessible; has elevator access.', crowd: 'MEDIUM' as const,
    accessible: true, svgX: '46%', svgY: '52%' },
  { id: 'e1', type: 'EXIT', name: 'Exit Gate 1', desc: 'Main entrance — taxi and auto-rickshaw stand nearby.', crowd: 'LOW' as const,
    accessible: true, svgX: '20%', svgY: '75%' },
  { id: 'f1', type: 'FOOD', name: 'Food Court', desc: 'Multiple food stalls, cafeteria and coffee shop.', crowd: 'LOW' as const,
    accessible: true, svgX: '72%', svgY: '75%' },
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
]

const crowdColor = (c: 'LOW' | 'MEDIUM' | 'HIGH') =>
  ({ LOW: '#10B981', MEDIUM: '#F59E0B', HIGH: '#EF4444' }[c])

/* ─── Custom SVG station map ─── */
const StationSVGMap: React.FC<{ selected: string | null; onSelect: (id: string) => void }> = ({ selected, onSelect }) => (
  <svg viewBox="0 0 800 500" width="100%" height="100%" style={{ display: 'block' }}>
<<<<<<< HEAD
    <defs>
      <pattern id="map-p1" patternUnits="userSpaceOnUse" width="290" height="145">
        <image href="/station-maps.png" x="0" y="0" width="580" height="290" preserveAspectRatio="none" />
      </pattern>
      <pattern id="map-p2" patternUnits="userSpaceOnUse" width="290" height="145">
        <image href="/station-maps.png" x="-290" y="0" width="580" height="290" preserveAspectRatio="none" />
      </pattern>
      <pattern id="map-p3" patternUnits="userSpaceOnUse" width="290" height="145">
        <image href="/station-maps.png" x="0" y="-145" width="580" height="290" preserveAspectRatio="none" />
      </pattern>
      <pattern id="map-p4" patternUnits="userSpaceOnUse" width="290" height="145">
        <image href="/station-maps.png" x="-290" y="-145" width="580" height="290" preserveAspectRatio="none" />
      </pattern>
    </defs>
=======
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
    {/* Background */}
    <rect width="800" height="500" fill="#0a1628" />

    {/* Outer station boundary */}
    <rect x="30" y="30" width="740" height="440" rx="8" fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="1.5" />

    {/* Horizontal corridor */}
    <rect x="30" y="210" width="740" height="80" fill="rgba(30,41,59,0.4)" />
    {/* Vertical corridor */}
    <rect x="360" y="30" width="80" height="440" fill="rgba(30,41,59,0.4)" />

<<<<<<< HEAD
    {/* Platform 1 — LOW CROWD indicator */}
    <rect x="50" y="50" width="290" height="145" rx="6" fill="url(#map-p1)" stroke="rgba(16,185,129,0.5)" strokeWidth="2" />
    <rect x="50" y="50" width="290" height="145" rx="6" fill="rgba(16,185,129,0.25)" style={{ pointerEvents: 'none' }} />
    <rect x="140" y="97" width="110" height="26" rx="4" fill="rgba(10,22,40,0.8)" style={{ pointerEvents: 'none' }} />
    <text x="195" y="115" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="Inter,sans-serif" fontWeight="700">Platform 1</text>
    <rect x="124" y="130" width="142" height="22" rx="4" fill="rgba(16,185,129,0.9)" />
    <text x="195" y="145" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">● LOW CROWD</text>

    {/* Platform 2 — HIGH CROWD indicator */}
    <rect x="460" y="50" width="290" height="145" rx="6" fill="url(#map-p2)" stroke="rgba(239,68,68,0.5)" strokeWidth="2" />
    <rect x="460" y="50" width="290" height="145" rx="6" fill="rgba(239,68,68,0.25)" style={{ pointerEvents: 'none' }} />
    <rect x="550" y="97" width="110" height="26" rx="4" fill="rgba(10,22,40,0.8)" style={{ pointerEvents: 'none' }} />
    <text x="605" y="115" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="Inter,sans-serif" fontWeight="700">Platform 2</text>
    <rect x="534" y="130" width="142" height="22" rx="4" fill="rgba(239,68,68,0.9)" />
    <text x="605" y="145" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">● HIGH CROWD</text>

    {/* Platform 3 — HIGH CROWD indicator */}
    <rect x="50" y="310" width="290" height="145" rx="6" fill="url(#map-p3)" stroke="rgba(239,68,68,0.5)" strokeWidth="2" />
    <rect x="50" y="310" width="290" height="145" rx="6" fill="rgba(239,68,68,0.25)" style={{ pointerEvents: 'none' }} />
    <rect x="140" y="357" width="110" height="26" rx="4" fill="rgba(10,22,40,0.8)" style={{ pointerEvents: 'none' }} />
    <text x="195" y="375" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="Inter,sans-serif" fontWeight="700">Platform 3</text>
    <rect x="124" y="390" width="142" height="22" rx="4" fill="rgba(239,68,68,0.9)" />
    <text x="195" y="405" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">● HIGH CROWD</text>

    {/* Platform 4 — LOW CROWD indicator */}
    <rect x="460" y="310" width="290" height="145" rx="6" fill="url(#map-p4)" stroke="rgba(16,185,129,0.5)" strokeWidth="2" />
    <rect x="460" y="310" width="290" height="145" rx="6" fill="rgba(16,185,129,0.25)" style={{ pointerEvents: 'none' }} />
    <rect x="550" y="357" width="110" height="26" rx="4" fill="rgba(10,22,40,0.8)" style={{ pointerEvents: 'none' }} />
    <text x="605" y="375" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="Inter,sans-serif" fontWeight="700">Platform 4</text>
    <rect x="534" y="390" width="142" height="22" rx="4" fill="rgba(16,185,129,0.9)" />
    <text x="605" y="405" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">● LOW CROWD</text>
=======
    {/* Platform 1 */}
    <rect x="50" y="50" width="290" height="145" rx="6" fill="rgba(37,99,235,0.06)" stroke="rgba(37,99,235,0.18)" strokeWidth="1" />
    <text x="195" y="130" textAnchor="middle" fill="rgba(248,250,252,0.7)" fontSize="16" fontFamily="Inter,sans-serif" fontWeight="600">Platform 1</text>

    {/* Platform 2 — HIGH CROWD indicator */}
    <rect x="460" y="50" width="290" height="145" rx="6" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
    <text x="605" y="115" textAnchor="middle" fill="rgba(248,250,252,0.7)" fontSize="16" fontFamily="Inter,sans-serif" fontWeight="600">Platform 2</text>
    <rect x="534" y="130" width="142" height="22" rx="4" fill="rgba(239,68,68,0.2)" />
    <text x="605" y="145" textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">● HIGH CROWD</text>

    {/* Platform 3 & 4 */}
    <rect x="50" y="310" width="290" height="145" rx="6" fill="rgba(37,99,235,0.06)" stroke="rgba(37,99,235,0.18)" strokeWidth="1" />
    <text x="195" y="390" textAnchor="middle" fill="rgba(248,250,252,0.7)" fontSize="16" fontFamily="Inter,sans-serif" fontWeight="600">Platform 3</text>
    <rect x="460" y="310" width="290" height="145" rx="6" fill="rgba(37,99,235,0.06)" stroke="rgba(37,99,235,0.18)" strokeWidth="1" />
    <text x="605" y="390" textAnchor="middle" fill="rgba(248,250,252,0.7)" fontSize="16" fontFamily="Inter,sans-serif" fontWeight="600">Platform 4</text>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98

    {/* Main Concourse label */}
    <text x="400" y="258" textAnchor="middle" fill="rgba(148,163,184,0.45)" fontSize="13" fontFamily="Inter,sans-serif">Main Concourse</text>

    {/* Interactive points */}
    {MAP_POINTS.map(pt => {
      const isSelected = selected === pt.id
      const x = parseFloat(pt.svgX) * 8  // convert % of 800
      const y = parseFloat(pt.svgY) * 5  // convert % of 500
      return (
        <g key={pt.id} onClick={() => onSelect(pt.id)} style={{ cursor: 'pointer' }}>
          {/* Glow ring if selected */}
          {isSelected && <circle cx={x} cy={y} r={18} fill={`${crowdColor(pt.crowd)}22`} stroke={crowdColor(pt.crowd)} strokeWidth="1.5" />}
          {/* Main dot */}
          <circle cx={x} cy={y} r={9} fill={crowdColor(pt.crowd)} opacity={isSelected ? 1 : 0.8}
            style={{ filter: `drop-shadow(0 0 6px ${crowdColor(pt.crowd)})` }} />
          {/* Label */}
          <text x={x} y={y + 22} textAnchor="middle" fill="rgba(248,250,252,0.75)" fontSize="9" fontFamily="Inter,sans-serif">{pt.name.split(' ')[0]} {pt.name.split(' ')[1] || ''}</text>
        </g>
      )
    })}
  </svg>
)

/* ─── Page ─── */
const StationMap: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const selected = MAP_POINTS.find(p => p.id === selectedId) || null

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTopbar pageTitle="Smart Station Map" />

      {/* Search + Filters */}
      <div style={{
        padding: '10px 18px', borderBottom: '1px solid var(--color-border)',
        display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap',
        background: 'var(--bg-surface)',
      }}>
        <div style={{ position: 'relative', flex: '0 0 220px' }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
          <input className="input-field" placeholder="Find platforms, lifts..." value={search}
            onChange={e => setSearch(e.target.value)} aria-label="Search station"
            style={{ paddingLeft: 30, fontSize: 12, height: 34 }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} aria-pressed={activeFilter === f}
              style={{
                padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 500, cursor: 'pointer', border: 'none',
                background: activeFilter === f ? 'rgba(37,99,235,0.2)' : 'rgba(30,41,59,0.6)',
                color: activeFilter === f ? '#60a5fa' : '#64748B',
                transition: 'all 0.15s',
              }}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Map + Panel */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        {/* Map area */}
        <div className="flex-1 bg-[#0a1628] relative overflow-hidden">
          <StationSVGMap selected={selectedId} onSelect={(id) => setSelectedId(selectedId === id ? null : id)} />
          {/* Legend */}
          <div style={{
            position: 'absolute', bottom: 16, left: 16,
            background: 'rgba(10,18,34,0.9)', border: '1px solid rgba(148,163,184,0.1)',
            borderRadius: 8, padding: '10px 14px', backdropFilter: 'blur(8px)',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Crowd Level</div>
            {[['#10B981', 'Low'], ['#F59E0B', 'Medium'], ['#EF4444', 'High']].map(([c, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: c, boxShadow: `0 0 5px ${c}` }} />
                <span style={{ fontSize: 11, color: '#94A3B8' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selection panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              className="absolute md:relative inset-y-0 right-0 z-20 md:z-auto w-full sm:w-[320px] md:w-[280px] bg-[var(--bg-surface)] md:border-l border-[var(--color-border)] p-4 md:p-5 flex flex-col gap-3 overflow-y-auto shadow-2xl md:shadow-none"
              role="complementary" aria-label="Selected location details"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>Selected Point</span>
                <button onClick={() => setSelectedId(null)} aria-label="Close panel"
                  style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
              </div>

              <div className="glass-card" style={{ padding: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{selected.name}</div>
                <span className="status-badge badge-green" style={{ fontSize: 10, marginBottom: 10 }}>● Operational</span>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6, marginTop: 8 }}>{selected.desc}</p>
                {selected.accessible && (
                  <div style={{ marginTop: 10, fontSize: 11, color: '#10B981', display: 'flex', alignItems: 'center', gap: 4 }}>
                    ♿ Wheelchair accessible route available
                  </div>
                )}
              </div>

              {/* Crowd meter */}
              <div style={{ padding: 12, background: 'rgba(10,18,34,0.5)', borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', marginBottom: 6 }}>Crowd Status</div>
                <div style={{ height: 6, background: 'rgba(148,163,184,0.12)', borderRadius: 3, overflow: 'hidden', marginBottom: 5 }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    background: crowdColor(selected.crowd),
                    width: selected.crowd === 'LOW' ? '28%' : selected.crowd === 'MEDIUM' ? '62%' : '91%',
                    transition: 'width 0.4s',
                  }} />
                </div>
                <span style={{ fontSize: 11, color: crowdColor(selected.crowd), fontWeight: 600 }}>{selected.crowd}</span>
                <span style={{ fontSize: 11, color: '#475569' }}> crowd level</span>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}
                aria-label={`Navigate to ${selected.name}`}>
                <Navigation size={14} /> Navigate Here
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default StationMap
