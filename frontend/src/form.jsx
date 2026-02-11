// import React, { useState } from 'react'
// import './form.css'

// export default function ValentineForm({ onBack }) {
//   const [formData, setFormData] = useState({
//     senderName: '',
//     partnerName: '',
//     partnerNickname: '',
//     relationship: 'Crush',
//     shortMessage: '',
//     dateType: 'Movie',
//     senderEmail: '',
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitted, setSubmitted] = useState(false)
//   const [shareLink, setShareLink] = useState('')
//   const [qrCode, setQrCode] = useState('')

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     // Encode form data to base64
//     const encodedData = btoa(encodeURIComponent(JSON.stringify(formData)))

//     // Generate share link
//     const baseUrl = window.location.origin + window.location.pathname
//     const link = `${baseUrl}#valentine=${encodedData}`

//     // Generate QR code using QR server API
//     const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(link)}`

//     // If sender provided an email, notify them with the share link via backend
//     if (formData.senderEmail) {
//       try {
//         fetch('/api/create-valentine', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             senderEmail: formData.senderEmail,
//             senderName: formData.senderName,
//             partnerName: formData.partnerName,
//             link,
//           }),
//         }).then((r) => {
//           if (!r.ok) console.warn('create-valentine API returned', r.status)
//         }).catch((err) => console.warn('create-valentine error', err))
//       } catch (e) {
//         console.error('Error calling create-valentine API', e)
//       }
//     }

//     // Simulate processing and show UI
//     setTimeout(() => {
//       setIsSubmitting(false)
//       setShareLink(link)
//       setQrCode(qrUrl)
//       setSubmitted(true)
//     }, 800)
//   }

//   return (
//     <div className="form-container">
//       <div className="form-wrapper">
//         {/* Header */}
//         <div className="form-header">
//           <button className="back-btn" onClick={onBack}>← Back</button>
//           <h1 className="form-title">Create Your Valentine</h1>
//           <p className="form-subtitle">Tell us about your special someone</p>
//         </div>

//         {/* Decorations */}
//         <div className="form-decorations">
//           <div className="deco-heart deco-1">❤️</div>
//           <div className="deco-heart deco-2">💕</div>
//           <div className="deco-heart deco-3">✨</div>
//         </div>

//         {/* Form */}
//         {!submitted ? (
//           <form className="valentine-form" onSubmit={handleSubmit}>
//             {/* Your Name */}
//             <div className="form-group">
//               <label htmlFor="senderName" className="form-label">
//                 <span className="label-text">Your Name</span>
//                 <span className="required">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="senderName"
//                 name="senderName"
//                 value={formData.senderName}
//                 onChange={handleChange}
//                 placeholder="e.g., John, Maria, Alex"
//                 className="form-input"
//                 required
//               />
//               <div className="input-underline"></div>
//             </div>

//             {/* Partner Name */}
//             <div className="form-group">
//               <label htmlFor="partnerName" className="form-label">
//                 <span className="label-text">Partner's Name</span>
//                 <span className="required">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="partnerName"
//                 name="partnerName"
//                 value={formData.partnerName}
//                 onChange={handleChange}
//                 placeholder="e.g., Sarah, Alex, Jordan"
//                 className="form-input"
//                 required
//               />
//               <div className="input-underline"></div>
//             </div>

//             {/* Partner Nickname */}
//             <div className="form-group">
//               <label htmlFor="partnerNickname" className="form-label">
//                 <span className="label-text">Partner's Nickname</span>
//                 <span className="optional">(optional)</span>
//               </label>
//               <input
//                 type="text"
//                 id="partnerNickname"
//                 name="partnerNickname"
//                 value={formData.partnerNickname}
//                 onChange={handleChange}
//                 placeholder="e.g., Baby, Sweetheart, Love"
//                 className="form-input"
//               />
//               <div className="input-underline"></div>
//             </div>

//             {/* Relationship Type */}
//             <div className="form-group">
//               <label htmlFor="relationship" className="form-label">
//                 <span className="label-text">Relationship Type</span>
//                 <span className="required">*</span>
//               </label>
//               <div className="select-wrapper">
//                 <select
//                   id="relationship"
//                   name="relationship"
//                   value={formData.relationship}
//                   onChange={handleChange}
//                   className="form-select"
//                 >
//                   <option value="Crush">Crush 💫</option>
//                   <option value="Girlfriend">Girlfriend 💕</option>
//                   <option value="Boyfriend">Boyfriend 💙</option>
//                   <option value="Wife">Wife 💍</option>
//                   <option value="Husband">Husband 💍</option>
//                   <option value="Best Friend">Best Friend (for fun) 👯</option>
//                 </select>
//               </div>
//             </div>

