import React, { useEffect, useState } from 'react'
import './home.css'

const features = [
  { icon: '💌', title: 'Personalized Messages', desc: 'Write heartfelt messages that showcase your love' },
  { icon: '📅', title: 'Date Invitations', desc: 'Invite them on a romantic date with style' },
  { icon: '🎁', title: 'Surprise Reveals', desc: 'Hide sweet surprises for them to discover' },
  { icon: '🎨', title: 'Custom Themes', desc: 'Choose from beautiful color schemes & backgrounds' },
  { icon: '🎵', title: 'Romantic Music', desc: 'Add mood-setting background music' },
  { icon: '✨', title: 'Animated Effects', desc: 'Bring your Valentine to life with animations' },
]
    
export default function Home({ onCreateClick }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Valentine Generator</h1>
          <h2 className="hero-subtitle">Create a personalized Valentine page for your special someone</h2>
          <p className="hero-desc">Express your love with an animated, shareable Valentine. Beautiful. Personal. Unforgettable.</p>
          <button className="hero-btn" onClick={onCreateClick}>Create Your Valentine →</button>
        </div>
        <div className="hero-decoration">
          <div className="floating-shape shape-1">❤️</div>
          <div className="floating-shape shape-2">💕</div>
          <div className="floating-shape shape-3">✨</div>
          <div className="floating-shape shape-4">💖</div>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section className="features-section">
        <div className="section-header">
          <h3>Why You'll Love It</h3>
          <p>Everything you need to make the perfect Valentine</p>
        </div>
        <div className="cards-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card" style={{ '--card-delay': `${idx * 0.1}s` }}>
              <div className="card-icon">{feature.icon}</div>
              <h4 className="card-title">{feature.title}</h4>
              <p className="card-desc">{feature.desc}</p>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h3>Ready to Share Your Love?</h3>
        <p>Start creating your Valentine page now. It only takes a few minutes.</p>
        <button className="cta-btn">Get Started Free</button>
      </section>
    </div>
  )
}
