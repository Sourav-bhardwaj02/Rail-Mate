import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  List, Map as MapIcon, Volume2, AlertTriangle, Users,
  CheckCircle, Filter, UserCog, Megaphone, Train, UserX, UserCheck, Sparkles, Grid
} from 'lucide-react'

/* ─── Static data ─── */
const PLATFORMS = [
  { id: 'p1', name: 'Platform 4 North', occupancy: 94, level: 'HIGH' as const,
    alert: 'Train 6:42 to City Center is delayed. Passengers accumulating. Expect significant delays boarding.' },
  { id: 'p2', name: 'South Concourse Entrance', occupancy: 61, level: 'MEDIUM' as const,
    alert: 'Elevator maintenance causing minor bottleneck in stairs. Flow is steady but slow.' },
]

const TRAINS = [
  { service: 'EX-204', destination: 'Central Hub', eta: '2 min', occupancy: 90, accessible: false },
  { service: 'LN-601', destination: 'Westside', eta: '8 min', occupancy: 65, accessible: true },
  { service: 'LN-602', destination: 'Eastside', eta: '12 min', occupancy: 30, accessible: true },
]

const levelColor = (l: 'LOW' | 'MEDIUM' | 'HIGH') =>
  ({ LOW: '#10B981', MEDIUM: '#EAB308', HIGH: '#F43F5E' }[l])

/* ─── Station floor-plan heatmap ─── */
const StationHeatmap = () => {
  return (
    <div style={{
      width: '100%', height: '400px',
      backgroundImage: 'url(/crowd-heatmap-full.png)',
      backgroundSize: '180%',
      backgroundPosition: '85% 45%',
      backgroundRepeat: 'no-repeat',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.05)'
    }} />
  )
}

/* ─── OccupancyBar ─── */
const OccupancyBar = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  const c = value > 70 ? '#F43F5E' : value > 40 ? '#EAB308' : '#10B981'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 6, background: '#333', borderRadius: 3, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay }}
          style={{ height: '100%', background: c, borderRadius: 3 }}
        />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 32 }}>{value}%</span>
    </div>
  )
}

