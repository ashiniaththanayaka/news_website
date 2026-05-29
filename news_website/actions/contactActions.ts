"use server"

import nodemailer from "nodemailer"

export async function submitContactMessage(formData: FormData) {
  // Get the data from the form
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const userEmail = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Create the email transporter using Gmail account
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  })

  // Set up the email details
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    replyTo: userEmail,
    subject: `New Newsroom Contact: ${subject.toUpperCase()}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 20px;">
        <h2 style="border-bottom: 2px solid #000; padding-bottom: 10px;">Global News - Contact Form</h2>
        <p><strong>From:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Category:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
      </div>
    `,
  }

  try {
    // Send the email
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error("Failed to send email:", error)
    throw new Error("Failed to send message. Please try again.")
  }
}
