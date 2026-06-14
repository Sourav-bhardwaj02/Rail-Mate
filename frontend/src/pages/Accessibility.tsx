<<<<<<< HEAD
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Mic, Keyboard, Type, User, Zap, Volume2, VolumeX, Sun, AlignLeft, ZoomIn } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { PageTopbar } from '../components/layout/Navbar'

/* ── Helpers ── */
const synth = window.speechSynthesis

function speak(text: string, speed: 'slow' | 'normal' | 'fast', voiceType: string) {
  if (!synth) return
  synth.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = speed === 'slow' ? 0.7 : speed === 'fast' ? 1.5 : 1.0
  utter.pitch = voiceType === 'Deep Baritone' ? 0.5 : voiceType === 'Soft Soprano' ? 1.5 : 1.0
  const voices = synth.getVoices()
  if (voices.length) utter.voice = voices[0]
  synth.speak(utter)
}

/* ── Wave animation ── */
const WaveAnimation: React.FC<{ active: boolean }> = ({ active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 40 }}>
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        animate={active ? { scaleY: [1, Math.random() * 0.8 + 0.2, 1] } : { scaleY: 0.15 }}
        transition={active ? { duration: 0.5 + i * 0.04, repeat: Infinity, ease: 'easeInOut' } : {}}
        style={{
          width: 3, height: '100%',
          background: active ? 'linear-gradient(to top, #38BDF8, #818CF8)' : 'rgba(148,163,184,0.2)',
=======
import React from 'react'
import { motion } from 'framer-motion'
import { Mic, Keyboard, Type, User, ToggleRight, ToggleLeft, Zap, ToggleRight as ToggleOn, ToggleLeft as ToggleOff } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { PageTopbar } from '../components/layout/Navbar'

/* ── Wave bars ── */
const WaveAnimation: React.FC<{ active: boolean }> = ({ active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 40 }}>
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        animate={active ? { scaleY: [1, Math.random() * 0.8 + 0.2, 1] } : { scaleY: 0.1 }}
        transition={active ? { duration: Math.random() * 0.5 + 0.4, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' } : {}}
        style={{
          width: 3, height: '100%',
          background: active ? `linear-gradient(to top, #38BDF8, #818CF8)` : 'rgba(148,163,184,0.2)',
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
          borderRadius: 2, transformOrigin: 'center',
        }}
      />
    ))}
  </div>
)

/* ── Toggle ── */
const Toggle: React.FC<{ checked: boolean; onChange: () => void; id: string; label: string }> = ({ checked, onChange, id, label }) => (
  <button id={id} role="switch" aria-checked={checked} aria-label={label} onClick={onChange}
    style={{
<<<<<<< HEAD
      width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', flexShrink: 0,
      background: checked ? '#7C3AED' : '#334155',
      position: 'relative', transition: 'background 0.2s',
      display: 'flex', alignItems: 'center', padding: 3,
    }}>
    <motion.div
      animate={{ x: checked ? 20 : 0 }}
=======
      width: 40, height: 22, borderRadius: 12, border: 'none', cursor: 'pointer', flexShrink: 0,
      background: checked ? '#7C3AED' : '#334155',
      position: 'relative', transition: 'background 0.2s',
      display: 'flex', alignItems: 'center', padding: 2
    }}>
    <motion.div
      animate={{ x: checked ? 18 : 0 }}
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      style={{ width: 18, height: 18, borderRadius: '50%', background: 'white' }}
    />
  </button>
)

const SHORTCUTS = [
  { action: 'Read Current Station', keys: ['Alt', 'S'] },
  { action: 'Trigger Emergency SOS', keys: ['Alt', 'E'], danger: true },
  { action: 'Toggle Voice Feedback', keys: ['Alt', 'V'] },
  { action: 'Focus Navigation', keys: ['Tab'] },
]

<<<<<<< HEAD
const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ background: '#202125', borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.05)', ...style }}>
    {children}
  </div>
)

const Accessibility: React.FC = () => {
  const { accessibility, updateAccessibility } = useAppStore()
  const [fontSize, setFontSize] = useState(16)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const voicesLoaded = useRef(false)

  // Apply high contrast class to body
  useEffect(() => {
    document.body.classList.toggle('high-contrast', accessibility.highContrast)
  }, [accessibility.highContrast])

  // Apply large text class to body + font size
  useEffect(() => {
    document.body.classList.toggle('large-text', accessibility.largeText)
    document.documentElement.style.fontSize = accessibility.largeText ? '18px' : `${fontSize}px`
  }, [accessibility.largeText, fontSize])

  // Load voices on mount
  useEffect(() => {
    const load = () => { voicesLoaded.current = true }
    synth?.addEventListener('voiceschanged', load)
    return () => synth?.removeEventListener('voiceschanged', load)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault()
        speak('You are currently at New Delhi Railway Station. Platform 3 is active.', accessibility.voiceSpeed, accessibility.voiceType)
      }
      if (e.altKey && e.key.toLowerCase() === 'v') {
        e.preventDefault()
        updateAccessibility({ helpBuddyActive: !accessibility.helpBuddyActive })
      }
      if (e.altKey && e.key.toLowerCase() === 'e') {
        e.preventDefault()
        speak('Emergency SOS triggered. Help is on the way.', accessibility.voiceSpeed, accessibility.voiceType)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [accessibility])

  // Auto-announce when HelpBuddy turns ON
  useEffect(() => {
    if (accessibility.helpBuddyActive) {
      setIsSpeaking(true)
      speak('HelpBuddy is now active. Monitoring your surroundings. You are at New Delhi Station.', accessibility.voiceSpeed, accessibility.voiceType)
      const timer = setTimeout(() => setIsSpeaking(false), 5000)
      return () => clearTimeout(timer)
    } else {
      synth?.cancel()
      setIsSpeaking(false)
    }
  }, [accessibility.helpBuddyActive])

  const testVoice = useCallback(() => {
    speak('This is a test of your voice navigation settings. Speed and voice type are applied.', accessibility.voiceSpeed, accessibility.voiceType)
  }, [accessibility.voiceSpeed, accessibility.voiceType])
=======
const Accessibility: React.FC = () => {
  const { accessibility, updateAccessibility } = useAppStore()
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98

  return (
    <div style={{ background: '#161618', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PageTopbar pageTitle="Accessibility Hub" />
      <div style={{ padding: '32px 40px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>

        <h1 style={{ fontWeight: 800, fontSize: 24, marginBottom: 8, color: '#F8FAFC' }}>Accessibility Hub</h1>
<<<<<<< HEAD
        <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 32, maxWidth: 520 }}>
          Configure RailMate AI to suit your travel needs. All settings apply immediately and are saved across sessions.
        </p>

        {/* Row 1: HelpBuddy + Quick Preferences */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 mb-5">

          {/* HelpBuddy AI */}
          <Card>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(56,189,248,0.15)', color: '#7DD3FC', padding: '4px 10px', borderRadius: 12, fontSize: 10, fontWeight: 700, marginBottom: 16 }}>
              <Zap size={10} fill="currentColor" /> AI Assistant
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 16, color: '#F8FAFC', marginBottom: 16 }}>HelpBuddy AI</h2>

            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 20 }}>
                  Provides live audio descriptions of your surroundings, platform changes, and obstacle detection via Web Speech API. Press <kbd style={{ background: '#334155', borderRadius: 4, padding: '2px 6px', fontSize: 10 }}>Alt+V</kbd> to toggle anytime.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => updateAccessibility({ helpBuddyActive: !accessibility.helpBuddyActive })}
                    style={{
                      background: accessibility.helpBuddyActive ? '#581C87' : '#E9D5FF',
                      color: accessibility.helpBuddyActive ? '#E9D5FF' : '#581C87',
                      border: 'none', borderRadius: 20, padding: '8px 20px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s'
                    }}>
                    <User size={14} />
                    {accessibility.helpBuddyActive ? 'Deactivate HelpBuddy' : 'Activate HelpBuddy'}
                  </button>
                  <button
                    onClick={() => speak('You are at Platform 3. The Rajdhani Express departs in 5 minutes from Platform 1.', accessibility.voiceSpeed, accessibility.voiceType)}
                    style={{ background: 'transparent', border: '1px solid #334155', color: '#94A3B8', borderRadius: 20, padding: '8px 16px', fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Volume2 size={12} /> Test Announcement
                  </button>
                </div>
                {isSpeaking && (
                  <div style={{ marginTop: 12, fontSize: 11, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="dot-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#38BDF8', display: 'inline-block' }} />
                    Speaking now...
                  </div>
                )}
              </div>
              <div style={{
                width: 100, height: 100, borderRadius: 8, background: '#0F172A',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: accessibility.helpBuddyActive ? '0 0 24px rgba(56,189,248,0.25)' : 'none',
                transition: 'box-shadow 0.3s'
=======
        <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 32, maxWidth: 500 }}>
          Configure RailMate AI to suit your travel needs. We are committed to a supportive and legible journey for everyone.
        </p>

        {/* ── Top row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5 mb-5">
          
          {/* HelpBuddy AI Card */}
          <div style={{ background: '#202125', borderRadius: 12, padding: 24, position: 'relative' }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 6, 
              background: 'rgba(56, 189, 248, 0.15)', color: '#7DD3FC',
              padding: '4px 10px', borderRadius: 12, fontSize: 10, fontWeight: 700, marginBottom: 16
            }}>
              <Zap size={10} fill="currentColor" /> AI Assistant
            </div>
            
            <h2 style={{ fontWeight: 700, fontSize: 16, color: '#F8FAFC', marginBottom: 16 }}>HelpBuddy AI</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1 w-full">
                <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 24 }}>
                  Our specialized companion for visually impaired passengers. HelpBuddy provides continuous audio descriptions of your surroundings, platform changes, and obstacle detection.
                </p>
                <button
                  onClick={() => updateAccessibility({ helpBuddyActive: !accessibility.helpBuddyActive })}
                  style={{ 
                    background: '#E9D5FF', color: '#581C87', border: 'none', borderRadius: 20,
                    padding: '8px 20px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8
                  }}
                >
                  <User size={14} /> Activate HelpBuddy
                </button>
              </div>
              
              <div style={{ 
                width: 100, height: 100, borderRadius: 8, background: '#0F172A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: accessibility.helpBuddyActive ? '0 0 20px rgba(56,189,248,0.2)' : 'none'
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
              }}>
                <WaveAnimation active={accessibility.helpBuddyActive} />
              </div>
            </div>
<<<<<<< HEAD
          </Card>

          {/* Quick Preferences */}
          <Card style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#F8FAFC', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sun size={16} color="#9CA3AF" /> Quick Preferences
            </div>

            {[
              {
                label: 'High Contrast Mode',
                desc: 'Maximize legibility — pure black background, strong borders',
                checked: accessibility.highContrast,
                onChange: () => updateAccessibility({ highContrast: !accessibility.highContrast }),
                id: 'hc-toggle'
              },
              {
                label: 'Large Text',
                desc: 'Increase all font sizes globally to 18px base',
                checked: accessibility.largeText,
                onChange: () => updateAccessibility({ largeText: !accessibility.largeText }),
                id: 'lt-toggle'
              },
              {
                label: 'Keyboard Navigation',
                desc: 'Enhance focus rings for keyboard-only users',
                checked: accessibility.keyboardNav,
                onChange: () => {
                  const next = !accessibility.keyboardNav
                  updateAccessibility({ keyboardNav: next })
                  document.body.style.setProperty('--focus-ring-size', next ? '3px' : '2px')
                },
                id: 'kn-toggle'
              }
            ].map((item, idx, arr) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: idx < arr.length - 1 ? 20 : 0, paddingBottom: idx < arr.length - 1 ? 20 : 0, borderBottom: idx < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ paddingRight: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#F8FAFC', marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: '#64748B', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
                <Toggle id={item.id} checked={item.checked} onChange={item.onChange} label={`Toggle ${item.label}`} />
              </div>
            ))}
          </Card>
        </div>

        {/* Row 2: Voice Navigation + Font Size + Keyboard Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Voice Navigation */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#F8FAFC', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Mic size={16} color="#9CA3AF" /> Voice Navigation
            </div>

            <div style={{ marginBottom: 20 }}>
              <label htmlFor="ann-speed" style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Announcement Speed</label>
              <select id="ann-speed"
                value={accessibility.voiceSpeed}
                onChange={e => updateAccessibility({ voiceSpeed: e.target.value as 'slow' | 'normal' | 'fast' })}
                style={{ width: '100%', padding: '10px 12px', background: '#161618', border: '1px solid #334155', borderRadius: 6, color: '#F8FAFC', fontSize: 12, outline: 'none' }}>
                <option value="slow">Slow Pace (0.7×)</option>
                <option value="normal">Normal Pace (1.0×)</option>
                <option value="fast">Fast Pace (1.5×)</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label htmlFor="voice-type" style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Voice Type</label>
              <select id="voice-type"
                value={accessibility.voiceType}
                onChange={e => updateAccessibility({ voiceType: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#161618', border: '1px solid #334155', borderRadius: 6, color: '#F8FAFC', fontSize: 12, outline: 'none' }}>
=======
          </div>

          {/* Quick Preferences Card */}
          <div style={{ background: '#202125', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#F8FAFC', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ToggleOn size={16} color="#9CA3AF" /> Quick Preferences
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#F8FAFC', marginBottom: 2 }}>High Contrast Mode</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>Maximize legibility</div>
              </div>
              <Toggle id="hc-toggle" checked={accessibility.highContrast}
                onChange={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
                label="Toggle high contrast mode" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#F8FAFC', marginBottom: 2 }}>Large Text</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>Increase font sizes globally</div>
              </div>
              <Toggle id="lt-toggle" checked={accessibility.largeText}
                onChange={() => updateAccessibility({ largeText: !accessibility.largeText })}
                label="Toggle large text mode" />
            </div>
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Voice Navigation Card */}
          <div style={{ background: '#202125', borderRadius: 12, padding: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#F8FAFC', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Mic size={16} color="#9CA3AF" /> Voice Navigation
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="ann-speed" style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#F8FAFC', marginBottom: 8 }}>Announcement Speed</label>
              <select id="ann-speed" 
                value={accessibility.voiceSpeed}
                onChange={e => updateAccessibility({ voiceSpeed: e.target.value as any })}
                style={{ 
                  width: '100%', padding: '10px 12px', background: '#161618', border: '1px solid #334155', 
                  borderRadius: 6, color: '#F8FAFC', fontSize: 12, outline: 'none', appearance: 'none'
                }}>
                <option value="normal">Normal Pace</option>
                <option value="slow">Slow Pace</option>
                <option value="fast">Fast Pace</option>
              </select>
              <p style={{ fontSize: 11, color: '#64748B', marginTop: 8 }}>
                Adjusts how quickly the AI speaks station updates.
              </p>
            </div>
            
            <div>
              <label htmlFor="voice-type" style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#F8FAFC', marginBottom: 8 }}>Voice Type</label>
              <select id="voice-type" 
                value={accessibility.voiceType}
                onChange={e => updateAccessibility({ voiceType: e.target.value })}
                style={{ 
                  width: '100%', padding: '10px 12px', background: '#161618', border: '1px solid #334155', 
                  borderRadius: 6, color: '#F8FAFC', fontSize: 12, outline: 'none', appearance: 'none'
                }}>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                <option>Clear Alto (Default)</option>
                <option>Deep Baritone</option>
                <option>Soft Soprano</option>
              </select>
            </div>
<<<<<<< HEAD

            <button onClick={testVoice}
              style={{ width: '100%', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', color: '#38BDF8', borderRadius: 8, padding: '10px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
              <Volume2 size={14} /> Test Voice Now
            </button>
          </Card>

          {/* Font Size */}
          <Card>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#F8FAFC', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ZoomIn size={16} color="#9CA3AF" /> Font Size
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: '#64748B' }}>Base font size</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>{accessibility.largeText ? 18 : fontSize}px</span>
              </div>
              <input type="range" min={12} max={24} step={1}
                value={accessibility.largeText ? 18 : fontSize}
                disabled={accessibility.largeText}
                onChange={e => {
                  const val = parseInt(e.target.value)
                  setFontSize(val)
                  document.documentElement.style.fontSize = `${val}px`
                }}
                style={{ width: '100%', accentColor: '#7C3AED', cursor: accessibility.largeText ? 'not-allowed' : 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#475569', marginTop: 4 }}>
                <span>12px</span><span>18px</span><span>24px</span>
              </div>
            </div>

            {accessibility.largeText && (
              <div style={{ fontSize: 11, color: '#F59E0B', background: 'rgba(245,158,11,0.1)', borderRadius: 6, padding: '8px 10px', marginBottom: 16 }}>
                ⚠ Large Text mode overrides this slider to 18px.
              </div>
            )}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>Preview</div>
              <p style={{ fontSize: accessibility.largeText ? 18 : fontSize, color: '#F8FAFC', lineHeight: 1.5 }}>
                Platform 3 → Rajdhani Express
              </p>
            </div>
          </Card>

          {/* Keyboard Shortcuts */}
          <Card>
=======
          </div>

          {/* Keyboard Shortcuts Card */}
          <div style={{ background: '#202125', borderRadius: 12, padding: 24 }}>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
            <div style={{ fontWeight: 700, fontSize: 14, color: '#F8FAFC', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Keyboard size={16} color="#9CA3AF" /> Keyboard Shortcuts
            </div>
            <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 20, lineHeight: 1.5 }}>
<<<<<<< HEAD
              These shortcuts are always active — try them now.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {SHORTCUTS.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < SHORTCUTS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingBottom: i < SHORTCUTS.length - 1 ? 14 : 0 }}>
                  <span style={{ fontSize: 12, color: '#D1D5DB' }}>{s.action}</span>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {s.keys.map(k => (
                      <kbd key={k} style={{ background: s.danger ? '#7F1D1D' : '#334155', border: 'none', color: s.danger ? '#FECACA' : '#9CA3AF', borderRadius: 4, padding: '3px 7px', fontSize: 10, fontWeight: 600 }}>{k}</kbd>
=======
              Navigate the interface quickly using these standard bindings.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {SHORTCUTS.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < SHORTCUTS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingBottom: i < SHORTCUTS.length - 1 ? 16 : 0 }}>
                  <span style={{ fontSize: 12, color: '#F8FAFC' }}>{s.action}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {s.keys.map(k => (
                      <kbd key={k} style={{
                        background: s.danger ? '#7F1D1D' : '#334155',
                        border: 'none',
                        color: s.danger ? '#FECACA' : '#9CA3AF',
                        borderRadius: 4, padding: '4px 8px', fontSize: 10, fontWeight: 600
                      }}>{k}</kbd>
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
                    ))}
                  </div>
                </div>
              ))}
            </div>
<<<<<<< HEAD
          </Card>
=======
          </div>
          
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
        </div>

      </div>
    </div>
  )
}

export default Accessibility
