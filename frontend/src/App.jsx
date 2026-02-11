import { useState, useEffect } from 'react'
import './App.css'
import Home from './Home'
import ValentineForm from './form'
import ValentineLanding from './valentine'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    // Check if URL has valentine hash
    if (window.location.hash.includes('valentine=')) {
      setCurrentPage('valentine')
    }
  }, [])

  return (
    <div className="app">
      {currentPage === 'valentine' ? (
        <ValentineLanding />
      ) : currentPage === 'form' ? (
        <ValentineForm onBack={() => setCurrentPage('home')} />
      ) : (
        <Home onCreateClick={() => setCurrentPage('form')} />
      )}
    </div>
  )
}

export default App
