import { Router, Request, Response } from 'express'

export const crowdRoutes = Router()

crowdRoutes.get('/status', (_req: Request, res: Response) => {
  const platforms = ['Platform 1', 'Platform 2', 'Platform 3', 'Platform 4', 'Platform 6'].map((name, i) => ({
    platformId: `p${i + 1}`,
    platformName: name,
    occupancy: Math.floor(Math.random() * 60) + 20,
    level: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)],
    nextTrain: `EX-${200 + i * 94}`,
    nextTrainETA: Math.floor(Math.random() * 15) + 1,
  }))

  res.json({
    stationId: 'NDLS',
    stationName: 'New Delhi Railway Station',
    platformData: platforms,
    overallLevel: 'MEDIUM',
    congestionAlerts: [
      { id: 'ca1', location: 'Platform 4 North', level: 'HIGH', message: 'Peak hour congestion detected. Alternative platforms suggested.' },
    ],
    lastUpdated: new Date().toISOString(),
  })
})