//             {/* Short Message */}
//             <div className="form-group">
//               <label htmlFor="shortMessage" className="form-label">
//                 <span className="label-text">Short Message for Your Partner</span>
//                 <span className="required">*</span>
//               </label>
//               <div className="textarea-wrapper">
//                 <textarea
//                   id="shortMessage"
//                   name="shortMessage"
//                   value={formData.shortMessage}
//                   onChange={handleChange}
//                   placeholder="e.g., You mean everything to me... I love your smile..."
//                   className="form-textarea"
//                   maxLength="200"
//                   required
//                 ></textarea>
//                 <div className="char-count">{formData.shortMessage.length}/200</div>
//               </div>
//             </div>

//             {/* Date Type */}
//             <div className="form-group">
//               <label htmlFor="dateType" className="form-label">
//                 <span className="label-text">Date Type/Idea</span>
//                 <span className="required">*</span>
//               </label>
//               <div className="select-wrapper">
//                 <select
//                   id="dateType"
//                   name="dateType"
//                   value={formData.dateType}
//                   onChange={handleChange}
//                   className="form-select"
//                 >
//                   <option value="Movie">🎬 Movie Night</option>
//                   <option value="Dinner">🍽️ Dinner</option>
//                   <option value="Walk">🚶 Romantic Walk</option>
//                   <option value="Coffee">☕ Coffee Date</option>
//                   <option value="Beach">🏖️ Beach Day</option>
//                   <option value="Picnic">🧺 Picnic</option>
//                   <option value="Adventure">🎢 Adventure</option>
//                   <option value="Surprise">🎁 Surprise Me</option>
//                 </select>
//               </div>
//             </div>

//             {/* Email for Notifications */}
//             <div className="form-group">
//               <label htmlFor="senderEmail" className="form-label">
//                 <span className="label-text">Your Email (get notified of their response)</span>
//                 <span className="optional">(optional)</span>
//               </label>
//               <input
//                 type="email"
//                 id="senderEmail"
//                 name="senderEmail"
//                 value={formData.senderEmail}
//                 onChange={handleChange}
//                 placeholder="e.g., you@email.com"
//                 className="form-input"
//               />
//               <div className="input-underline"></div>
//               <p className="email-hint">We'll send you a notification when they respond! 📬</p>
//             </div>

