<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
=======
import React from 'react'
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
import { motion } from 'framer-motion'
import { PageTopbar } from '../components/layout/Navbar'
import { Users, AlertTriangle, ShieldCheck, Activity, Settings, Search, Bell } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

<<<<<<< HEAD
const API = 'http://localhost:5000'

const AdminPanel: React.FC = () => {
  const { adminLogs } = useAppStore()
  const [activeSOS, setActiveSOS] = useState(0)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/sos/alerts`)
        const data = await res.json()
        if (data.success) setActiveSOS(data.alerts.filter((a: any) => a.status === 'ACTIVE').length)
      } catch {}
    }
    load()
    const t = setInterval(load, 10000)
    return () => clearInterval(t)
  }, [])
=======
const AdminPanel: React.FC = () => {
  const { adminLogs } = useAppStore()

>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
  return (
    <div style={{ background: '#161618', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTopbar pageTitle="System Administration" />
      
      <div className="px-4 py-6 md:px-8 md:py-10 max-w-[1200px] mx-auto w-full flex-1">
        
        {/* Header */}
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <ShieldCheck size={32} color="#10B981" /> Admin Dashboard
            </h1>
            <p style={{ color: '#9CA3AF', fontSize: 14 }}>
              System overview, active alerts, and network health metrics.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: 16 }}>
            <button style={{ 
              background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 8, padding: '10px 16px',
              color: '#F8FAFC', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'
            }}>
              <Bell size={16} /> Notifications
            </button>
            <button style={{ 
              background: '#7C3AED', border: 'none', borderRadius: 8, padding: '10px 16px',
              color: '#FFF', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'
            }}>
              <Settings size={16} /> Settings
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Active Users', value: '42,892', icon: Users, color: '#38BDF8' },
<<<<<<< HEAD
            { label: 'Active SOS Alerts', value: String(activeSOS), icon: AlertTriangle, color: '#EF4444', pulse: activeSOS > 0 },
=======
            { label: 'Active SOS Alerts', value: '3', icon: AlertTriangle, color: '#EF4444' },
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
            { label: 'System Health', value: '99.8%', icon: Activity, color: '#10B981' },
            { label: 'Camera Feeds', value: '1,204', icon: Search, color: '#A855F7' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 12, padding: 20 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ 
                  width: 40, height: 40, borderRadius: 8, background: `rgba(${parseInt(stat.color.slice(1,3),16)}, ${parseInt(stat.color.slice(3,5),16)}, ${parseInt(stat.color.slice(5,7),16)}, 0.1)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <stat.icon size={20} color={stat.color} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: 12 }}>
                  +12%
                </span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#F8FAFC', marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2" style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#F8FAFC', marginBottom: 20 }}>Recent Activity Logs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {adminLogs.map((log) => (
                <div key={log.id} style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', background: '#121216', borderRadius: 8, border: '1px solid #2A2D35'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ fontSize: 12, color: '#9CA3AF', minWidth: 60 }}>{log.time}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC' }}>{log.event}</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>{log.user} • {log.location}</div>
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: 11, fontWeight: 600, color: log.color, background: `rgba(${parseInt(log.color.slice(1,3),16)}, ${parseInt(log.color.slice(3,5),16)}, ${parseInt(log.color.slice(5,7),16)}, 0.1)`, 
                    padding: '4px 10px', borderRadius: 12
                  }}>
                    {log.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 12, padding: 24 }}>
             <h2 style={{ fontSize: 16, fontWeight: 600, color: '#F8FAFC', marginBottom: 20 }}>System Modules</h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { name: 'User Management', desc: 'Manage roles & access' },
                  { name: 'Station Analytics', desc: 'Real-time crowd data' },
                  { name: 'AI Face Recognition', desc: 'Model config & training' },
                  { name: 'Emergency Protocols', desc: 'SOS config & contacts' }
                ].map((mod, i) => (
                  <div key={i} style={{ 
                    padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer', transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC', marginBottom: 4 }}>{mod.name}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>{mod.desc}</div>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminPanel
