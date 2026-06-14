import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  List, Map as MapIcon, Volume2, AlertTriangle, Users,
<<<<<<< HEAD
  CheckCircle, Filter, UserCog, Megaphone, Train, UserX, UserCheck, Sparkles, Grid
=======
  CheckCircle, Filter, UserCog, Megaphone, Train, UserX, UserCheck
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
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
<<<<<<< HEAD
  ({ LOW: '#10B981', MEDIUM: '#EAB308', HIGH: '#F43F5E' }[l])
=======
  ({ LOW: '#10B981', MEDIUM: '#F59E0B', HIGH: '#EF4444' }[l])
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98

/* ─── Station floor-plan heatmap ─── */
const StationHeatmap = () => {
  return (
    <div style={{
<<<<<<< HEAD
      width: '100%', height: '400px',
      backgroundImage: 'url(/crowd-heatmap-full.png)',
      backgroundSize: '180%',
      backgroundPosition: '85% 45%',
      backgroundRepeat: 'no-repeat',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.05)'
    }} />
=======
      position: 'relative', width: '100%', height: 180,
      background: '#1A1D24', borderRadius: 8,
      border: '1px solid #2A2D35',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* Abstract Heatmap Visualization */}
      <svg width="100%" height="100%" viewBox="0 0 400 200" style={{ position: 'absolute', inset: 0 }}>
        {/* Grid lines */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Isometric base */}
        <g transform="translate(200, 100) scale(1, 0.5) rotate(45)">
          <rect x="-100" y="-100" width="200" height="200" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <path d="M-60,-100 v200 M-20,-100 v200 M20,-100 v200 M60,-100 v200" stroke="rgba(255,255,255,0.05)" />
          <path d="M-100,-60 h200 M-100,-20 h200 M-100,20 h200 M-100,60 h200" stroke="rgba(255,255,255,0.05)" />
          
          {/* Blocks */}
          <rect x="-80" y="-80" width="40" height="60" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
          <rect x="40" y="-80" width="40" height="60" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
          <rect x="-80" y="20" width="160" height="60" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
        </g>
        
        {/* Glowing Dots (Overlayed) */}
        <circle cx="160" cy="110" r="6" fill="#EF4444" opacity="0.8" />
        <circle cx="160" cy="110" r="16" fill="#EF4444" opacity="0.2" />
        <text x="160" y="113" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">!</text>

        <circle cx="280" cy="120" r="5" fill="#F59E0B" opacity="0.8" />
        <circle cx="280" cy="120" r="14" fill="#F59E0B" opacity="0.2" />
        
        <circle cx="300" cy="90" r="4" fill="#10B981" opacity="0.8" />
        <circle cx="300" cy="90" r="10" fill="#10B981" opacity="0.2" />
      </svg>
    </div>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
  )
}

