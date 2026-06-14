import React, { useEffect, useState, useCallback } from 'react'
import { PageTopbar } from '../components/layout/Navbar'
import { AlertTriangle, MapPin, User, Mail, Phone, Clock, CheckCircle, Loader, RefreshCw, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const API = import.meta.env.VITE_API_URL

interface SOSAlert {
  id: string
  type: string
  location: string
  lat?: number
  lng?: number
  notes?: string
  status: string
  createdAt: string
  resolvedAt?: string
  user?: {
    id: string
    name: string
    email: string
    phone?: string
    guardianEmail?: string
    guardianName?: string
  }
}

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  MEDICAL:       { label: '🏥 Medical',         color: '#A855F7' },
  WOMEN_SAFETY:  { label: '🛡️ Women Safety',    color: '#EC4899' },
  SECURITY:      { label: '🔒 Security',         color: '#EF4444' },
  LOST_PASSENGER:{ label: '🔍 Lost Passenger',   color: '#F59E0B' },
}

const AdminSOSFeed: React.FC = () => {
  const [alerts, setAlerts] = useState<SOSAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [resolvingId, setResolvingId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'RESOLVED'>('ALL')
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/sos/alerts`)
      const data = await res.json()
      if (data.success) {
        setAlerts(data.alerts)
        setLastRefresh(new Date())
      }
    } catch (err) {
      console.error('Failed to fetch SOS alerts:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, 10000) // Poll every 10s
    return () => clearInterval(interval)
  }, [fetchAlerts])

  const resolveAlert = async (id: string) => {
    setResolvingId(id)
    try {
      const res = await fetch(`${API}/api/sos/alerts/${id}/resolve`, { method: 'PATCH' })
      const data = await res.json()
      if (data.success) {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'RESOLVED', resolvedAt: new Date().toISOString() } : a))
      }
    } catch (err) {
      console.error('Failed to resolve alert:', err)
    } finally {
      setResolvingId(null)
    }
  }

  const filtered = alerts.filter(a => filter === 'ALL' ? true : a.status === filter)
  const activeCount = alerts.filter(a => a.status === 'ACTIVE').length

  return (
    <div style={{ background: '#161618', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTopbar pageTitle="Live SOS Feed" />

      <div className="px-4 py-6 md:px-8 md:py-10 max-w-[1200px] mx-auto w-full flex-1">

        {/* Header */}
        <div style={{ marginBottom: 32, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <AlertTriangle size={32} color="#EF4444" /> Active SOS Alerts
              {activeCount > 0 && (
                <span style={{ background: '#EF4444', color: '#FFF', fontSize: 14, fontWeight: 700, padding: '2px 10px', borderRadius: 20, minWidth: 28, textAlign: 'center' }}>
                  {activeCount}
                </span>
              )}
            </h1>
            <p style={{ color: '#9CA3AF', fontSize: 14 }}>
              Real-time feed • auto-refreshes every 10s • Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          </div>
          <button onClick={() => { setLoading(true); fetchAlerts() }}
            style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 8, padding: '10px 16px', color: '#F8FAFC', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(['ALL', 'ACTIVE', 'RESOLVED'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.15s',
                background: filter === f ? (f === 'ACTIVE' ? '#EF4444' : f === 'RESOLVED' ? '#10B981' : '#7C3AED') : '#1A1C20',
                color: filter === f ? '#FFF' : '#9CA3AF'
              }}>
              {f} {f === 'ACTIVE' && activeCount > 0 ? `(${activeCount})` : f === 'ALL' ? `(${alerts.length})` : ''}
            </button>
          ))}
        </div>

        {/* Alert List */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
            <Loader size={32} color="#7C3AED" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ color: '#9CA3AF', padding: 48, textAlign: 'center', background: '#1A1C20', borderRadius: 12 }}>
            <Shield size={48} color="#334155" style={{ margin: '0 auto 16px', display: 'block' }} />
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No {filter !== 'ALL' ? filter.toLowerCase() : ''} alerts</div>
            <div style={{ fontSize: 14 }}>System is clear. All passengers safe.</div>
          </div>
        ) : (
          <AnimatePresence>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filtered.map((alert, i) => {
                const typeInfo = TYPE_LABELS[alert.type] || { label: alert.type, color: '#9CA3AF' }
                const isActive = alert.status === 'ACTIVE'
                const googleMaps = alert.lat && alert.lng
                  ? `https://www.google.com/maps/search/?api=1&query=${alert.lat},${alert.lng}`
                  : null

                return (
                  <motion.div key={alert.id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    style={{ background: '#1A1C20', border: `1px solid ${isActive ? '#EF444440' : '#10B98130'}`, borderLeft: `4px solid ${isActive ? '#EF4444' : '#10B981'}`, borderRadius: 12, padding: 24 }}>

                    {/* Alert Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                          <span style={{ background: `${typeInfo.color}22`, color: typeInfo.color, fontSize: 13, fontWeight: 700, padding: '4px 12px', borderRadius: 12, border: `1px solid ${typeInfo.color}44` }}>
                            {typeInfo.label}
                          </span>
                          <span style={{ background: isActive ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)', color: isActive ? '#EF4444' : '#10B981', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12 }}>
                            {alert.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9CA3AF', fontSize: 12 }}>
                          <Clock size={12} />
                          {new Date(alert.createdAt).toLocaleString('en-IN')}
                          {alert.resolvedAt && <span style={{ color: '#10B981' }}> • Resolved: {new Date(alert.resolvedAt).toLocaleString('en-IN')}</span>}
                        </div>
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#475569', background: '#0F0F12', padding: '4px 8px', borderRadius: 6 }}>
                        #{alert.id.slice(-8)}
                      </div>
                    </div>

                    {/* Location */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#E2E8F0', fontSize: 14, marginBottom: 16, background: '#0F0F12', padding: '10px 14px', borderRadius: 8 }}>
                      <MapPin size={16} color="#38BDF8" />
                      <span>{alert.location}</span>
                      {googleMaps && (
                        <a href={googleMaps} target="_blank" rel="noreferrer"
                          style={{ marginLeft: 'auto', fontSize: 11, color: '#38BDF8', textDecoration: 'none', fontWeight: 600 }}>
                          View Map ↗
                        </a>
                      )}
                    </div>

                    {/* User Info */}
                    {alert.user ? (
                      <div style={{ background: '#111114', border: '1px solid #2A2D35', borderRadius: 10, padding: '16px 18px', marginBottom: 16 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Passenger Details</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#E2E8F0' }}>
                            <User size={14} color="#7C3AED" /> <span style={{ fontWeight: 600 }}>Name:</span> {alert.user.name}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#E2E8F0' }}>
                            <Mail size={14} color="#7C3AED" /> <span style={{ fontWeight: 600 }}>Email:</span> {alert.user.email}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#E2E8F0' }}>
                            <Phone size={14} color="#7C3AED" /> <span style={{ fontWeight: 600 }}>Phone:</span> {alert.user.phone || 'N/A'}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#E2E8F0' }}>
                            <Shield size={14} color="#A855F7" />
                            <span style={{ fontWeight: 600 }}>Guardian:</span>
                            {alert.user.guardianEmail
                              ? <span>{alert.user.guardianName || ''} <a href={`mailto:${alert.user.guardianEmail}`} style={{ color: '#A855F7' }}>{alert.user.guardianEmail}</a></span>
                              : <span style={{ color: '#64748B' }}>Not registered</span>
                            }
                          </div>
                        </div>
                        {alert.notes && (
                          <div style={{ marginTop: 12, fontSize: 12, color: '#94A3B8', background: '#1A1C20', borderRadius: 6, padding: '8px 12px', borderLeft: '3px solid #334155' }}>
                            📝 {alert.notes}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ background: '#111114', border: '1px solid #2A2D35', borderRadius: 10, padding: '12px 18px', marginBottom: 16, fontSize: 13, color: '#64748B' }}>
                        No user account linked to this SOS.
                      </div>
                    )}

                    {/* Actions */}
                    {isActive && (
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <button onClick={() => resolveAlert(alert.id)} disabled={resolvingId === alert.id}
                          style={{ background: '#10B981', color: '#FFF', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, opacity: resolvingId === alert.id ? 0.6 : 1 }}>
                          {resolvingId === alert.id ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <CheckCircle size={14} />}
                          Resolve Alert
                        </button>
                        <button style={{ background: '#EF4444', color: '#FFF', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                          Dispatch Security
                        </button>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </AnimatePresence>
        )}
      </div>

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  )
}

export default AdminSOSFeed
