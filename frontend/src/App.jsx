import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import ValentineForm from "./ValentineForm"
import ValentineLanding from "./valentine"
import ResponsePage from "./ResponsePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<ValentineForm />} />
        <Route path="/valentine/:data" element={<ValentineLanding />} />
        <Route path="/response/:data" element={<ResponsePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
