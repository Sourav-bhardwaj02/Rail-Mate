import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useNavigate } from 'react-router-dom'
import { PageTopbar } from '../components/layout/Navbar'
import { UploadCloud, ScanFace, AlertCircle, X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import api from '../services/api'

type ScanState = 'idle' | 'submitting' | 'error'

const MissingPerson: React.FC = () => {
  const [scanState, setScanState] = useState<ScanState>('idle')
  const [files, setFiles] = useState<File[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [fullName, setFullName] = useState('')
  const [age, setAge] = useState('')
  const [lastSeenLocation, setLastSeenLocation] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [features, setFeatures] = useState('')
  const { addAdminLog, userId } = useAppStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files)
      if (files.length + selected.length <= 4) {
        setFiles(prev => [...prev, ...selected].slice(0, 4))
      } else {
        alert('Maximum 4 photos allowed for optimal AI scanning.')
      }
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length < 2) {
      alert('Please upload at least 2 photos for accurate facial recognition.')
      return
    }

    setScanState('submitting')
    setErrorMessage('')

    addAdminLog({
      event: 'Person Scan Initiated',
      user: userId || 'Guest User',
      location: lastSeenLocation || 'Network Wide',
      status: 'Scanning',
      color: '#38BDF8'
    })

    try {
      const formData = new FormData()
      formData.append('fullName', fullName)
      formData.append('age', age)
      formData.append('gender', 'Unknown')
      formData.append('description', features)
      formData.append('lastSeenStation', lastSeenLocation)
      formData.append('reporterName', userId || 'Anonymous')
      formData.append('reporterPhone', contactInfo)

      files.slice(0, 3).forEach((file) => {
        formData.append('images', file)
      })

      const response = await api.post('/reports', formData)
      const personId = response.data?.personId || `person_${response.data?.data?.id}`

      addAdminLog({
        event: 'Face Registered',
        user: 'System AI',
        location: lastSeenLocation || 'Network Wide',
        status: 'Camera Scan Starting',
        color: '#A855F7'
      })

      navigate('/camera', {
        state: {
          personId,
          fullName,
          lastSeenLocation,
        },
      })
    } catch (error) {
      console.error('Failed to submit missing person report:', error)
      setScanState('error')
      setErrorMessage('Failed to register missing person. Please ensure the backend and AI service are running, then try again.')
    }
  }

  const resetForm = () => {
    setScanState('idle')
    setFiles([])
    setFullName('')
    setAge('')
    setLastSeenLocation('')
    setContactInfo('')
    setFeatures('')
    setErrorMessage('')
  }

  return (
    <div style={{ background: '#161618', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTopbar pageTitle="Missing Person AI Locator" />

      <div className="px-4 py-6 md:px-8 md:py-10 max-w-[1000px] mx-auto w-full flex-1">
        
        {/* Header */}
        <div style={{ marginBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <ScanFace size={28} color="#A855F7" /> AI Facial Recognition Scan
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: 13, maxWidth: 600, lineHeight: 1.6 }}>
            Upload reference photos to instantly scan live camera feeds across the entire station network. 
            Our advanced AI correlates facial features and clothing patterns in real-time.
          </p>
        </div>

        <AnimatePresence mode="wait">
          
          {/* IDLE / ERROR STATE */}
          {scanState !== 'submitting' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
            >
              
              {/* Left Column: Upload */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC', marginBottom: 16 }}>1. Reference Photos (2-4 Required)</h3>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  style={{ 
                    border: '2px dashed rgba(168, 85, 247, 0.3)', background: 'rgba(168, 85, 247, 0.03)',
                    borderRadius: 12, padding: 40, textAlign: 'center', cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(168, 85, 247, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(168, 85, 247, 0.03)'}
                >
                  <input 
                    type="file" multiple accept="image/*" ref={fileInputRef} 
                    style={{ display: 'none' }} onChange={handleFileChange} 
                  />
                  <div style={{ 
                    width: 48, height: 48, borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
                  }}>
                    <UploadCloud size={24} color="#A855F7" />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC', marginBottom: 4 }}>Click to upload or drag and drop</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>JPG, PNG or WEBP (Max 5MB per file)</div>
                </div>

                {/* File Preview */}
                {files.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', marginBottom: 12 }}>UPLOADED FILES ({files.length}/4)</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                      {files.map((file, i) => (
                        <div key={i} style={{ 
                          position: 'relative', width: 80, height: 80, borderRadius: 8, 
                          background: '#2A2D35', overflow: 'hidden', border: '1px solid #374151'
                        }}>
                          <img src={URL.createObjectURL(file)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                            style={{ 
                              position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.6)', 
                              border: 'none', borderRadius: '50%', width: 20, height: 20, 
                              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' 
                            }}
                          >
                            <X size={12} color="#FFF" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Form */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC', marginBottom: 16 }}>2. Subject Details</h3>
                <form onSubmit={handleScan} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-[2]">
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#9CA3AF', marginBottom: 6 }}>FULL NAME</label>
                      <input type="text" required placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{
                        width: '100%', background: '#1A1C20', border: '1px solid #2A2D35',
                        borderRadius: 8, padding: '10px 12px', color: '#F8FAFC', fontSize: 13, outline: 'none'
                      }} />
                    </div>
                    <div className="flex-1">
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#9CA3AF', marginBottom: 6 }}>AGE (APPROX)</label>
                      <input type="number" required placeholder="35" value={age} onChange={(e) => setAge(e.target.value)} style={{
                        width: '100%', background: '#1A1C20', border: '1px solid #2A2D35',
                        borderRadius: 8, padding: '10px 12px', color: '#F8FAFC', fontSize: 13, outline: 'none'
                      }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#9CA3AF', marginBottom: 6 }}>LAST SEEN LOCATION</label>
                    <input type="text" required placeholder="e.g. Platform 2, North Entrance" value={lastSeenLocation} onChange={(e) => setLastSeenLocation(e.target.value)} style={{
                      width: '100%', background: '#1A1C20', border: '1px solid #2A2D35',
                      borderRadius: 8, padding: '10px 12px', color: '#F8FAFC', fontSize: 13, outline: 'none'
                    }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#9CA3AF', marginBottom: 6 }}>GUARDIAN / CONTACT INFO</label>
                    <input type="text" required placeholder="Phone number or Email" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} style={{
                      width: '100%', background: '#1A1C20', border: '1px solid #2A2D35',
                      borderRadius: 8, padding: '10px 12px', color: '#F8FAFC', fontSize: 13, outline: 'none'
                    }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#9CA3AF', marginBottom: 6 }}>CLOTHING & DISTINCTIVE FEATURES</label>
                    <textarea rows={3} required placeholder="Red jacket, blue jeans, carrying a black backpack..." value={features} onChange={(e) => setFeatures(e.target.value)} style={{
                      width: '100%', background: '#1A1C20', border: '1px solid #2A2D35',
                      borderRadius: 8, padding: '10px 12px', color: '#F8FAFC', fontSize: 13, outline: 'none', resize: 'none'
                    }} />
                  </div>

                  <div style={{ 
                    background: 'rgba(56, 189, 248, 0.05)', borderLeft: '3px solid #38BDF8',
                    padding: '12px 16px', borderRadius: 6, display: 'flex', gap: 12, alignItems: 'flex-start',
                    marginTop: 8
                  }}>
                    <AlertCircle size={16} color="#38BDF8" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div style={{ fontSize: 11, color: '#E2E8F0', lineHeight: 1.5 }}>
                      This will initiate a priority AI scan across 420 active station cameras. Misuse of this system is punishable by law.
                    </div>
                  </div>

                  <button type="submit" disabled={files.length < 2} style={{
                    width: '100%', background: files.length < 2 ? '#374151' : '#7C3AED', 
                    color: files.length < 2 ? '#9CA3AF' : '#FFF',
                    border: 'none', borderRadius: 8, padding: '14px', marginTop: 8,
                    fontSize: 13, fontWeight: 600, cursor: files.length < 2 ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'all 0.2s'
                  }}>
                    <ScanFace size={18} /> Initiate AI Scan Network
                  </button>

                  {scanState === 'error' && (
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: 8, padding: '12px 16px', marginTop: 8, color: '#FCA5A5', fontSize: 12
                    }}>
                      {errorMessage}
                      <button type="button" onClick={resetForm} style={{
                        display: 'block', marginTop: 8, background: 'transparent', border: '1px solid #475569',
                        borderRadius: 6, padding: '6px 12px', color: '#F8FAFC', cursor: 'pointer', fontSize: 11
                      }}>
                        Try Again
                      </button>
                    </div>
                  )}

                </form>
              </div>

            </motion.div>
          )}

          {/* SUBMITTING STATE */}
          {scanState === 'submitting' && (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0' }}
            >
              <div style={{ position: 'relative', width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
                {/* Outer pulsing rings */}
                <motion.div 
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  style={{ position: 'absolute', inset: 0, border: '2px solid #A855F7', borderRadius: '50%' }} 
                />
                <motion.div 
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }}
                  style={{ position: 'absolute', inset: 0, border: '2px solid #38BDF8', borderRadius: '50%' }} 
                />
                
                {/* Center icon */}
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  <ScanFace size={40} color="#A855F7" />
                </div>
              </div>

              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>Registering Face Profile...</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#9CA3AF', fontSize: 13 }}>
                <span className="dot-pulse" style={{ width: 6, height: 6, background: '#38BDF8', borderRadius: '50%', display: 'inline-block' }} />
                Uploading photos to AI service and opening live camera
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

export default MissingPerson
