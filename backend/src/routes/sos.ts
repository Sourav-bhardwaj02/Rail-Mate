import { Router, Request, Response } from 'express'
import { sosAlertSchema } from '../validators/schemas'
import nodemailer from 'nodemailer'
import { prisma } from '../lib/prisma'

export const sosRoutes = Router()

<<<<<<< HEAD
// Create nodemailer transporter
const getTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false }
=======
// Create nodemailer transporter using environment variables
// It assumes Gmail, but works with others if configured differently
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'souravbhardwaj2005@gmail.com',
    pass: process.env.EMAIL_PASS || '', // Requires App Password
  },
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
})

sosRoutes.post('/alert', async (req: Request, res: Response) => {
  const result = sosAlertSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ error: 'Invalid SOS data', details: result.error.flatten().fieldErrors })
    return
  }

<<<<<<< HEAD
  const { type, location, lat, lng, notes, userId } = result.data
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

  console.log(`[SOS ALERT] ${type} at ${location}`)

  // Build recipient list + user info
  const railwayStaffEmail = process.env.EMAIL_USER || 'souravbhardwaj2005@gmail.com'
  let toRecipients = [railwayStaffEmail]
  let userName = 'Unknown Passenger'
  let userPhone = 'N/A'
  let guardianName = 'N/A'
  let userDetailsHtml = ''
  let dbAlertId = ''

  // Persist to DB first
  try {
    const dbAlert = await prisma.sOSAlert.create({
      data: { type, location, lat, lng, notes, status: 'ACTIVE', userId: userId || null }
    })
    dbAlertId = dbAlert.id
  } catch (err) {
    console.error('[SOS DB SAVE ERROR]', err)
  }

  const alertId = dbAlertId || `SOS-${Date.now()}`
=======
  const { type, location, notes, userId } = result.data
  const alertId = `SOS-${Date.now()}`

  console.log(`[SOS ALERT] ${alertId} — ${type} at ${location}`)

  // Determine recipients
  let toRecipients = ['souravbhardwaj2005@gmail.com'] // Railway staff default
  let userDetailsStr = ''
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98

  if (userId) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (user) {
<<<<<<< HEAD
        userName = user.name || 'Unknown'
        userPhone = user.phone || 'N/A'
        guardianName = user.guardianName || 'N/A'
        userDetailsHtml = `
          <tr><td style="padding:8px 0;color:#374151;font-weight:600;">Passenger Name</td><td style="padding:8px 0;color:#6b7280;">${userName}</td></tr>
          <tr><td style="padding:8px 0;color:#374151;font-weight:600;">Passenger Email</td><td style="padding:8px 0;color:#6b7280;">${user.email}</td></tr>
          <tr><td style="padding:8px 0;color:#374151;font-weight:600;">Phone</td><td style="padding:8px 0;color:#6b7280;">${userPhone}</td></tr>
          <tr><td style="padding:8px 0;color:#374151;font-weight:600;">Guardian</td><td style="padding:8px 0;color:#6b7280;">${guardianName} (${user.guardianEmail || 'N/A'})</td></tr>
        `
=======
        userDetailsStr = `<p><strong>User Name:</strong> ${user.name}</p><p><strong>User Phone:</strong> ${user.phone || 'N/A'}</p>`
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
        if (user.guardianEmail) {
          toRecipients.push(user.guardianEmail)
        }
      }
    } catch (err) {
      console.error('[SOS FETCH USER ERROR]', err)
    }
  }

