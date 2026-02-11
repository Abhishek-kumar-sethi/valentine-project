import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./valentine.css"

export default function ValentineLanding() {
  const { data } = useParams()
  const navigate = useNavigate()

  const [valentine, setValentine] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [response, setResponse] = useState(null)
  const [shareLink, setShareLink] = useState("")

  // Decode URL param
  useEffect(() => {
    try {
      const decoded = JSON.parse(
        decodeURIComponent(atob(data))
      )
      setValentine(decoded)
    } catch (e) {
      console.error("Invalid link")
    }
  }, [data])

  if (!valentine) {
    return (
      <div className="valentine-container">
        <p>💔 Invalid or Broken Link</p>
      </div>
    )
  }

  const { senderName, partnerName, shortMessage, relationship, dateType } =
    valentine

  const handleFinalResponse = (resp) => {
    setResponse(resp)

    const resultPayload = {
      partnerName,
      dateType,
      response: resp,
    }

    const encoded = btoa(
      unescape(encodeURIComponent(JSON.stringify(resultPayload)))
    )

    const link = `${window.location.origin}/response/${encoded}`

    setShareLink(link)
    setCurrentStep(4)
  }

  if (currentStep === 0) {
  return (
    <div className="valentine-container">
      <div className="valentine-card-main">

        <div className="initial-question-container">
          <h2 className="initial-greeting">
            Will you be my Valentine? 💖
          </h2>
          <p className="initial-subtext">From {senderName}</p>
        </div>

        <div className="response-buttons">
          <button 
            className="response-btn yes large-option"
            onClick={() => setCurrentStep(1)}
          >
            💚 Yes
          </button>

          <button 
            className="response-btn maybe large-option"
            onClick={() => setCurrentStep(1)}
          >
            😘 Of course
          </button>

          <button 
            className="response-btn no large-option"
            onClick={() => setCurrentStep(1)}
          >
            😉 Let's see
          </button>
        </div>

      </div>
    </div>
  )
}


 if (currentStep === 1) {
  return (
    <div className="valentine-container">
      <div className="valentine-card-main">

        <div className="valentine-header">
          <p className="from-text">For {partnerName}</p>
          <h2 className="valentine-greeting">A Little Message 💌</h2>
        </div>

        <div className="valentine-message">
          <p className="message-quote">"{shortMessage}"</p>
          <div className="relationship-badge">
            {relationship}
          </div>
        </div>

        <button 
          className="next-btn"
          onClick={() => setCurrentStep(2)}
        >
          Continue →
        </button>

      </div>
    </div>
  )
}


  if (currentStep === 2) {
  return (
    <div className="valentine-container">
      <div className="valentine-card-main">

        <div className="date-section">
          <p className="date-label">Here’s my plan for us…</p>

          <div className="date-idea">
            <span className="date-emoji">🎯</span>
            <span className="date-text">{dateType}</span>
          </div>
        </div>

        <button 
          className="next-btn"
          onClick={() => setCurrentStep(3)}
        >
          Sounds exciting →
        </button>

      </div>
    </div>
  )
}

if (currentStep === 3) {
  return (
    <div className="valentine-container">
      <div className="valentine-card-main">

        <div className="response-section">
          <p className="response-label">
            So… what do you say? 💕
          </p>

          <div className="response-buttons">
            <button 
              className="response-btn yes"
              onClick={() => handleFinalResponse("💚 Yes! Let's go!")}
            >
              💚 Yes! Let's go!
            </button>

            <button 
              className="response-btn maybe"
              onClick={() => handleFinalResponse("😏 Maybe...")}
            >
              😏 Maybe...
            </button>

            <button 
              className="response-btn no"
              onClick={() => handleFinalResponse("😅 Not Sure")}
            >
              😅 Not Sure
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}


  if (currentStep === 4) {
  return (
    <div className="valentine-container">
      <div className="response-screen">

        <div className="submission-header">
          <div className="submission-check">💖</div>
          <h2>Response Submitted</h2>
          <p>Your love story just got interesting ✨</p>
        </div>

        <div className="your-choice">
          <p className="choice-label">Your Choice</p>
          <p className="choice-text">{response}</p>
        </div>

        <div className="share-button-container">
          <button
            className="share-btn"
            onClick={() => {
              navigator.clipboard.writeText(shareLink)
              alert("Link copied!")
            }}
          >
            Copy Link share your response
          </button>
        </div>

        <button
          className="back-to-home-btn"
          onClick={() => navigate("/")}
        >
          ← Create Another
        </button>

      </div>
    </div>
  )
}


  return null
}
