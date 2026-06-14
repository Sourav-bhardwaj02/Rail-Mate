import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { authLoginSchema, authRegisterSchema } from '../validators/schemas'
import { prisma } from '../lib/prisma'

export const authRoutes = Router()

authRoutes.post('/register', async (req: Request, res: Response) => {
  const result = authRegisterSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ error: 'Invalid input', details: result.error.flatten().fieldErrors })
    return
  }

  const { email, password, name, phone, guardianEmail } = result.data

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      res.status(409).json({ error: 'Email already registered' })
      return
    }

    // bcrypt cost factor >= 12 as required
    const passwordHash = await bcrypt.hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        phone,
        guardianEmail,
        role: 'USER'
      }
    })

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-dev-secret',
<<<<<<< HEAD
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as any
=======
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
    )

    // httpOnly cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(201).json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  } catch (error) {
    console.error('[AUTH REGISTER ERROR]', error)
    res.status(500).json({ error: 'Internal server error during registration' })
  }
})

authRoutes.post('/login', async (req: Request, res: Response) => {
  const result = authLoginSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ error: 'Invalid credentials format' })
    return
  }

  const { email, password } = result.data

  try {
    let user = await prisma.user.findUnique({ where: { email } })

    // Auto-register for seamless demo experience
    if (!user) {
      const passwordHash = await bcrypt.hash(password, 12)
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0], // Extract name from email
          passwordHash,
          guardianEmail: 'souravbhardwaj2005@gmail.com', // Auto-set guardian for demo
          role: 'USER'
        }
      })
      console.log(`[AUTH] Auto-registered user: ${email}`)
    } else if (!(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-dev-secret',
<<<<<<< HEAD
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as any
=======
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
    )

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  } catch (error) {
    console.error('[AUTH LOGIN ERROR]', error)
    res.status(500).json({ error: 'Internal server error during login' })
  }
})

authRoutes.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('auth_token')
  res.json({ success: true })
})
<<<<<<< HEAD

authRoutes.get('/profile/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: String(req.params.id) },
      select: { id: true, name: true, email: true, phone: true, guardianEmail: true, guardianName: true, role: true }
    })
    if (!user) { res.status(404).json({ error: 'User not found' }); return }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

authRoutes.patch('/guardian', async (req: Request, res: Response) => {
  const { userId, guardianName, guardianEmail } = req.body
  if (!userId) { res.status(400).json({ error: 'userId is required' }); return }
  try {
    const user = await prisma.user.update({
      where: { id: String(userId) },
      data: { guardianName, guardianEmail },
      select: { id: true, guardianName: true, guardianEmail: true }
    })
    res.json({ success: true, user })
  } catch (error) {
    console.error('[GUARDIAN UPDATE ERROR]', error)
    res.status(500).json({ error: 'Failed to update guardian' })
  }
})
=======
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
