import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Sidebar } from './components/layout/Sidebar'
import { LandingNavbar } from './components/layout/Navbar'
import { useAppStore } from './store/useAppStore'

// Pages
import Landing from './pages/Landing'
import RoutePlanner from './pages/RoutePlanner'
import StationMap from './pages/StationMap'
import CrowdDashboard from './pages/CrowdDashboard'
import SOSCenter from './pages/SOSCenter'
import Accessibility from './pages/Accessibility'
import About from './pages/About'
import Settings from './pages/Settings'
import Help from './pages/Help'
import MissingPerson from './pages/MissingPerson'
<<<<<<< HEAD
import CameraPage from './pages/CameraPage'
=======
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
import AdminPanel from './pages/AdminPanel'
import AdminSOSFeed from './pages/AdminSOSFeed'
import AdminMissingPersons from './pages/AdminMissingPersons'
import AdminCrowdAnalytics from './pages/AdminCrowdAnalytics'
import NotFound from './pages/NotFound'
<<<<<<< HEAD
import AuthPage from './pages/AuthPage'
=======
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
import { LoginModal } from './components/auth/LoginModal'

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const SIDEBAR_ROUTES = [
  '/route-planner',
  '/station-map',
  '/crowd-monitoring',
  '/sos-center',
  '/missing-person',
<<<<<<< HEAD
  '/camera',
=======
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
  '/accessibility',
  '/about',
  '/settings',
  '/help',
  '/admin',
]

const App: React.FC = () => {
  const location = useLocation()
  const { accessibility, setMobileMenuOpen } = useAppStore()

  const hasSidebar = SIDEBAR_ROUTES.some((r) => location.pathname.startsWith(r))

  const bodyClass = [
    accessibility.highContrast ? 'high-contrast' : '',
    accessibility.largeText ? 'large-text' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={bodyClass} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LoginModal />
      {!hasSidebar && <LandingNavbar />}

      <div className="flex flex-1 min-h-0 relative">
        {hasSidebar && <Sidebar />}

        <main
          id="main-content"
          className="flex-1 min-w-0 overflow-y-auto min-h-screen relative"
          role="main"
        >
          {hasSidebar && (
            <div className="md:hidden flex items-center justify-between p-4 bg-[#1A1C20] border-b border-[#2A2D35] sticky top-0 z-40">
              <div className="text-white font-bold text-lg">RailMate AI</div>
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="text-gray-400 hover:text-white p-2"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              style={{ minHeight: '100%' }}
            >
              <Routes location={location}>
                <Route path="/" element={<Landing />} />
                <Route path="/route-planner" element={<RoutePlanner />} />
                <Route path="/station-map" element={<StationMap />} />
                <Route path="/crowd-monitoring" element={<CrowdDashboard />} />
                <Route path="/sos-center" element={<SOSCenter />} />
                <Route path="/missing-person" element={<MissingPerson />} />
<<<<<<< HEAD
                <Route path="/camera" element={<CameraPage />} />
=======
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
<<<<<<< HEAD
                <Route path="/auth" element={<AuthPage />} />
=======
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/admin/sos-feed" element={<AdminSOSFeed />} />
                <Route path="/admin/missing-persons" element={<AdminMissingPersons />} />
                <Route path="/admin/crowd-analytics" element={<AdminCrowdAnalytics />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App