<<<<<<< HEAD
  // Build map links
  const googleMapsUrl = lat && lng
    ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
  const coordsText = lat && lng ? `${lat.toFixed(6)}, ${lng.toFixed(6)}` : 'Not available'

  const typeLabels: Record<string, string> = {
    MEDICAL: '🏥 Medical Emergency',
    WOMEN_SAFETY: '🛡️ Women Safety',
    SECURITY: '🔒 Security Issue',
    LOST_PASSENGER: '🔍 Lost Passenger',
  }
  const typeLabel = typeLabels[type] || type

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#fef2f2;">
      <div style="max-width:620px;margin:20px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.15);">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#dc2626,#991b1b);padding:30px;text-align:center;">
          <div style="font-size:48px;margin-bottom:10px;">🚨</div>
          <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:800;letter-spacing:1px;">SOS EMERGENCY ALERT</h1>
          <div style="color:#fca5a5;font-size:13px;margin-top:6px;font-weight:600;">RAILMATE AI — IMMEDIATE ACTION REQUIRED</div>
        </div>

        <!-- Alert Type Banner -->
        <div style="background:#7f1d1d;padding:12px 30px;text-align:center;">
          <span style="color:#fecaca;font-size:16px;font-weight:700;">${typeLabel}</span>
        </div>

        <!-- Details Section -->
        <div style="padding:28px 30px;">
          
          <h2 style="color:#dc2626;font-size:16px;margin:0 0 16px;border-bottom:2px solid #fee2e2;padding-bottom:10px;">📋 Alert Details</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#374151;font-weight:600;width:140px;">Alert ID</td><td style="padding:8px 0;color:#6b7280;font-family:monospace;">${alertId}</td></tr>
            <tr><td style="padding:8px 0;color:#374151;font-weight:600;">Emergency Type</td><td style="padding:8px 0;color:#6b7280;">${typeLabel}</td></tr>
            <tr><td style="padding:8px 0;color:#374151;font-weight:600;">Timestamp</td><td style="padding:8px 0;color:#6b7280;">${timestamp}</td></tr>
            <tr><td style="padding:8px 0;color:#374151;font-weight:600;">Notes</td><td style="padding:8px 0;color:#6b7280;">${notes || 'None provided'}</td></tr>
            ${userDetailsHtml}
          </table>

          <!-- Location Section -->
          <h2 style="color:#1e40af;font-size:16px;margin:24px 0 16px;border-bottom:2px solid #dbeafe;padding-bottom:10px;">📍 Location Information</h2>
          <div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:16px;border-radius:0 8px 8px 0;margin-bottom:20px;">
            <p style="margin:0 0 6px;color:#1e3a8a;font-weight:600;">Station / Area:</p>
            <p style="margin:0 0 12px;color:#374151;">${location}</p>
            <p style="margin:0 0 4px;color:#1e3a8a;font-weight:600;">GPS Coordinates:</p>
            <p style="margin:0;color:#374151;font-family:monospace;">${coordsText}</p>
          </div>

          <!-- Map Buttons -->
          <div style="text-align:center;margin:20px 0;">
            <a href="${googleMapsUrl}" target="_blank"
               style="display:inline-block;padding:12px 24px;background:#4285f4;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin-right:10px;">
              📍 View on Google Maps
            </a>
          </div>

          <!-- Action Required -->
          <div style="background:#fef2f2;border-left:4px solid #ef4444;padding:16px;border-radius:0 8px 8px 0;margin-top:20px;">
            <p style="margin:0;color:#991b1b;font-weight:700;font-size:14px;">⚡ Immediate Action Required:</p>
            <p style="margin:8px 0 0;color:#7f1d1d;font-size:13px;">Please locate the passenger immediately and dispatch the nearest security/medical unit. Contact the passenger or their guardian if unreachable.</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#f9fafb;padding:16px 30px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="margin:0;color:#6b7280;font-size:12px;">This is an automated emergency alert generated by the <strong>RailMate AI</strong> system.</p>
          <p style="margin:4px 0 0;color:#9ca3af;font-size:11px;">Do not reply to this email. For support, contact railway helpline.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: `"RailMate AI Emergency" <${process.env.EMAIL_USER}>`,
    to: toRecipients.join(','),
    subject: `🚨 SOS ALERT [${alertId}]: ${typeLabel} — ${location}`,
    html,
    priority: 'high' as const,
  }

  try {
    if (process.env.EMAIL_PASS && process.env.EMAIL_USER) {
      const transporter = getTransporter()
      await transporter.sendMail(mailOptions)
      console.log(`[SOS EMAIL SENT] to: ${toRecipients.join(', ')}`)
    } else {
      console.warn('[SOS EMAIL SKIPPED] EMAIL_USER / EMAIL_PASS not set in .env')
=======
  // Setup email options
  const mailOptions = {
    from: process.env.EMAIL_USER || 'souravbhardwaj2005@gmail.com',
    to: toRecipients.join(','),
    subject: `🚨 URGENT SOS ALERT: ${type} at ${location}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #EF4444; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🚨 RAILMATE EMERGENCY ALERT 🚨</h1>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">Alert Details</h2>
          <p><strong>Alert ID:</strong> ${alertId}</p>
          <p><strong>Emergency Type:</strong> ${type}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Additional Notes:</strong> ${notes || 'None provided.'}</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          ${userDetailsStr}
          
          <div style="margin-top: 20px; padding: 15px; background-color: #FEF2F2; border-left: 4px solid #EF4444; color: #991B1B;">
            <strong>Immediate Action Required:</strong> Please dispatch assistance to the location immediately and contact the guardian.
          </div>
        </div>
        <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          This is an automated emergency message generated by the RailMate AI system.
        </div>
      </div>
    `,
  }

  try {
    // Only attempt to send if a password is provided
    if (process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions)
      console.log(`[SOS EMAIL SENT] to ${mailOptions.to}`)
    } else {
      console.warn('[SOS EMAIL SKIPPED] No EMAIL_PASS provided in .env')
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
    }

    res.status(201).json({
      success: true,
      alertId,
<<<<<<< HEAD
      sentTo: toRecipients,
      message: 'Emergency alert dispatched. Authorities and guardian have been notified.',
=======
      message: 'Emergency alert dispatched and email sent to authorities/guardians.',
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
      dispatchedAt: new Date().toISOString(),
      estimatedResponse: '3-5 minutes',
    })
  } catch (error) {
    console.error('[SOS EMAIL ERROR]', error)
<<<<<<< HEAD
    res.status(201).json({
      success: true,
      alertId,
      message: 'Emergency alert logged. Email delivery failed — please call helpline directly.',
=======
    // Still return 201 because the internal system logged the alert, even if email failed
    res.status(201).json({
      success: true,
      alertId,
      message: 'Emergency alert logged, but failed to send email.',
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
      error: error instanceof Error ? error.message : 'Unknown email error',
    })
  }
})

<<<<<<< HEAD
// Admin: fetch all SOS alerts with full user info
sosRoutes.get('/alerts', async (_req: Request, res: Response) => {
  try {
    const alerts = await prisma.sOSAlert.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true, guardianEmail: true, guardianName: true }
        }
      }
    })
    res.json({ success: true, alerts })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alerts' })
  }
})

// Admin: resolve an alert
sosRoutes.patch('/alerts/:id/resolve', async (req: Request, res: Response) => {
  try {
    const alert = await prisma.sOSAlert.update({
      where: { id: String(req.params.id) },
      data: { status: 'RESOLVED', resolvedAt: new Date() }
    })
    res.json({ success: true, alert })
  } catch (error) {
    res.status(500).json({ error: 'Failed to resolve alert' })
  }
})

=======
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
sosRoutes.get('/status/:alertId', (req: Request, res: Response) => {
  res.json({
    alertId: req.params.alertId,
    status: 'ACTIVE',
    respondingUnit: 'Railway Security Unit 3',
    eta: '4 minutes',
  })
})
