import nodemailer from 'nodemailer'

export default async function createValentine(req, res) {
  try {
    const { senderEmail, senderName, partnerName, link } = req.body

    if (!senderEmail || !link) {
      return res.status(400).json({ error: 'Missing email or link' })
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
      subject: `💌 Your Valentine link for ${partnerName}`,
      html: `
        <h2>Hello ${senderName} 💖</h2>
        <p>Your Valentine page is ready!</p>
        <p>Send this link to <b>${partnerName}</b>:</p>
        <a href="${link}">${link}</a>
        <p>You'll get notified when they respond 💕</p>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Email failed' })
  }
}