//             {/* Buttons */}
//             <div className="form-actions">
//               <button type="button" className="btn btn-secondary" onClick={onBack}>
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className="spinner"></span>
//                     Creating...
//                   </>
//                 ) : (
//                   <>
//                     Continue →
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         ) : (
//           /* Success Message with Share */
//           <div className="success-screen">
//             <div className="success-header">
//               <div className="success-icon">✨</div>
//               <h2>Your Valentine is Ready! 💖</h2>
//               <p>Share it with {formData.partnerName}</p>
//             </div>

//             {/* QR Code Section */}
//             <div className="qr-section">
//               <h3>Scan or Share</h3>
//               <div className="qr-container">
//                 <img src={qrCode} alt="Valentine QR Code" className="qr-code" />
//               </div>
//               <p className="qr-text">Let them scan this QR code with their phone</p>
                
//               <div className="qr-actions">
//                 <button
//                   type="button"
//                   className="qr-btn download-btn"
//                   onClick={() => {
//                     const link = document.createElement('a')
//                     link.href = qrCode
//                     link.download = `valentine-qr-${Date.now()}.png`
//                     link.click()
//                   }}
//                 >
//                   📥 Download QR Code
//                 </button>
//                 {navigator.share && (
//                   <button
//                     type="button"
//                     className="qr-btn share-qr-btn"
//                     onClick={async () => {
//                       try {
//                         // Fetch the QR code image
//                         const response = await fetch(qrCode)
//                         const blob = await response.blob()
//                         const file = new File([blob], 'valentine-qr.png', { type: 'image/png' })
                        
//                         // Share the file
//                         await navigator.share({
//                           title: `Valentine QR Code for ${formData.partnerName}`,
//                           text: formData.shortMessage,
//                           files: [file]
//                         })
//                       } catch (err) {
//                         console.log('Share failed:', err)
//                       }
//                     }}
//                   >
//                     📤 Share QR Code
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Link Section */}
//             <div className="link-section">
//               <h3>Or Copy This Link</h3>
//               <div className="link-box">
//                 <input
//                   type="text"
//                   value={shareLink}
//                   readOnly
//                   className="link-input"
//                 />
//                 <button
//                   type="button"
//                   className="copy-btn"
//                   onClick={() => {
//                     navigator.clipboard.writeText(shareLink)
//                     alert('Link copied to clipboard! 📋')
//                   }}
//                 >
//                   Copy
//                 </button>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="share-actions">
//               {navigator.share && (
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={() => {
//                     navigator.share({
//                       title: `A Valentine for ${formData.partnerName}`,
//                       text: formData.shortMessage,
//                       url: shareLink
//                     })
//                   }}
//                 >
//                   📱 Share on WhatsApp/Social
//                 </button>
//               )}
//               <button type="button" className="btn btn-secondary" onClick={onBack}>
//                 ← Create Another
//               </button>
//             </div>

//             {/* Confetti */}
//             <div className="confetti">
//               {[...Array(12)].map((_, i) => (
//                 <div key={i} className="confetti-piece" style={{ '--delay': `${i * 50}ms` }}></div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }


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
    senderEmail: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const [qrCode, setQrCode] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // ✅ Unicode-safe encoding
    const encodedData = btoa(
      unescape(encodeURIComponent(JSON.stringify(formData)))
    )

    const baseUrl = window.location.origin + window.location.pathname
    const link = `${baseUrl}#valentine=${encodedData}`

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(link)}`

    // ✅ Notify creator (non-blocking, but awaited)
    if (formData.senderEmail) {
      try {
        const r = await fetch('/api/create-valentine', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            senderEmail: formData.senderEmail,
            senderName: formData.senderName,
            partnerName: formData.partnerName,
            link,
          }),
        })

        if (!r.ok) {
          console.warn('create-valentine failed:', r.status)
        }
      } catch (err) {
        console.error('create-valentine error:', err)
      }
    }

    setShareLink(link)
    setQrCode(qrUrl)
    setSubmitted(true)
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

        {/* Form */}
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
                  <option value="Best Friend">Best Friend (for fun) 👯</option>
                </select>
              </div>
            </div>

            {/* Short Message */}
            <div className="form-group">
              <label htmlFor="shortMessage" className="form-label">
                <span className="label-text">Short Message for Your Partner</span>
                <span className="required">*</span>
              </label>
              <div className="textarea-wrapper">
                <textarea
                  id="shortMessage"
                  name="shortMessage"
                  value={formData.shortMessage}
                  onChange={handleChange}
                  placeholder="e.g., You mean everything to me... I love your smile..."
                  className="form-textarea"
                  maxLength="200"
                  required
                ></textarea>
                <div className="char-count">{formData.shortMessage.length}/200</div>
              </div>
            </div>

            {/* Date Type */}
            <div className="form-group">
              <label htmlFor="dateType" className="form-label">
                <span className="label-text">Date Type/Idea</span>
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
                  <option value="Surprise">🎁 Surprise Me</option>
                </select>
              </div>
            </div>

            {/* Email for Notifications */}
            <div className="form-group">
              <label htmlFor="senderEmail" className="form-label">
                <span className="label-text">Your Email (get notified of their response)</span>
                <span className="optional">(optional)</span>
              </label>
              <input
                type="email"
                id="senderEmail"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={handleChange}
                placeholder="e.g., you@email.com"
                className="form-input"
              />
              <div className="input-underline"></div>
              <p className="email-hint">We'll send you a notification when they respond! 📬</p>
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
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    Continue →
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success Message with Share */
          <div className="success-screen">
            <div className="success-header">
              <div className="success-icon">✨</div>
              <h2>Your Valentine is Ready! 💖</h2>
              <p>Share it with {formData.partnerName}</p>
            </div>

            {/* QR Code Section */}
            <div className="qr-section">
              <h3>Scan or Share</h3>
              <div className="qr-container">
                <img src={qrCode} alt="Valentine QR Code" className="qr-code" />
              </div>
              <p className="qr-text">Let them scan this QR code with their phone</p>
                
              <div className="qr-actions">
                <button
                  type="button"
                  className="qr-btn download-btn"
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = qrCode
                    link.download = `valentine-qr-${Date.now()}.png`
                    link.click()
                  }}
                >
                  📥 Download QR Code
                </button>
                {navigator.share && (
                  <button
                    type="button"
                    className="qr-btn share-qr-btn"
                    onClick={async () => {
                      try {
                        // Fetch the QR code image
                        const response = await fetch(qrCode)
                        const blob = await response.blob()
                        const file = new File([blob], 'valentine-qr.png', { type: 'image/png' })
                        
                        // Share the file
                        await navigator.share({
                          title: `Valentine QR Code for ${formData.partnerName}`,
                          text: formData.shortMessage,
                          files: [file]
                        })
                      } catch (err) {
                        console.log('Share failed:', err)
                      }
                    }}
                  >
                    📤 Share QR Code
                  </button>
                )}
              </div>
            </div>

            {/* Link Section */}
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
                    alert('Link copied to clipboard! 📋')
                  }}
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="share-actions">
              {navigator.share && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    navigator.share({
                      title: `A Valentine for ${formData.partnerName}`,
                      text: formData.shortMessage,
                      url: shareLink
                    })
                  }}
                >
                  📱 Share on WhatsApp/Social
                </button>
              )}
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                ← Create Another
              </button>
            </div>

            {/* Confetti */}
            <div className="confetti">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="confetti-piece" style={{ '--delay': `${i * 50}ms` }}></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
