import React, { useState } from 'react'
import './form.css'

export default function ValentineForm({ onBack }) {
  const [formData, setFormData] = useState({
    senderName: '',
    partnerName: '',
    partnerNickname: '',
    relationship: 'Crush',
    shortMessage: '',
    dateType: 'Movie',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const [qrCode, setQrCode] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

 const handleSubmit = (e) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const encodedData = btoa(
      unescape(encodeURIComponent(JSON.stringify(formData)))
    )

    // ✅ ALWAYS point to /valentine route
    const link = `${window.location.origin}/valentine/${encodedData}`

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(link)}`

    setShareLink(link)
    setQrCode(qrUrl)
    setSubmitted(true)
  } catch (err) {
    console.error(err)
    alert("Something went wrong")
  }

  setIsSubmitting(false)
}


  return (
    <div className="form-container">
      <div className="form-wrapper">
        
        {/* Header */}
        <div className="form-header">
          <button className="back-btn" onClick={onBack}>← Back</button>
          <h1 className="form-title">Create Your Valentine</h1>
          <p className="form-subtitle">Tell us about your special someone</p>
        </div>

        {/* Decorations */}
        <div className="form-decorations">
          <div className="deco-heart deco-1">❤️</div>
          <div className="deco-heart deco-2">💕</div>
          <div className="deco-heart deco-3">✨</div>
        </div>

        {!submitted ? (
          <form className="valentine-form" onSubmit={handleSubmit}>

            {/* Your Name */}
            <div className="form-group">
              <label htmlFor="senderName" className="form-label">
                <span className="label-text">Your Name</span>
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="senderName"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                placeholder="e.g., John, Maria, Alex"
                className="form-input"
                required
              />
              <div className="input-underline"></div>
            </div>

            {/* Partner Name */}
            <div className="form-group">
              <label htmlFor="partnerName" className="form-label">
                <span className="label-text">Partner's Name</span>
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="partnerName"
                name="partnerName"
                value={formData.partnerName}
                onChange={handleChange}
                placeholder="e.g., Sarah, Alex, Jordan"
                className="form-input"
                required
              />
              <div className="input-underline"></div>
            </div>

            {/* Partner Nickname */}
            <div className="form-group">
              <label htmlFor="partnerNickname" className="form-label">
                <span className="label-text">Partner's Nickname</span>
                <span className="optional">(optional)</span>
              </label>
              <input
                type="text"
                id="partnerNickname"
                name="partnerNickname"
                value={formData.partnerNickname}
                onChange={handleChange}
                placeholder="e.g., Baby, Sweetheart, Love"
                className="form-input"
              />
              <div className="input-underline"></div>
            </div>

            {/* Relationship Type */}
            <div className="form-group">
              <label htmlFor="relationship" className="form-label">
                <span className="label-text">Relationship Type</span>
                <span className="required">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  id="relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Crush">Crush 💫</option>
                  <option value="Girlfriend">Girlfriend 💕</option>
                  <option value="Boyfriend">Boyfriend 💙</option>
                  <option value="Wife">Wife 💍</option>
                  <option value="Husband">Husband 💍</option>
                  <option value="Best Friend">Best Friend 👯</option>
                </select>
              </div>
            </div>

            {/* Short Message */}
            <div className="form-group">
              <label htmlFor="shortMessage" className="form-label">
                <span className="label-text">Short Message</span>
                <span className="required">*</span>
              </label>
              <div className="textarea-wrapper">
                <textarea
                  id="shortMessage"
                  name="shortMessage"
                  value={formData.shortMessage}
                  onChange={handleChange}
                  placeholder="Write something special..."
                  className="form-textarea"
                  maxLength="200"
                  required
                ></textarea>
                <div className="char-count">
                  {formData.shortMessage.length}/200
                </div>
              </div>
            </div>

            {/* Date Type */}
            <div className="form-group">
              <label htmlFor="dateType" className="form-label">
                <span className="label-text">Date Idea</span>
                <span className="required">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  id="dateType"
                  name="dateType"
                  value={formData.dateType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Movie">🎬 Movie Night</option>
                  <option value="Dinner">🍽️ Dinner</option>
                  <option value="Walk">🚶 Romantic Walk</option>
                  <option value="Coffee">☕ Coffee Date</option>
                  <option value="Beach">🏖️ Beach Day</option>
                  <option value="Picnic">🧺 Picnic</option>
                  <option value="Adventure">🎢 Adventure</option>
                  <option value="Surprise">🎁 Surprise</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                Cancel
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Continue →'}
              </button>
            </div>
          </form>
        ) : (
          <div className="success-screen">
            <div className="success-header">
              <div className="success-icon">✨</div>
              <h2>Your Valentine is Ready! 💖</h2>
              <p>Share it with {formData.partnerName}</p>
            </div>

            <div className="qr-section">
              <h3>Scan or Share</h3>
              <div className="qr-container">
                <img src={qrCode} alt="QR Code" className="qr-code" />
              </div>
              <p className="qr-text">Let them scan this QR code</p>
            </div>

            <div className="link-section">
              <h3>Or Copy This Link</h3>
              <div className="link-box">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="link-input"
                />
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(shareLink)
                    alert('Link copied!')
                  }}
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="share-actions">
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                ← Create Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
