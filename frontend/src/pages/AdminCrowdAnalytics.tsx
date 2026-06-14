import React from 'react'
import { PageTopbar } from '../components/layout/Navbar'
import { Users, Activity } from 'lucide-react'

const AdminCrowdAnalytics: React.FC = () => {
  return (
    <div style={{ background: '#161618', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTopbar pageTitle="Crowd Analytics" />
      
      <div className="px-4 py-6 md:px-8 md:py-10 max-w-[1200px] mx-auto w-full flex-1">
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Users size={32} color="#38BDF8" /> Station Crowd Analytics
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: 14 }}>
            Overview of passenger density and crowd flow metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 12, padding: 24, gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC' }}>Current Density by Zone</h3>
              <Activity size={18} color="#38BDF8" />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { zone: 'Platform 1', density: 85, status: 'High' },
                { zone: 'Platform 2', density: 40, status: 'Normal' },
                { zone: 'North Concourse', density: 60, status: 'Moderate' },
                { zone: 'Ticketing Hall', density: 92, status: 'Critical' },
              ].map(z => (
                <div key={z.zone}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: '#F8FAFC', fontWeight: 600 }}>{z.zone}</span>
                    <span style={{ color: z.density > 80 ? '#EF4444' : z.density > 50 ? '#F59E0B' : '#10B981', fontWeight: 600 }}>{z.status} ({z.density}%)</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: '#2A2D35', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${z.density}%`, 
                      background: z.density > 80 ? '#EF4444' : z.density > 50 ? '#F59E0B' : '#10B981',
                      borderRadius: 4
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* Placeholder for small stats */}
            <div style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 12, padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#F8FAFC', marginBottom: 4 }}>14,209</div>
              <div style={{ fontSize: 13, color: '#9CA3AF' }}>Total Active Passengers</div>
            </div>
            <div style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 12, padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#EF4444', marginBottom: 4 }}>2</div>
              <div style={{ fontSize: 13, color: '#9CA3AF' }}>Zones Exceeding Capacity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCrowdAnalytics
