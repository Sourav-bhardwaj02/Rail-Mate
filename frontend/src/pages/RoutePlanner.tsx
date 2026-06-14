import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PageTopbar } from '../components/layout/Navbar'
import { Search, Clock, TrendingDown, Users, Repeat, Zap, Star, ChevronDown, ChevronUp, Train, ArrowRight } from 'lucide-react'

const STATIONS = [
  'New Delhi', 'Mumbai Central', 'Chennai Central', 'Kolkata', 'Bangalore City',
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Jammu Tawi',
  'Pathankot', 'Srinagar', 'Amritsar', 'Chandigarh'
]

const MOCK_ROUTES = [
  {
    id: '1', type: 'DIRECT', label: 'Direct Route', aiRecommended: false,
    trains: [{ name: 'Rajdhani Express', number: '12301', from: 'New Delhi', to: 'Mumbai Central', dep: '16:25', arr: '08:15+1', duration: '15h 50m', class: '3A', price: 1520, occupancy: 72 }],
    totalDuration: '15h 50m', totalCost: 1520, journeyScore: 74, crowdScore: 'MEDIUM', exchanges: 0,
    tags: ['Direct', 'AC 3-Tier'], reasoning: 'Direct connection — no changes required but moderate crowd levels expected.'
  },
  {
    id: '2', type: 'ALTERNATIVE', label: 'AI Recommended', aiRecommended: true,
    trains: [
      { name: 'Shatabdi Express', number: '12009', from: 'New Delhi', to: 'Ahmedabad', dep: '06:15', arr: '21:30', duration: '15h 15m', class: 'CC', price: 890, occupancy: 45 },
      { name: 'Gujarat Express', number: '11463', from: 'Ahmedabad', to: 'Mumbai Central', dep: '23:00', arr: '08:30+1', duration: '9h 30m', class: 'SL', price: 310, occupancy: 38 },
    ],
    totalDuration: '26h 15m', totalCost: 1200, journeyScore: 91, crowdScore: 'LOW', exchanges: 1,
    tags: ['Least Crowded', 'Best Value', 'AI Pick'], reasoning: 'Lower crowd, reduced delay risk. ₹320 savings vs direct with manageable layover.'
  },
  {
    id: '3', type: 'ALTERNATIVE', label: 'Fastest Route',
    trains: [{ name: 'Vande Bharat Express', number: '22229', from: 'New Delhi', to: 'Mumbai Central', dep: '06:00', arr: '18:30', duration: '12h 30m', class: 'EC', price: 2800, occupancy: 88 }],
    totalDuration: '12h 30m', totalCost: 2800, journeyScore: 62, crowdScore: 'HIGH', exchanges: 0,
    tags: ['Fastest', 'Premium', 'High Crowd'], reasoning: 'Fastest option but premium cost and high occupancy predicted.'
  },
]

const CrowdBar: React.FC<{ value: number }> = ({ value }) => {
  const color = value > 70 ? '#EF4444' : value > 40 ? '#F59E0B' : '#10B981'
  return (
    <div style={{ height: 6, background: 'rgba(148,163,184,0.15)', borderRadius: 3, overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ height: '100%', background: color, borderRadius: 3 }}
      />
    </div>
  )
}

const RoutePlanner: React.FC = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [routes, setRoutes] = useState<typeof MOCK_ROUTES>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!from || !to || !date) {
      alert("Please enter source, destination and date");
      return;
    }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/routes/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, date })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setRoutes(data.data)
      } else {
        alert(data.error || 'Failed to find routes')
      }
    } catch (err) {
      alert('Network error connecting to backend')
    } finally {
      setLoading(false)
    }
  }

  const scoreColor = (s: number) => s >= 85 ? '#10B981' : s >= 65 ? '#F59E0B' : '#EF4444'

  return (
    <div>
      <PageTopbar pageTitle="Route Planner" />
      <div className="px-4 py-6 md:px-8 max-w-[1200px] mx-auto w-full">

        {/* Search Card */}
        <div className="glass-card p-4 md:p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap size={16} color="#2563EB" />
            <span className="font-bold text-[15px]">Route Adjust AI</span>
            <span className="status-badge badge-blue text-[10px]">AI Powered</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
            <div>
              <label className="label-text" htmlFor="from-station">From Station</label>
              <input id="from-station" list="stations" className="input-field" placeholder="Source station..."
                value={from} onChange={e => setFrom(e.target.value)} aria-label="Enter source station" />
              <datalist id="stations">{STATIONS.map(s => <option key={s} value={s} />)}</datalist>
            </div>
            <div>
              <label className="label-text" htmlFor="to-station">To Station</label>
              <input id="to-station" list="stations" className="input-field" placeholder="Destination station..."
                value={to} onChange={e => setTo(e.target.value)} aria-label="Enter destination station" />
            </div>
            <div>
              <label className="label-text" htmlFor="travel-date">Travel Date</label>
              <input id="travel-date" type="date" className="input-field"
                value={date} onChange={e => setDate(e.target.value)} aria-label="Select travel date"
                min={new Date().toISOString().split('T')[0]} />
            </div>
            <button className="btn-primary w-full md:w-auto h-[42px] whitespace-nowrap" onClick={handleSearch} disabled={loading} aria-label="Search routes">
              {loading ? <span className="flex gap-2 items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                  <Search size={16} />
                </motion.div>Searching...
              </span> : <><Search size={16} />Find Routes</>}
            </button>
          </div>
        </div>

        {/* Route Filter Tags */}
        {routes.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { icon: <TrendingDown size={13} />, label: 'Cheapest' },
              { icon: <Clock size={13} />, label: 'Fastest' },
              { icon: <Users size={13} />, label: 'Least Crowded' },
              { icon: <Repeat size={13} />, label: 'Min Exchanges' },
            ].map(f => (
              <button key={f.label} className="btn-secondary" style={{ padding: '6px 14px', fontSize: 12, gap: 6 }}
                aria-label={`Filter by ${f.label}`}>
                {f.icon}{f.label}
              </button>
            ))}
          </div>
        )}

        {/* Route Cards */}
        {routes.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {routes.map((route, idx) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card"
                style={{ padding: 0, overflow: 'hidden', border: route.aiRecommended ? '1px solid rgba(37,99,235,0.4)' : undefined }}
              >
                {route.aiRecommended && (
                  <div style={{ background: 'linear-gradient(90deg,#2563EB,#06B6D4)', padding: '6px 20px', fontSize: 11, fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Star size={12} fill="white" /> AI RECOMMENDED — Best overall journey experience
                  </div>
                )}
                <div className="p-4 md:p-5">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1 w-full">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{route.label}</span>
                        {route.tags.map(t => (
                          <span key={t} className="status-badge badge-blue" style={{ fontSize: 10 }}>{t}</span>
                        ))}
                      </div>
                      {/* Train timeline */}
                      <div className="flex flex-col gap-2 mb-2">
                        {route.trains.map((train, ti) => (
                          <div key={ti} className="flex flex-wrap items-center gap-2">
                          <Train size={14} color="var(--color-muted)" />
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{train.name}</span>
                          <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>#{train.number}</span>
                          <span style={{ fontSize: 13 }}>{train.dep}</span>
                          <ArrowRight size={12} color="var(--color-muted)" />
                          <span style={{ fontSize: 13 }}>{train.arr}</span>
                          <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>({train.duration})</span>
                          <span className={`status-badge ${train.occupancy > 70 ? 'badge-red' : train.occupancy > 40 ? 'badge-yellow' : 'badge-green'}`} style={{ fontSize: 10 }}>
                            {train.occupancy}% full
                          </span>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <CrowdBar value={route.trains[0].occupancy} />
                      </div>
                    </div>

                    {/* Score + cost */}
                    <div className="text-left md:text-right min-w-[140px] w-full md:w-auto border-t border-white/5 md:border-none pt-4 md:pt-0">
                      <div style={{ fontSize: 28, fontWeight: 800, color: scoreColor(route.journeyScore) }}>
                        {route.journeyScore}
                        <span style={{ fontSize: 13, color: 'var(--color-muted)', fontWeight: 400 }}>/100</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--color-muted)', marginBottom: 8 }}>Journey Score</div>
                      <div style={{ fontSize: 22, fontWeight: 700 }}>₹{route.totalCost.toLocaleString()}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-muted)', marginBottom: 12 }}>{route.totalDuration} • {route.exchanges} change(s)</div>
                      <button className="btn-primary" style={{ fontSize: 12, padding: '8px 16px', width: '100%' }}
                        aria-label={`Book ${route.label}`}>
                        Book Now
                      </button>
                    </div>
                  </div>

                  {/* Expand / collapse */}
                  <button
                    onClick={() => setExpanded(expanded === route.id ? null : route.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-muted)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, padding: 0 }}
                    aria-expanded={expanded === route.id}
                  >
                    {expanded === route.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    AI Reasoning
                  </button>
                  {expanded === route.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      style={{ marginTop: 12, padding: 12, background: 'rgba(37,99,235,0.08)', borderRadius: 8, fontSize: 13, color: 'var(--color-muted)', lineHeight: 1.6 }}
                    >
                      🤖 <strong style={{ color: 'var(--color-text)' }}>AI Analysis:</strong> {route.reasoning}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {routes.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-muted)' }}>
            <Train size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ fontSize: 16, fontWeight: 500 }}>Enter source and destination to find routes</p>
            <p style={{ fontSize: 13, marginTop: 8 }}>AI will automatically find direct and alternative routes</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoutePlanner
