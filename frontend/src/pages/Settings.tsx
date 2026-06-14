import React from 'react'
import { PageTopbar } from '../components/layout/Navbar'
import { Settings as SettingsIcon, Shield, Bell, User, Database, Sliders } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const Settings: React.FC = () => {
  const { userId } = useAppStore()
  const isAdmin = userId === 'admin'

  return (
    <div style={{ background: '#161618', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTopbar pageTitle="Settings" />
      
      <div className="px-4 py-6 md:px-8 md:py-10 max-w-[900px] mx-auto w-full flex-1">
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <SettingsIcon size={32} color="#A855F7" /> System Settings
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: 14 }}>
            Manage your account preferences and global system configurations.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Admin Specific Settings */}
          {isAdmin && (
            <>
              <div style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 12, padding: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={18} color="#10B981" /> Security & Access Control
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC' }}>Two-Factor Authentication</div>
                      <div style={{ fontSize: 12, color: '#9CA3AF' }}>Require 2FA for all administrative logins</div>
                    </div>
                    <input type="checkbox" defaultChecked style={{ width: 18, height: 18, accentColor: '#10B981' }} />
                  </div>
                  <div style={{ height: 1, background: '#2A2D35' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC' }}>Session Timeout</div>
                      <div style={{ fontSize: 12, color: '#9CA3AF' }}>Automatically log out inactive admins</div>
                    </div>
                    <select style={{ background: '#121216', border: '1px solid #374151', color: '#FFF', padding: '4px 8px', borderRadius: 4 }}>
                      <option>15 Minutes</option>
                      <option>30 Minutes</option>
                      <option>1 Hour</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 12, padding: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sliders size={18} color="#38BDF8" /> System Thresholds
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC' }}>Crowd Density Alert Level</div>
                      <div style={{ fontSize: 12, color: '#9CA3AF' }}>Trigger warning when zone exceeds this % capacity</div>
                    </div>
                    <input type="number" defaultValue={85} style={{ background: '#121216', border: '1px solid #374151', color: '#FFF', padding: '4px 8px', borderRadius: 4, width: 60 }} />
                  </div>
                  <div style={{ height: 1, background: '#2A2D35' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC' }}>AI Match Confidence Level</div>
                      <div style={{ fontSize: 12, color: '#9CA3AF' }}>Minimum confidence required to flag a missing person match</div>
                    </div>
                    <input type="number" defaultValue={90} style={{ background: '#121216', border: '1px solid #374151', color: '#FFF', padding: '4px 8px', borderRadius: 4, width: 60 }} />
                  </div>
                </div>
              </div>

              <div style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 12, padding: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Database size={18} color="#A855F7" /> Data Retention
                </h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC' }}>Purge SOS Logs</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>Automatically clear resolved emergency logs after 30 days</div>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: 18, height: 18, accentColor: '#10B981' }} />
                </div>
              </div>
            </>
          )}

          {/* Normal User Settings */}
          {!isAdmin && (
            <div style={{ background: '#1A1C20', border: '1px solid #2A2D35', borderRadius: 12, padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <User size={18} color="#38BDF8" /> Account Profile
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC' }}>Push Notifications</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>Receive alerts for delays and station updates</div>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: 18, height: 18, accentColor: '#A855F7' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
