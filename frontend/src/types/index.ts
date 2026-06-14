// ============================================================
// Global shared types for RailMate AI
// ============================================================

export interface Station {
  id: string
  name: string
  code: string
  city: string
  state: string
  lat: number
  lng: number
  crowdLevel: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface TrainRoute {
  id: string
  trainNumber: string
  trainName: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  stops: RouteStop[]
  price: number
  class: string
  occupancy: number // 0–100 percent
  delayRisk: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface RouteStop {
  station: string
  stationCode: string
  arrival: string
  departure: string
  platform: string
}

export interface PlannedRoute {
  id: string
  type: 'DIRECT' | 'CONNECTING' | 'ALTERNATIVE'
  label: string
  trains: TrainRoute[]
  totalDuration: string
  totalCost: number
  journeyScore: number
  crowdScore: 'LOW' | 'MEDIUM' | 'HIGH'
  exchanges: number
  aiRecommended: boolean
  tags: string[]
  reasoning: string
}

export interface CrowdData {
  stationId: string
  stationName: string
  platformData: PlatformCrowd[]
  overallLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  congestionAlerts: CongestionAlert[]
  lastUpdated: string
}

export interface PlatformCrowd {
  platformId: string
  platformName: string
  occupancy: number
  level: 'LOW' | 'MEDIUM' | 'HIGH'
  nextTrain: string
  nextTrainETA: number // minutes
}

export interface CongestionAlert {
  id: string
  location: string
  level: 'HIGH' | 'CRITICAL'
  message: string
  trainId?: string
}

export interface EmergencyContact {
  id: string
  name: string
  phone: string
  relation: string
  avatar?: string
}

export interface AccessibilitySettings {
  highContrast: boolean
  largeText: boolean
  helpBuddyActive: boolean
  voiceSpeed: 'slow' | 'normal' | 'fast'
  voiceType: string
  keyboardNav: boolean
}

export interface SOSEvent {
  id: string
  type: 'MEDICAL' | 'WOMEN_SAFETY' | 'SECURITY' | 'LOST_PASSENGER'
  location: string
  timestamp: string
  status: 'ACTIVE' | 'RESOLVED'
}

export interface StationMapPoint {
  id: string
  type: 'PLATFORM' | 'EXIT' | 'ESCALATOR' | 'LIFT' | 'WAITING_ROOM' | 'WASHROOM' | 'FOOD' | 'HELP'
  name: string
  description: string
  lat: number
  lng: number
  accessible: boolean
}
