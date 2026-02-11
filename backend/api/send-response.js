import nodemailer from 'nodemailer'

export default async function sendResponse(req, res) {
  try {
    const { senderEmail, senderName, partnerName, response, dateType } = req.body

    if (!senderEmail || !response) {
      return res.status(400).json({ error: 'Missing data' })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: senderEmail,
      subject: `💖 ${partnerName} responded to your Valentine!`,
      html: `
        <h2>Good news ${senderName}! 🎉</h2>
        <p><b>${partnerName}</b> replied:</p>
        <h3>${response}</h3>
        <p>Date idea: <b>${dateType}</b></p>
        <p>Good luck 😉</p>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Response email failed' })
  }
}
