import React, { useState, useEffect } from 'react'
import './valentine.css'

export default function ValentineLanding() {
  const [valentine, setValentine] = useState(null)
  const [hasResponded, setHasResponded] = useState(false)
  const [response, setResponse] = useState(null)
  const [showSentPopup, setShowSentPopup] = useState(false)
  const [currentStep, setCurrentStep] = useState(0) // 0: valentine Q, 1: message, 2: love Q, 3: date plan, 4: final response
  const [answers, setAnswers] = useState({})

  const initialQuestion = { 
    id: 'valentine',
    type: 'buttons',
    question: 'Will you be my Valentine?',
    options: [
      { emoji: '💚', text: 'Yes' },
      { emoji: '😘', text: 'Of course' },
      { emoji: '😉', text: "Let's see 😉" },
    ],      
  }

  // Love question before showing date plan
  const loveQuestions = [
    {
      id: 'loveMe',
      type: 'buttons',
      question: 'Do you love me?',
      options: [
        { emoji: '💕', text: 'Yes' },
        { emoji: '😍', text: 'Obviously' },
        { emoji: '🔥', text: 'Hell yes' },
      ],
    },
  ]

  useEffect(() => {
    // Decode URL hash
    const hash = window.location.hash.replace('#valentine=', '')
    if (hash) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(hash)))
        setValentine(decoded)
      } catch (e) {
        console.error('Failed to decode valentine:', e)
      }
    }
  }, [])


    const triggerConfetti = () => {
      const confetti = document.querySelectorAll('.valentine-confetti')
      confetti.forEach((el) => {
        el.style.animation = 'confettiFall 3s ease-out forwards'
      })
    }

  const handleValentineQuestion = (text) => {
    if (text === 'Yes' || text === 'Of course') {
      setAnswers(prev => ({
        ...prev,
        valentine: text
      }))
      setTimeout(() => setCurrentStep(1), 600)
    }
  }

  const handleLoveQuestion = (text) => {
    setAnswers(prev => ({
      ...prev,
      loveMe: text
    }))
    setTimeout(() => setCurrentStep(3), 600)
  }

  const handleProceedToQuestions = () => {
    setCurrentStep(2)
  }

  const handleProceedToResponse = () => {
    setCurrentStep(4)
  }

  const handleFinalResponse = (resp) => {
    console.log('📝 Response submitted:', resp)
    setResponse(resp)
    setShowSentPopup(true)
    triggerConfetti()

    // Send response notification to the creator via backend
    (async () => {
      try {
        const payload = {
          senderEmail: valentine?.senderEmail,
          senderName: valentine?.senderName,
          partnerName: valentine?.partnerName,
          response: resp,
          dateType: valentine?.dateType,
        }

        const r = await fetch('/api/send-response', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!r.ok) {
          const err = await r.json().catch(() => ({}))
          console.error('Failed to send notification:', err)
        } else {
          console.log('Notification sent to creator')
        }
      } catch (e) {
        console.error('Error calling send-response API:', e)
      }
    })()

    // Auto-hide popup after 3 seconds
    setTimeout(() => {
      setShowSentPopup(false)
      setHasResponded(true)
    }, 3000)
  }

  if (!valentine) {
    return (
      <div className="valentine-container">
        <div className="error-message">
          <p>💔 The Valentine link seems to be broken or expired.</p>
        </div>
      </div>
    )
  }

  // Pop-up overlay
  const PopupOverlay = () => (
    <div className="popup-overlay">
      <div className="popup-message">
        <div className="popup-icon">✅</div>
        <h3>Your Response Sent!</h3>
        <p>Thank you for your response! 💌</p>
      </div>
    </div>
  )

  const { senderName, partnerName, partnerNickname, relationship, shortMessage, dateType } = valentine

  // Background decorations
  const bgDecorations = (
    <div className="valentine-bg">
      <div className="bg-heart bg-1">❤️</div>
      <div className="bg-heart bg-2">💕</div>
      <div className="bg-heart bg-3">✨</div>
      <div className="bg-heart bg-4">💖</div>
    </div>
  )

  // STEP 0: Valentine Question Page
  if (currentStep === 0) {
    return (
      <div className="valentine-container">
        {showSentPopup && <PopupOverlay />}
        {bgDecorations}
        <div className="valentine-card-main">
          <div className="initial-question-container">
            <h2 className="initial-greeting">Will you be my Valentine?</h2>
            <p className="initial-subtext">From {senderName || 'someone special'} 💌</p>
          </div>
          
          <div className="question-options">
            {initialQuestion.options.map((option, idx) => (
              <button
                key={idx}
                className="question-option large-option"
                onClick={() => handleValentineQuestion(option.text)}
              >
                <span className="option-emoji large-emoji">{option.emoji}</span>
                <span className="option-text">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // STEP 1: Message Reveal Page
  if (currentStep === 1) {
    return (
      <div className="valentine-container">
        {showSentPopup && <PopupOverlay />}
        {bgDecorations}
        <div className="valentine-card-main">
          <div className="valentine-header">
            <div className="from-text">From {senderName || 'someone special'} 💌</div>
            <h1 className="valentine-greeting">Hi, {partnerNickname || partnerName}! 👋</h1>
          </div>

          <div className="valentine-message">
            <div className="message-quote">"{shortMessage}"</div>
            <div className="relationship-badge">{relationship}</div>
          </div>

          <button className="next-btn" onClick={handleProceedToQuestions}>
            Next 💕 →
          </button>
        </div>
      </div>
    )
  }

  // STEP 2: Love Question (Buttons)
  if (currentStep === 2) {
    return (
      <div className="valentine-container">
        {showSentPopup && <PopupOverlay />}
        {bgDecorations}
        <div className="valentine-card-main">
          <div className="question-header">
            <p className="question-subtitle">Let's get to know you better! 💕</p>
            <div className="question-progress">
              <div className="progress-dot completed"></div>
              <div className="progress-dot active"></div>
            </div>
          </div>

          <div className="question-card">
            <h3 className="question-text">{loveQuestions[0].question}</h3>
            
            <div className="question-options">
              {loveQuestions[0].options.map((option, idx) => (
                <button
                  key={idx}
                  className="question-option"
                  onClick={() => handleLoveQuestion(option.text)}
                >
                  <span className="option-emoji">{option.emoji}</span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // STEP 3: Date Plan Page
  if (currentStep === 3) {
    return (
      <div className="valentine-container">
        {showSentPopup && <PopupOverlay />}
        {bgDecorations}
        <div className="valentine-card-main">
          <div className="final-date-section">
            <h2>Here's your date plan! 🎯</h2>
            <div className="final-date-idea">
              <span className="final-date-emoji">
                {dateType === 'Movie' && '🎬'}
                {dateType === 'Dinner' && '🍽️'}
                {dateType === 'Walk' && '🚶'}
                {dateType === 'Coffee' && '☕'}
                {dateType === 'Beach' && '🏖️'}
                {dateType === 'Picnic' && '🧺'}
                {dateType === 'Adventure' && '🎢'}
                {dateType === 'Surprise' && '🎁'}
              </span>
              <div className="final-date-details">
                <p className="final-date-text">{dateType}</p>
                <p className="date-message">Sounds fun, right? 💕</p>
              </div>
            </div>
          </div>

          <button className="next-btn" onClick={handleProceedToResponse}>
            Continue 💕 →
          </button>
        </div>
      </div>
    )
  }

  // STEP 4: Final Response Page
  if (currentStep === 4) {
    return (
      <div className="valentine-container">
        {showSentPopup && <PopupOverlay />}
        {bgDecorations}
        <div className="valentine-card-main">
          <div className="response-section">
            <p className="response-label">So, what do you say? 💕</p>
            <div className="response-buttons">
              <button
                className="response-btn yes"
                onClick={() => handleFinalResponse('Yes! Let\'s go!')}
              >
                💚 Yes! Let's go!
              </button>
              <button
                className="response-btn maybe"
                onClick={() => handleFinalResponse("Maybe... 😏")}
              >
                😏 Maybe...
              </button>
              <button
                className="response-btn no"
                onClick={() => handleFinalResponse("Hmm, not sure 😅")}
              >
                😅 Not Sure
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Response/Celebration Screen (after response submitted)
  if (hasResponded) {
    return (
      <div className="valentine-container">
        {showSentPopup && <PopupOverlay />}
        {bgDecorations}
        <div className="response-screen">
          <div className="submission-header">
            <div className="submission-check">✅</div>
            <h2>Your Response Sent! 🎊</h2>
            <p>Your response has been delivered successfully!</p>
            
            <div className="creator-info-box">
              <p className="creator-label">📤 Response Sent To:</p>
              <p className="creator-name">{valentine?.senderName || 'Your Valentine Creator'}</p>
              <p className="creator-email">{valentine?.senderEmail}</p>
            </div>
          </div>

          <div className="response-message">
            <div className="your-choice">
              <p className="choice-label">Your Response:</p>
              <p className="choice-text">{response}</p>
            </div>
            
            {response.includes('Yes') && (
              <>
                <div className="response-icon">🎉</div>
                <h2>That's Amazing! 🥰</h2>
                <p>They said YES!</p>
                <p className="sub-text">Get ready for an unforgettable date! 💕</p>
              </>
            )}
            {response.includes('Maybe') && (
              <>
                <div className="response-icon">😏</div>
                <h2>Playing Hard to Get? 😏</h2>
                <p>We'll see what happens!</p>
                <p className="sub-text">Still a win in our books! 💖</p>
              </>
            )}
            {response.includes('Not Sure') && (
              <>
                <div className="response-icon">😄</div>
                <h2>Take Your Time! 💭</h2>
                <p>No pressure, we've got time!</p>
                <p className="sub-text">Let them know when you're ready 💕</p>
              </>
            )}
          </div>

          <div className="confetti-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="valentine-confetti"
                style={{
                  '--delay': `${i * 40}ms`,
                  '--left': `${Math.random() * 100}%`,
                }}
              >
                {['❤️', '💕', '✨', '💖'].at(i % 4)}
              </div>
            ))}
          </div>

          <button className="back-to-home-btn" onClick={() => window.location.href = window.location.pathname}>
            ← Create Another Valentine
          </button>
        </div>
      </div>
    )
  }

  return null
}
