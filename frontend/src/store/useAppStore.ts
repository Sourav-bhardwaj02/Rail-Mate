import type { AccessibilitySettings } from '../types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AdminLog {
  id: string
  time: string
  event: string
  user: string
  location: string
  status: string
  color: string
  details?: string
}

interface AppState {
  // Accessibility
  accessibility: AccessibilitySettings
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void

  // SOS
  sosActive: boolean
  setSosActive: (active: boolean) => void

  // Navigation
  currentStation: string
  setCurrentStation: (station: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void

  // Auth
  isLoggedIn: boolean
  userId: string | null
  setLoggedIn: (status: boolean, userId?: string) => void
  showLoginModal: boolean
  setShowLoginModal: (show: boolean) => void

  // Admin Logs
  adminLogs: AdminLog[]
  addAdminLog: (log: Omit<AdminLog, 'id' | 'time'>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      accessibility: {
        highContrast: false,
        largeText: false,
        helpBuddyActive: false,
        voiceSpeed: 'normal',
        voiceType: 'Clear Alto (Default)',
        keyboardNav: false,
      },
      updateAccessibility: (settings) =>
        set((state) => ({
          accessibility: { ...state.accessibility, ...settings },
        })),

      sosActive: false,
      setSosActive: (active) => set({ sosActive: active }),

      currentStation: 'New Delhi',
      setCurrentStation: (station) => set({ currentStation: station }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      isLoggedIn: false,
      userId: null,
      setLoggedIn: (status, userId) => set({ isLoggedIn: status, userId: userId || null }),
      showLoginModal: false,
      setShowLoginModal: (show) => set({ showLoginModal: show }),

      adminLogs: [
        { id: '1', time: '10:42 AM', event: 'SOS Triggered', user: 'UID-8492', location: 'Station Central', status: 'Active', color: '#EF4444' },
        { id: '2', time: '10:30 AM', event: 'Missing Person Scan', user: 'Station Security', location: 'Platform 4', status: 'Match Found', color: '#10B981' },
      ],
      addAdminLog: (log) => set((state) => ({
        adminLogs: [
          {
            ...log,
            id: Math.random().toString(36).substring(7),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
          ...state.adminLogs
        ]
      })),
    }),
    { name: 'railmate-app-store' }
  )
)
