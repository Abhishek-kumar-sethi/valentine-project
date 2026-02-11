import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// API routes
import createValentine from './api/create-valentine.js'
import sendResponse from './api/send-response.js'

app.post('/api/create-valentine', createValentine)
app.post('/api/send-response', sendResponse)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`)
})
