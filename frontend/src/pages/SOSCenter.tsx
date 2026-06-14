import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Asterisk, Briefcase, Shield, AlertCircle, Contact, Phone, User, MapPin, CheckCircle, XCircle, Loader, PencilLine, Save, X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const API = import.meta.env.VITE_API_URL

const EMERGENCY_TYPES = [
  { id: 'MEDICAL',      label: 'Medical',        sublabel: 'Request first aid or ambulance',         icon: Briefcase, color: '#A855F7' },
  { id: 'WOMEN_SAFETY', label: 'Women Safety',   sublabel: 'Direct line to dedicated personnel',      icon: Shield,    color: '#EC4899' },
  { id: 'SECURITY',     label: 'Security Issue', sublabel: 'Report suspicious activity or harassment', icon: AlertCircle, color: '#EF4444' },
]

type Status = 'idle' | 'locating' | 'sending' | 'success' | 'error'
interface GpsCoords { lat: number; lng: number; label: string }

interface Guardian { name: string; email: string }

const SOSCenter: React.FC = () => {
  const { sosActive, setSosActive, isLoggedIn, userId, setShowLoginModal, addAdminLog } = useAppStore()
  const [selectedType, setSelectedType] = useState('SECURITY')
  const [status, setStatus] = useState<Status>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const [alertId, setAlertId] = useState<string | null>(null)
  const [coords, setCoords] = useState<GpsCoords | null>(null)

  // Guardian state
  const [guardian, setGuardian] = useState<Guardian>({ name: '', email: '' })
  const [editingGuardian, setEditingGuardian] = useState(false)
  const [guardianDraft, setGuardianDraft] = useState<Guardian>({ name: '', email: '' })
  const [savingGuardian, setSavingGuardian] = useState(false)
  const [guardianMsg, setGuardianMsg] = useState('')

  // Get GPS on mount
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: `GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}` }),
      () => setCoords({ lat: 28.6448, lng: 77.2167, label: 'New Delhi Railway Station (approx)' }),
      { timeout: 8000 }
    )
  }, [])

  // Fetch profile (guardian info)
  useEffect(() => {
    if (!isLoggedIn || !userId) return
    fetch(`${API}/api/auth/profile/${userId}`)
      .then(r => r.json())
      .then(d => {
        if (d.guardianEmail || d.guardianName) {
          const g = { name: d.guardianName || '', email: d.guardianEmail || '' }
          setGuardian(g)
          setGuardianDraft(g)
        }
      })
      .catch(() => {})
  }, [isLoggedIn, userId])

  const saveGuardian = async () => {
    if (!userId) return
    setSavingGuardian(true)
    setGuardianMsg('')
    try {
      const res = await fetch(`${API}/api/auth/guardian`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, guardianName: guardianDraft.name, guardianEmail: guardianDraft.email })
      })
      const data = await res.json()
      if (data.success) {
        setGuardian(guardianDraft)
        setEditingGuardian(false)
        setGuardianMsg('✓ Guardian saved successfully')
        setTimeout(() => setGuardianMsg(''), 3000)
      } else {
        setGuardianMsg('Failed to save. Try again.')
      }
    } catch {
      setGuardianMsg('Connection error. Try again.')
    } finally {
      setSavingGuardian(false)
    }
  }

  const triggerSOS = async (type: string) => {
    if (!isLoggedIn) { setShowLoginModal(true); return }
    if (status === 'sending' || status === 'success') return

    setSelectedType(type)
    setStatus('locating')
    setStatusMsg('Acquiring your location…')

    let finalCoords = coords
    if (!finalCoords) {
      await new Promise<void>((resolve) => {
        navigator.geolocation?.getCurrentPosition(
          (pos) => { finalCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude, label: `GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}` }; setCoords(finalCoords!); resolve() },
          () => { finalCoords = { lat: 28.6448, lng: 77.2167, label: 'New Delhi Railway Station (approx)' }; setCoords(finalCoords!); resolve() },
          { timeout: 5000 }
        )
      })
    }

    setStatus('sending')
    setStatusMsg('Dispatching SOS alert…')
    setSosActive(true)

    try {
      const res = await fetch(`${API}/api/sos/alert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, location: finalCoords?.label || 'Unknown', lat: finalCoords?.lat, lng: finalCoords?.lng, notes: `Triggered via RailMate SOS — ${type}`, userId: userId || undefined })
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setAlertId(data.alertId)
        setStatusMsg('Alert dispatched! Authorities & guardian notified via email.')
        addAdminLog({ event: `SOS Alert — ${type}`, user: userId || 'User', location: finalCoords?.label || 'Unknown', status: 'Active', color: '#EF4444' })
      } else {
        throw new Error(data.error || 'SOS dispatch failed')
      }
    } catch (err: any) {
      setStatus('error')
      setStatusMsg(err.message || 'Could not connect to backend.')
      setSosActive(false)
    }
  }

  const resetSOS = () => { setStatus('idle'); setStatusMsg(''); setAlertId(null); setSosActive(false) }

  return (
    <div style={{ background: '#161618', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Topbar */}
      <div className="px-4 py-4 md:px-10 md:py-6 flex justify-between items-center">
        <div className="font-extrabold text-base text-[#F8FAFC]">RailMate AI</div>
        <div className="hidden md:flex gap-8">
          {['Route Planner', 'Station Map', 'Crowd Monitoring'].map(item => (
            <div key={item} style={{ fontSize: 12, color: '#9CA3AF', cursor: 'pointer', fontWeight: 600 }}>{item}</div>
          ))}
          <div style={{ fontSize: 12, color: '#F8FAFC', fontWeight: 600, borderBottom: '2px solid #F8FAFC', paddingBottom: 6 }}>SOS Center</div>
        </div>
      </div>
      <div style={{ height: 2, background: '#6D28D9', width: '100%' }} />

      <div className="px-4 md:px-8 max-w-[900px] mx-auto w-full flex-1">

        {/* ── SOS Hero ── */}
        <div style={{ textAlign: 'center', padding: '48px 0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <motion.button
              onClick={() => triggerSOS(selectedType)}
              disabled={status === 'sending' || status === 'success'}
              whileHover={status === 'idle' ? { scale: 1.05 } : {}}
              whileTap={status === 'idle' ? { scale: 0.95 } : {}}
              animate={sosActive ? { boxShadow: ['0 0 20px rgba(239,68,68,0.5)', '0 0 80px rgba(239,68,68,1)', '0 0 20px rgba(239,68,68,0.5)'] } : { boxShadow: '0 0 0px rgba(239,68,68,0)' }}
              transition={sosActive ? { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } : {}}
              style={{ width: 160, height: 160, borderRadius: '50%', background: sosActive ? '#991B1B' : '#7F1D1D', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: status === 'sending' || status === 'success' ? 'not-allowed' : 'pointer' }}
            >
              <div style={{ width: 110, height: 110, borderRadius: '50%', background: '#FECACA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                {status === 'sending' || status === 'locating'
                  ? <Loader size={36} color="#7F1D1D" style={{ animation: 'spin 1s linear infinite' }} />
                  : <Asterisk size={40} color="#7F1D1D" strokeWidth={3} />}
                <span style={{ fontSize: 16, fontWeight: 800, color: '#7F1D1D', marginTop: 4, letterSpacing: 1 }}>SOS</span>
              </div>
            </motion.button>
          </div>
          <div style={{ fontWeight: 400, fontSize: 26, marginBottom: 12, color: '#F8FAFC', fontFamily: 'Georgia, serif' }}>Immediate Assistance</div>
          <p style={{ fontSize: 13, color: '#9CA3AF', maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>
            Tap to alert station security and your registered guardian instantly via email.
          </p>

          {/* Status Toast */}
          <AnimatePresence>
            {status !== 'idle' && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 10, background: status === 'success' ? 'rgba(16,185,129,0.15)' : status === 'error' ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)', border: `1px solid ${status === 'success' ? '#10B981' : status === 'error' ? '#EF4444' : '#3B82F6'}`, borderRadius: 12, padding: '10px 20px', fontSize: 13, color: '#F8FAFC' }}>
                {status === 'success' && <CheckCircle size={16} color="#10B981" />}
                {status === 'error' && <XCircle size={16} color="#EF4444" />}
                {(status === 'sending' || status === 'locating') && <Loader size={16} color="#3B82F6" style={{ animation: 'spin 1s linear infinite' }} />}
                <span>{statusMsg}</span>
                {alertId && <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#10B981' }}>#{alertId.slice(-8)}</span>}
                {(status === 'success' || status === 'error') && (
                  <button onClick={resetSOS} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0, marginLeft: 8 }}>×</button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Live Location Bar ── */}
        <div className="bg-[#202125] rounded-lg p-4 md:px-5 md:py-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-blue-500">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={20} color="#3B82F6" />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1, marginBottom: 4 }}>LIVE LOCATION</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC' }}>{coords ? coords.label : 'Acquiring GPS…'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: coords ? '#10B981' : '#F59E0B', display: 'inline-block' }} className={coords ? 'dot-pulse' : ''} />
            <span style={{ fontSize: 12, fontWeight: 600, color: coords ? '#10B981' : '#F59E0B' }}>{coords ? 'Location Ready' : 'Locating…'}</span>
          </div>
        </div>

        {/* ── Emergency Type Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {EMERGENCY_TYPES.map(type => {
            const Icon = type.icon
            const isSelected = selectedType === type.id
            return (
              <motion.button key={type.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => triggerSOS(type.id)}
                style={{ background: isSelected ? `${type.color}18` : '#202125', border: `1px solid ${isSelected ? type.color : 'transparent'}`, borderRadius: 12, padding: '24px 20px', cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', transition: 'all 0.2s' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${type.color}18`, border: `1px solid ${type.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={16} color={type.color} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#F8FAFC', marginBottom: 8 }}>{type.label}</div>
                <div style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.5, marginBottom: 12 }}>{type.sublabel}</div>
                <div style={{ fontSize: 11, color: type.color, fontWeight: 600 }}>Tap to send SOS →</div>
              </motion.button>
            )
          })}
        </div>

        {/* ── Guardian Card ── */}
        <div style={{ background: '#202125', borderRadius: 12, padding: '24px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: 8 }}>
              <User size={16} color="#A855F7" /> Guardian Contact
            </div>
            {isLoggedIn && !editingGuardian && (
              <button onClick={() => { setEditingGuardian(true); setGuardianDraft(guardian) }}
                style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', color: '#A855F7', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <PencilLine size={13} /> {guardian.email ? 'Edit' : 'Add Guardian'}
              </button>
            )}
          </div>

          {!isLoggedIn ? (
            <div style={{ fontSize: 13, color: '#F59E0B', background: 'rgba(245,158,11,0.1)', borderRadius: 8, padding: '12px 16px' }}>
              ⚠ Please log in to add a guardian. Your guardian will be auto-notified when you trigger SOS.
            </div>
          ) : editingGuardian ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#9CA3AF', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Guardian Name</label>
                  <input value={guardianDraft.name} onChange={e => setGuardianDraft(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Rahul Sharma"
                    style={{ width: '100%', background: '#161618', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#F8FAFC', fontSize: 13, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#9CA3AF', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Guardian Email</label>
                  <input type="email" value={guardianDraft.email} onChange={e => setGuardianDraft(p => ({ ...p, email: e.target.value }))}
                    placeholder="guardian@email.com"
                    style={{ width: '100%', background: '#161618', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#F8FAFC', fontSize: 13, outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={saveGuardian} disabled={savingGuardian || !guardianDraft.email}
                  style={{ background: '#A855F7', border: 'none', color: '#FFF', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, opacity: savingGuardian || !guardianDraft.email ? 0.6 : 1 }}>
                  {savingGuardian ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
                  Save Guardian
                </button>
                <button onClick={() => { setEditingGuardian(false); setGuardianDraft(guardian) }}
                  style={{ background: 'transparent', border: '1px solid #374151', color: '#9CA3AF', borderRadius: 8, padding: '10px 16px', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <X size={14} /> Cancel
                </button>
              </div>
              {guardianMsg && <div style={{ marginTop: 10, fontSize: 12, color: guardianMsg.startsWith('✓') ? '#10B981' : '#EF4444' }}>{guardianMsg}</div>}
            </div>
          ) : guardian.email ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#161618', padding: '14px 18px', borderRadius: 8, border: '1px solid rgba(168,85,247,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} color="#A855F7" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#F8FAFC' }}>{guardian.name || 'Guardian'}</div>
                  <div style={{ fontSize: 12, color: '#A855F7' }}>{guardian.email}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Will be auto-notified on SOS ✓</div>
                </div>
              </div>
              <a href={`mailto:${guardian.email}`}
                style={{ width: 40, height: 40, borderRadius: '50%', background: '#A855F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none' }}>
                <Phone size={16} fill="currentColor" />
              </a>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: '#64748B', background: '#161618', borderRadius: 8, padding: '14px 18px', borderLeft: '3px solid #334155' }}>
              No guardian added yet. Click "Add Guardian" to set up your emergency contact.
            </div>
          )}
          {guardianMsg && !editingGuardian && <div style={{ marginTop: 10, fontSize: 12, color: '#10B981' }}>{guardianMsg}</div>}
        </div>

        {/* ── Railway Helpline ── */}
        <div style={{ background: '#202125', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#F8FAFC', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Contact size={16} color="#9CA3AF" /> Railway Emergency Helpline
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#161618', padding: '12px 16px', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={18} color="#EF4444" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#F8FAFC' }}>Railway Emergency — 182</div>
                <div style={{ fontSize: 12, color: '#9CA3AF' }}>Available 24/7 across all stations</div>
              </div>
            </div>
            <a href="tel:182" style={{ width: 40, height: 40, borderRadius: '50%', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none' }}>
              <Phone size={18} fill="currentColor" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-6 pb-8">
          <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>RailMate AI</span>
          <div className="flex flex-wrap justify-center gap-6">
            {['Emergency Contacts', 'Accessibility Policy', 'System Health', 'Terms'].map(l => (
              <a key={l} href="#" style={{ fontSize: 11, color: '#64748B', textDecoration: 'none', fontWeight: 500 }}>{l}</a>
            ))}
          </div>
          <span style={{ fontSize: 11, color: '#64748B' }}>© 2024 RailMate AI.</span>
        </div>

      </div>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  )
}

export default SOSCenter