/* ─── OccupancyBar ─── */
const OccupancyBar = ({ value, delay = 0 }: { value: number; delay?: number }) => {
<<<<<<< HEAD
  const c = value > 70 ? '#F43F5E' : value > 40 ? '#EAB308' : '#10B981'
=======
  const c = value > 70 ? '#FCA5A5' : value > 40 ? '#FCD34D' : '#6EE7B7' // Slightly softer colors for the bar as in the image
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
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
<<<<<<< HEAD
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
=======
    <div style={{ background: '#1A1A1A', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Topbar mimicking the grey background behind the white main area */}
      <div style={{ padding: '20px 32px', background: '#222327' }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: '#9CA3AF', margin: 0 }}>Crowd Intelligence Dashboard</h1>
      </div>

      <div style={{ background: '#FFFFFF', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="p-4 md:p-8 flex-1 w-full max-w-full overflow-hidden">

          {/* ── Network banner ── */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#111827', marginBottom: 4 }}>Network Crowd Status</div>
              <div style={{ fontSize: 12, color: '#4B5563', display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, background: '#3B82F6', borderRadius: '50%' }}></div>
                Live updates from AI sensor network.
              </div>
            </div>
            <div style={{ 
              background: '#202125', color: '#F8FAFC', borderRadius: 20, 
              padding: '8px 16px', fontSize: 11, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <div style={{ background: '#030D1D', borderRadius: '50%', padding: 4 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              RailMate Insight: Central Station avoiding peak congestion.
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
            </div>
          </div>

          {/* ── System Overview + Heatmap ── */}
<<<<<<< HEAD
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
=======
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 mb-8">

            {/* System Overview */}
            <div style={{ background: '#202125', borderRadius: 12, padding: 20, color: '#FFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <List size={16} color="#9CA3AF" />
                <span style={{ fontWeight: 600, fontSize: 14 }}>System Overview</span>
              </div>
              {[
                { label: 'High Crowd Zones', value: 3, color: '#FCA5A5', borderColor: '#FCA5A5', icon: <AlertTriangle size={18} color="#FCA5A5" /> },
                { label: 'Medium Crowd Zones', value: 8, color: '#FCD34D', borderColor: '#FCD34D', icon: <Users size={18} color="#FCD34D" /> },
                { label: 'Low Crowd Zones', value: 24, color: '#6EE7B7', borderColor: '#6EE7B7', icon: <CheckCircle size={18} color="#6EE7B7" /> },
              ].map((item, idx) => (
                <div key={item.label} style={{
                  marginBottom: idx === 2 ? 0 : 12, padding: '14px 16px',
                  background: '#1A1D24', borderRadius: 8,
                  borderLeft: `3px solid ${item.borderColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: item.color, lineHeight: 1 }}>{item.value}</div>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                  </div>
                  {item.icon}
                </div>
              ))}
            </div>

            {/* Live Heatmap */}
<<<<<<< HEAD
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
=======
            <div style={{ background: '#202125', borderRadius: 12, padding: 20, color: '#FFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapIcon size={16} color="#021027" />
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Live Platform Heatmap</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[['#10B981', 'Live'], ['#F59E0B', 'Medium'], ['#EF4444', 'High']].map(([c, l]) => (
                    <span key={l} style={{ 
                      display: 'flex', alignItems: 'center', gap: 6,
                      border: `1px solid ${c}40`, borderRadius: 12, padding: '2px 8px',
                      fontSize: 10, color: c, fontWeight: 600
                    }}>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                      {l}
                    </span>
                  ))}
                </div>
              </div>
<<<<<<< HEAD
              
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
=======
              <StationHeatmap />
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
            </div>
          </div>

          {/* ── Active Congestion Alerts ── */}
          <div style={{ marginBottom: 32 }}>
<<<<<<< HEAD
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
=======
            <div style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Volume2 size={16} color="#EF4444" /> Active Congestion Alerts
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              
              {/* Alert 1 */}
              <div style={{ background: '#202125', borderRadius: 12, padding: 20, borderLeft: '3px solid #EF4444', color: '#FFF', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>Platform 4 North</span>
                  <span style={{ background: '#EF4444', color: '#FFF', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 12, textTransform: 'uppercase' }}>
                    High Crowd
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                  Train 6:42 to City Center is delayed. Passengers accumulating. Expect significant delays boarding.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button style={{ 
                    background: 'transparent', border: '1px solid #374151', color: '#E5E7EB',
<<<<<<< HEAD
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
=======
                    borderRadius: 6, padding: '8px 12px', fontSize: 11, fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer'
                  }}>
                    <Filter size={12} /> Suggest Alternative Route
                  </button>
                  <button style={{ 
                    background: 'transparent', border: '1px solid #374151', color: '#E5E7EB',
                    borderRadius: 6, padding: '8px 12px', fontSize: 11, fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer'
                  }}>
                    <UserCog size={12} /> Dispatch Staff Assistant
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                  </button>
                </div>
              </div>

              {/* Alert 2 */}
<<<<<<< HEAD
              <div style={{ background: '#16171B', borderRadius: 12, padding: 20, borderLeft: '4px solid #EAB308', border: '1px solid rgba(255,255,255,0.05)', color: '#FFF', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>South Concourse Entrance</span>
                  <span style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#EAB308', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 12, textTransform: 'uppercase' }}>
                    Medium Crowd
                  </span>
                </div>
                <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
=======
              <div style={{ background: '#202125', borderRadius: 12, padding: 20, borderLeft: '3px solid #FCD34D', color: '#FFF', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>South Concourse Entrance</span>
                  <span style={{ background: 'rgba(252, 211, 77, 0.2)', color: '#FCD34D', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 12, textTransform: 'uppercase' }}>
                    Medium Crowd
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                  Elevator maintenance causing minor bottleneck in stairs. Flow is steady but slow.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button style={{ 
                    background: 'transparent', border: '1px solid #374151', color: '#E5E7EB',
<<<<<<< HEAD
                    borderRadius: 8, padding: '10px 16px', fontSize: 12, fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    <Megaphone size={14} /> Broadcast Announcement
=======
                    borderRadius: 6, padding: '8px 12px', fontSize: 11, fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer'
                  }}>
                    <Megaphone size={12} /> Broadcast Announcement
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ── Approaching Train Occupancy ── */}
<<<<<<< HEAD
          <div style={{ background: '#16171B', borderRadius: 12, padding: 24, color: '#FFF', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2 mb-6">
              <Train size={18} color="#A855F7" />
              <span className="font-semibold text-base">Approaching Train Occupancy</span>
=======
          <div style={{ background: '#202125', borderRadius: 12, padding: 20, color: '#FFF' }}>
            <div className="flex items-center gap-2 mb-4">
              <Train size={16} color="#A855F7" />
              <span className="font-semibold text-sm">Approaching Train Occupancy</span>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
            </div>
            <div className="overflow-x-auto w-full">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #374151' }}>
                  {['Service', 'Destination', 'ETA', 'Occupancy Status', 'Accessibility'].map(h => (
<<<<<<< HEAD
                    <th key={h} style={{ padding: '16px 12px', fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>{h}</th>
=======
                    <th key={h} style={{ padding: '12px 8px', fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>{h}</th>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRAINS.map((train, i) => (
                  <tr key={train.service} style={{ borderBottom: i < TRAINS.length - 1 ? '1px solid #2A2D35' : 'none' }}>
<<<<<<< HEAD
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
=======
                    <td style={{ padding: '16px 8px', fontWeight: 600, fontSize: 12, color: '#F8FAFC' }}>{train.service}</td>
                    <td style={{ padding: '16px 8px', fontSize: 12, color: '#D1D5DB' }}>{train.destination}</td>
                    <td style={{ padding: '16px 8px', fontSize: 12, color: '#60A5FA' }}>{train.eta}</td>
                    <td style={{ padding: '16px 8px', width: '35%' }}>
                      <OccupancyBar value={train.occupancy} delay={i * 0.1} />
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      {train.accessible
                        ? <UserCheck size={16} color="#6EE7B7" />
                        : <UserX size={16} color="#9CA3AF" />}
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

        </div>

        {/* Footer */}
<<<<<<< HEAD
        <div className="bg-[#111118] px-4 py-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left border-t border-[rgba(255,255,255,0.05)]">
          <div style={{ fontSize: 12, color: '#6B7280' }}>
            © 2024 RailMate AI. Modern Minimalist Railway Support.
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[12px] font-medium">
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Emergency Contacts</a>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Accessibility Policy</a>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>System Health</a>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Terms</a>
=======
        <div className="bg-[#18181B] px-4 py-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div style={{ fontSize: 11, color: '#A1A1AA' }}>
            © 2024 RailMate AI. Modern Minimalist Railway Support.
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[11px]">
            <a href="#" style={{ color: '#A1A1AA', textDecoration: 'none' }}>Emergency Contacts</a>
            <a href="#" style={{ color: '#A1A1AA', textDecoration: 'none' }}>Accessibility Policy</a>
            <a href="#" style={{ color: '#A1A1AA', textDecoration: 'none' }}>System Health</a>
            <a href="#" style={{ color: '#A1A1AA', textDecoration: 'none' }}>Terms</a>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrowdDashboard
<<<<<<< HEAD
=======

>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
