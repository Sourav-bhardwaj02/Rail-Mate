import React from 'react'
import { PageTopbar } from '../components/layout/Navbar'
import { ScanFace, MapPin } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const AdminMissingPersons: React.FC = () => {
  const { adminLogs } = useAppStore()
  const scanLogs = adminLogs.filter(log => log.event.toLowerCase().includes('scan') || log.event.toLowerCase().includes('match'))

  return (
    <div style={{ background: '#161618', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTopbar pageTitle="Person Monitoring" />
      
      <div className="px-4 py-6 md:px-8 md:py-10 max-w-[1200px] mx-auto w-full flex-1">
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <ScanFace size={32} color="#10B981" /> Person Monitoring AI
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: 14 }}>
            Logs and live matches from the missing person facial recognition system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scanLogs.length === 0 ? (
            <div style={{ color: '#9CA3AF', padding: 24, textAlign: 'center', background: '#1A1C20', borderRadius: 12, gridColumn: '1 / -1' }}>
              No active scans or matches found.
            </div>
          ) : (
            scanLogs.map(log => (
              <div key={log.id} style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC', marginBottom: 4 }}>{log.event}</h3>
                    <div style={{ fontSize: 13, color: '#9CA3AF' }}>Initiated by: {log.user} • Time: {log.time}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: log.color, background: `rgba(${parseInt(log.color.slice(1,3),16)}, ${parseInt(log.color.slice(3,5),16)}, ${parseInt(log.color.slice(5,7),16)}, 0.1)`, padding: '4px 12px', borderRadius: 12, display: 'flex', alignItems: 'center' }}>
                    {log.status}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#E2E8F0', fontSize: 14 }}>
                  <MapPin size={18} color="#38BDF8" /> {log.location}
                </div>
                {log.status.includes('Match Found') && (
                  <div style={{ marginTop: 16, padding: '12px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 8 }}>
                    <div style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>94% Confidence Match</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF' }}>Camera Feed: CAM-042</div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminMissingPersons
