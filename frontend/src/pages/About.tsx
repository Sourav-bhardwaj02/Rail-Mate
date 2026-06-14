import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Unlink, Lightbulb, Link as LinkIcon, Server, Accessibility, ArrowRight, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const About: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#161618', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <div className="px-4 py-10 md:py-20 md:px-8 max-w-[900px] mx-auto w-full flex-1">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F8FAFC', fontFamily: 'Georgia, serif', marginBottom: 8 }}>
            RailMate AI
          </h1>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#A855F7', marginBottom: 24 }}>
            Inclusive, Intelligent, Safe Railways
          </h2>
          <div style={{ 
            display: 'inline-block', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)',
            padding: '6px 16px', borderRadius: 20, color: '#38BDF8', fontSize: 12, fontWeight: 600
          }}>
            Hackathon Presentation 2024
          </div>
        </div>

        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Our Vision */}
          <div style={{ background: '#202125', borderRadius: 12, padding: 32, borderLeft: '4px solid #38BDF8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Eye size={20} color="#38BDF8" />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#38BDF8' }}>Our Vision</h3>
            </div>
            <p style={{ fontSize: 13, color: '#E2E8F0', lineHeight: 1.7 }}>
              To bridge the gap between high-performance AI technology and human-centric service, creating a railway ecosystem that empowers diverse demographics, including elderly travelers and those with disabilities, with confidence and ease.
            </p>
          </div>

          {/* The Problem */}
          <div style={{ background: '#202125', borderRadius: 12, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Unlink size={20} color="#A855F7" />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#A855F7' }}>The Problem</h3>
            </div>
            <p style={{ fontSize: 13, color: '#E2E8F0', lineHeight: 1.7 }}>
              Complex, fast-paced transit environments often isolate vulnerable populations. Information is siloed, and assistance is slow.
            </p>
          </div>

        </div>

        {/* The Solution */}
        <div style={{ 
          background: '#202125', borderRadius: 12, padding: 32, marginBottom: 48,
          position: 'relative', overflow: 'hidden'
        }}>
          {/* Decorative background overlay (simulating the train station corridor) */}
          <div style={{ 
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%',
            background: 'linear-gradient(to right, #202125, transparent), url("https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
            backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15,
            pointerEvents: 'none'
          }} />
          
          <div className="relative z-10 w-full md:max-w-[60%]">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Lightbulb size={20} color="#E2E8F0" />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#E2E8F0' }}>The Solution</h3>
            </div>
            <p style={{ fontSize: 13, color: '#E2E8F0', lineHeight: 1.7, marginBottom: 24 }}>
              An expert vision system powered by advanced AI. RailMate provides real-time, context-aware guidance, prioritizing accessibility and immediate legible information without overwhelming the user.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {['Context-Aware', 'High Contrast UI', 'Real-time SOS'].map(badge => (
                <span key={badge} style={{ 
                  background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)',
                  color: '#38BDF8', fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 12
                }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Tech Stack & Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          {/* Tech Stack */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#A855F7', marginBottom: 20 }}>Tech Stack</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: <span style={{ fontFamily: 'monospace', fontSize: 14 }}>{'{ }'}</span>, text: 'Tailwind CSS & Minimalist Design System' },
                { icon: <span style={{ fontFamily: 'monospace', fontSize: 16 }}>@</span>, text: 'Advanced LLM for Contextual Guidance' },
                { icon: <Server size={14} />, text: 'Real-time Transit Data APIs' },
                { icon: <Accessibility size={14} />, text: 'Accessibility-First Semantic HTML' },
              ].map((item, i) => (
                <div key={i} style={{ 
                  background: '#1A1C20', padding: '12px 16px', borderRadius: 8,
                  display: 'flex', alignItems: 'center', gap: 12, border: 'none'
                }}>
                  <div style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20 }}>{item.icon}</div>
                  <span style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* The Team */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#A855F7', marginBottom: 20 }}>The Team</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
<<<<<<< HEAD
                { name: 'Sourav', role: 'UX Engineering & Ai Integration' },
                { name: 'Shivam', role: 'Backend Engineer' },
                { name: 'Praveen', role: 'Data Systems' },
                { name: 'Hanish', role: 'Frontend Engineer' },
=======
                { name: 'Alex', role: 'UX Engineering' },
                { name: 'Sam', role: 'AI Integration' },
                { name: 'Jordan', role: 'Data Systems' },
                { name: 'Casey', role: 'Accessibility Lead' },
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
              ].map(member => (
                <div key={member.name} style={{ 
                  background: '#1A1C20', padding: '20px 16px', borderRadius: 8,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  border: '1px solid #2A2D35'
                }}>
                  <div style={{ 
                    width: 36, height: 36, borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12
                  }}>
                    <User size={16} color="#A855F7" />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC', marginBottom: 4 }}>{member.name}</div>
                  <div style={{ fontSize: 10, color: '#9CA3AF' }}>{member.role}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Prototype Button */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/route-planner')}
            style={{ 
              background: '#7C3AED', color: '#FFF', border: 'none', borderRadius: 24,
              padding: '14px 32px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)'
            }}
          >
            Explore Prototype <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div style={{ fontSize: 11, color: '#64748B' }}>
            RailMate AI © 2024 RailMate AI. Modern Minimalist Railway Support.
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[11px]">
            <a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Emergency Contacts</a>
            <a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Accessibility Policy</a>
            <a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>System Health</a>
            <a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About
