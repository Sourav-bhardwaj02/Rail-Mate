import { Router, Request, Response } from 'express'

export const stationRoutes = Router()

const STATIONS = [
  { id: 'NDLS', name: 'New Delhi', code: 'NDLS', city: 'New Delhi', state: 'Delhi', lat: 28.6424, lng: 77.2194 },
  { id: 'MMCT', name: 'Mumbai Central', code: 'MMCT', city: 'Mumbai', state: 'Maharashtra', lat: 18.9696, lng: 72.8193 },
  { id: 'MAS', name: 'Chennai Central', code: 'MAS', city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { id: 'HWH', name: 'Howrah Junction', code: 'HWH', city: 'Kolkata', state: 'West Bengal', lat: 22.5839, lng: 88.3421 },
  { id: 'SBC', name: 'Bangalore City', code: 'SBC', city: 'Bengaluru', state: 'Karnataka', lat: 12.9769, lng: 77.5713 },
  { id: 'JAT', name: 'Jammu Tawi', code: 'JAT', city: 'Jammu', state: 'J&K', lat: 32.7266, lng: 74.8570 },
  { id: 'PTK', name: 'Pathankot', code: 'PTK', city: 'Pathankot', state: 'Punjab', lat: 32.2748, lng: 75.6520 },
  { id: 'ASR', name: 'Amritsar Junction', code: 'ASR', city: 'Amritsar', state: 'Punjab', lat: 31.6340, lng: 74.8723 },
]

stationRoutes.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: STATIONS })
})

stationRoutes.get('/search', (req: Request, res: Response) => {
  const q = String(req.query.q || '').toLowerCase().trim()
  if (!q || q.length < 2) {
    res.status(400).json({ error: 'Query must be at least 2 characters' })
    return
  }
  const results = STATIONS.filter(s =>
    s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)
  )
  res.json({ success: true, data: results })
})
