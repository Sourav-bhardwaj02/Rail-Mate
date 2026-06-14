import { z } from 'zod'

export const routePlanSchema = z.object({
  from: z.string().min(2).max(100).trim(),
  to: z.string().min(2).max(100).trim(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  passengers: z.number().int().min(1).max(6).optional().default(1),
  travelClass: z.enum(['SL', '3A', '2A', '1A', 'CC', 'EC', '2S']).optional().default('3A'),
})

export const sosAlertSchema = z.object({
  type: z.enum(['MEDICAL', 'WOMEN_SAFETY', 'SECURITY', 'LOST_PASSENGER']),
  location: z.string().min(1).max(200).trim(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  notes: z.string().max(500).optional(),
  userId: z.string().optional(),
})

export const authLoginSchema = z.object({
  email: z.string().email().max(255).toLowerCase().trim(),
  password: z.string().min(8).max(128),
})

export const authRegisterSchema = z.object({
  email: z.string().email().max(255).toLowerCase().trim(),
  password: z.string().min(8).max(128)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2).max(100).trim(),
  phone: z.string().min(10).max(20).optional(),
  guardianEmail: z.string().email().optional(),
})

export type RoutePlanInput = z.infer<typeof routePlanSchema>
export type SOSAlertInput = z.infer<typeof sosAlertSchema>
export type AuthLoginInput = z.infer<typeof authLoginSchema>
export type AuthRegisterInput = z.infer<typeof authRegisterSchema>
