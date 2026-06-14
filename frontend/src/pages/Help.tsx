import React from 'react'
import { PageTopbar } from '../components/layout/Navbar'
import { HelpCircle, ShieldCheck, AlertTriangle, ScanFace, Users } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const Help: React.FC = () => {
  const { userId } = useAppStore()
  const isAdmin = userId === 'admin'

  return (
    <div style={{ background: '#161618', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTopbar pageTitle="Help & Documentation" />
      
      <div className="px-4 py-6 md:px-8 md:py-10 max-w-[900px] mx-auto w-full flex-1">
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <HelpCircle size={32} color="#38BDF8" /> How to use RailMate AI
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: 14 }}>
            Comprehensive guide to navigating the platform.
          </p>
        </div>

        {isAdmin && (
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#10B981', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={20} /> Administrator Guide
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShieldCheck size={16} color="#9CA3AF" /> Admin Dashboard
                </h3>
                <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6 }}>
                  Provides a high-level overview of system health, active alerts, and recent network activity. You can monitor the live pulse of the station security systems here. It acts as the central command center.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AlertTriangle size={16} color="#EF4444" /> Live SOS Feed
                </h3>
                <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6 }}>
                  When any user presses the red "Emergency SOS" button on their device, an alert immediately appears in this feed. You can view the user's ID, GPS location, and choose to immediately dispatch security teams or mark the alert as resolved.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ScanFace size={16} color="#10B981" /> Person Monitoring
                </h3>
                <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6 }}>
                  Tracks the AI Facial Recognition system. When a missing person scan is initiated by a user, the system begins scanning all active camera feeds. If a high-probability match (e.g. 94%) is confirmed, a live notification with the specific camera feed and location is displayed here.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Users size={16} color="#38BDF8" /> Crowd Analytics
                </h3>
                <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6 }}>
                  Displays real-time passenger density across different zones (e.g., Platforms, Concourses, Ticketing Hall). Zones turning red (above 85% capacity) indicate critical overcrowding requiring immediate crowd control protocols.
                </p>
              </div>
            </div>
          </div>
        )}

        {!isAdmin && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F8FAFC', marginBottom: 8 }}>Emergency SOS</h3>
              <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6 }}>
                If you are in danger, tap the red SOS button to instantly alert station security and notify your emergency contacts.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F8FAFC', marginBottom: 8 }}>Missing Person Locator</h3>
              <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6 }}>
                Upload photos of a missing person and the system will run an AI facial recognition scan across all active station cameras to locate them.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Help