/* ─── Page ─── */
const CrowdDashboard: React.FC = () => {
  return (
    <div style={{ background: '#0B0C10', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="p-4 md:p-8 flex-1 w-full max-w-full overflow-hidden">

          {/* ── Network banner ── */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div>
              <div style={{ fontWeight: 700, fontSize: 24, color: '#FFFFFF', marginBottom: 6 }}>Network Crowd Status</div>
              <div style={{ fontSize: 14, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, background: '#8B5CF6', borderRadius: '50%' }}></div>
                Live update from AI sensor network.
              </div>
            </div>
            <div style={{ 
              background: '#16171B', color: '#E5E7EB', borderRadius: 24, 
              padding: '10px 20px', fontSize: 13, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 10,
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <Sparkles size={16} color="#A855F7" />
              <span><span style={{ fontWeight: 700, color: '#FFFFFF' }}>RailMate Insight:</span> Central Station welding peak congestion.</span>
            </div>
          </div>

          {/* ── System Overview + Heatmap ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 mb-8">

            {/* System Overview */}
            <div style={{ background: '#16171B', borderRadius: 12, padding: 24, color: '#FFF', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <List size={20} color="#E5E7EB" />
                <span style={{ fontWeight: 600, fontSize: 18 }}>System Overview</span>
              </div>
              {[
                { label: 'High Crowd Zones', value: 3, color: '#F43F5E', borderColor: '#F43F5E', icon: <AlertTriangle size={24} color="#F43F5E" /> },
                { label: 'Medium Crowd Zones', value: 8, color: '#EAB308', borderColor: '#EAB308', icon: <Users size={24} color="#EAB308" /> },
                { label: 'Low Crowd Zones', value: 24, color: '#10B981', borderColor: '#10B981', icon: <CheckCircle size={24} color="#10B981" /> },
              ].map((item, idx) => (
                <div key={item.label} style={{
                  marginBottom: idx === 2 ? 0 : 16, padding: '20px 24px',
                  background: '#1C1D22', borderRadius: 12,
                  borderLeft: `4px solid ${item.borderColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 8 }}>{item.label}</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: item.color, lineHeight: 1 }}>{item.value}</div>
                  </div>
                  {item.icon}
                </div>
              ))}
            </div>

            {/* Live Heatmap */}
            <div style={{ background: '#16171B', borderRadius: 12, padding: 24, color: '#FFF', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Grid size={20} color="#3B82F6" />
                  <span style={{ fontWeight: 600, fontSize: 18 }}>Live Platform Heatmap</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[['#10B981', 'Live', true], ['#EAB308', 'Medium', true], ['#F43F5E', 'High', false]].map(([c, l, dot]) => (
                    <span key={l as string} style={{ 
                      display: 'flex', alignItems: 'center', gap: 6,
                      border: `1px solid ${c}40`, borderRadius: 16, padding: '4px 14px',
                      fontSize: 12, color: c as string, fontWeight: 500
                    }}>
                      {dot && <div style={{ width: 6, height: 6, borderRadius: '50%', background: c as string }}></div>}
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{ flex: 1, marginBottom: 24 }}>
                <StationHeatmap />
              </div>

              {/* Legend */}
              <div style={{ 
                background: '#1C1D22', borderRadius: 12, padding: '20px 24px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16
              }}>
                {[
                  { label: 'High Crowd', range: '70% - 100%', color: '#F43F5E' },
                  { label: 'Medium Crowd', range: '40% - 70%', color: '#EAB308' },
                  { label: 'Low Crowd', range: '10% - 40%', color: '#10B981' },
                  { label: 'Very Low Crowd', range: '0% - 10%', color: '#3B82F6' }
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: item.color }}></div>
                    <div>
                      <div style={{ fontSize: 14, color: '#E5E7EB', fontWeight: 500, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: item.color, fontWeight: 500 }}>{item.range}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Active Congestion Alerts ── */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#FFFFFF', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Volume2 size={18} color="#F43F5E" /> Active Congestion Alerts
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Alert 1 */}
              <div style={{ background: '#16171B', borderRadius: 12, padding: 20, borderLeft: '4px solid #F43F5E', border: '1px solid rgba(255,255,255,0.05)', color: '#FFF', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>Platform 4 North</span>
                  <span style={{ background: '#F43F5E', color: '#FFF', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 12, textTransform: 'uppercase' }}>
                    High Crowd
                  </span>
                </div>
                <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                  Train 6:42 to City Center is delayed. Passengers accumulating. Expect significant delays boarding.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button style={{ 
                    background: 'transparent', border: '1px solid #374151', color: '#E5E7EB',
                    borderRadius: 8, padding: '10px 16px', fontSize: 12, fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    <Filter size={14} /> Suggest Alternative Route
                  </button>
                  <button style={{ 
                    background: 'transparent', border: '1px solid #374151', color: '#E5E7EB',
                    borderRadius: 8, padding: '10px 16px', fontSize: 12, fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    <UserCog size={14} /> Dispatch Staff Assistant
                  </button>
                </div>
              </div>

              {/* Alert 2 */}
              <div style={{ background: '#16171B', borderRadius: 12, padding: 20, borderLeft: '4px solid #EAB308', border: '1px solid rgba(255,255,255,0.05)', color: '#FFF', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>South Concourse Entrance</span>
                  <span style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#EAB308', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 12, textTransform: 'uppercase' }}>
                    Medium Crowd
                  </span>
                </div>
                <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                  Elevator maintenance causing minor bottleneck in stairs. Flow is steady but slow.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button style={{ 
                    background: 'transparent', border: '1px solid #374151', color: '#E5E7EB',
                    borderRadius: 8, padding: '10px 16px', fontSize: 12, fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    <Megaphone size={14} /> Broadcast Announcement
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ── Approaching Train Occupancy ── */}
          <div style={{ background: '#16171B', borderRadius: 12, padding: 24, color: '#FFF', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2 mb-6">
              <Train size={18} color="#A855F7" />
              <span className="font-semibold text-base">Approaching Train Occupancy</span>
            </div>
            <div className="overflow-x-auto w-full">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #374151' }}>
                  {['Service', 'Destination', 'ETA', 'Occupancy Status', 'Accessibility'].map(h => (
                    <th key={h} style={{ padding: '16px 12px', fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRAINS.map((train, i) => (
                  <tr key={train.service} style={{ borderBottom: i < TRAINS.length - 1 ? '1px solid #2A2D35' : 'none' }}>
                    <td style={{ padding: '20px 12px', fontWeight: 600, fontSize: 14, color: '#F8FAFC' }}>{train.service}</td>
                    <td style={{ padding: '20px 12px', fontSize: 14, color: '#D1D5DB' }}>{train.destination}</td>
                    <td style={{ padding: '20px 12px', fontSize: 14, color: '#60A5FA' }}>{train.eta}</td>
                    <td style={{ padding: '20px 12px', width: '35%' }}>
                      <OccupancyBar value={train.occupancy} delay={i * 0.1} />
                    </td>
                    <td style={{ padding: '20px 12px' }}>
                      {train.accessible
                        ? <UserCheck size={18} color="#10B981" />
                        : <UserX size={18} color="#9CA3AF" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#111118] px-4 py-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left border-t border-[rgba(255,255,255,0.05)]">
          <div style={{ fontSize: 12, color: '#6B7280' }}>
            © 2024 RailMate AI. Modern Minimalist Railway Support.
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[12px] font-medium">
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Emergency Contacts</a>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Accessibility Policy</a>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>System Health</a>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrowdDashboard
