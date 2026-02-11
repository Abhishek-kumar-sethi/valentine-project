import { useParams, useNavigate } from "react-router-dom"
import "./response.css"
export default function ResponsePage() {
  const { data } = useParams()
  const navigate = useNavigate()

  let decoded = null

  try {
    decoded = JSON.parse(
      decodeURIComponent(atob(data))
    )
  } catch (err) {
    return <h2>Invalid or Corrupted Response Link</h2>
  }

  return (
  <div className="response-container">
    <div className="response-card">

      <div className="response-header">
        <div className="response-icon">💌</div>
        <h2 className="response-title">Valentine Response</h2>
        <p className="response-subtitle">
          Someone replied to your invitation 💖
        </p>
      </div>

      <div className="response-details">

        <div className="detail-item">
          <span className="detail-label">Partner</span>
          <span className="detail-value">{decoded.partnerName}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Date Plan</span>
          <span className="detail-value">{decoded.dateType}</span>
        </div>

        <div className="detail-item highlight">
          <span className="detail-label">Response</span>
          <span className="detail-value">{decoded.response}</span>
        </div>

      </div>

      <button 
        className="response-home-btn"
        onClick={() => navigate("/")}
      >
        ← Go Home
      </button>

    </div>
  </div>
)

}
