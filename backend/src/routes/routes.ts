import { Router, Request, Response } from 'express'
import { routePlanSchema } from '../validators/schemas'
import { GoogleGenAI } from '@google/genai'

export const routeRoutes = Router()

const STATION_MAP: Record<string, string> = {
  'New Delhi': 'NDLS',
  'Mumbai Central': 'BCT',
  'Chennai Central': 'MAS',
  'Kolkata': 'HWH',
  'Bangalore City': 'SBC',
  'Hyderabad': 'SC',
  'Pune': 'PUNE',
  'Ahmedabad': 'ADI',
  'Jaipur': 'JP',
  'Lucknow': 'LKO',
  'Jammu Tawi': 'JAT',
  'Pathankot': 'PTK',
  'Srinagar': 'SINA',
  'Amritsar': 'ASR',
  'Chandigarh': 'CDG'
}

function parseDuration(durationStr: string): number {
  if (!durationStr) return 0;
  const parts = durationStr.split(':')
  const hours = parseInt(parts[0]) || 0
  const minutes = parseInt(parts[1]) || 0
  return hours + (minutes / 60);
}

function formatDuration(durationStr: string): string {
  if (!durationStr) return "N/A";
  const parts = durationStr.split(':')
  return `${parts[0] || '0'}h ${parts[1] || '00'}m`;
}

routeRoutes.post('/plan', async (req: Request, res: Response): Promise<void> => {
  const result = routePlanSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ error: 'Invalid input', details: result.error.flatten().fieldErrors })
    return
  }

  const { from, to, date } = result.data

  if (from.toLowerCase() === to.toLowerCase()) {
    res.status(400).json({ error: 'Source and destination cannot be the same' })
    return
  }

  const fromCode = STATION_MAP[from] || from
  const toCode = STATION_MAP[to] || to
  const [year, month, day] = date.split('-')
  const formattedDate = `${day}-${month}-${year}` // IRCTC API needs DD-MM-YYYY

  const apiKey = process.env.RAPID_API_KEY
  if (!apiKey) {
     res.status(500).json({ error: 'RAPID_API_KEY not configured' })
     return
  }

  const url = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${fromCode}&toStationCode=${toCode}&dateOfJourney=${formattedDate}`
  
  console.log(`[ROUTE PLANNER] Querying RapidAPI: ${fromCode} -> ${toCode} on ${formattedDate}`);
  
  try {
    const rapidRes = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'irctc1.p.rapidapi.com',
        'x-rapidapi-key': apiKey
      }
    });

    const rapidData = await rapidRes.json() as any;
    let trains = rapidData?.data || [];
    const routes = [];

    if (trains.length > 0) {
      // Sort trains by duration (fastest first)
      trains.sort((a: any, b: any) => parseDuration(a.duration) - parseDuration(b.duration));

      // Map top 3 direct trains
      for (let i = 0; i < Math.min(3, trains.length); i++) {
        const t = trains[i];
        
        // Mocking price and occupancy since API might not provide full seat mapping
        const price = Math.floor(Math.random() * 2000) + 800;
        const occupancy = Math.floor(Math.random() * 60) + 30; // 30% to 90%
        
        const route = {
          id: `direct-${i}`,
          type: 'DIRECT',
          label: i === 0 ? 'Fastest Direct Route' : 'Direct Route',
          aiRecommended: i === 0,
          trains: [{
            name: t.train_name,
            number: t.train_number,
            from: from,
            to: to,
            dep: t.from_std,
            arr: t.to_sta + (t.to_day > t.from_day ? `+${t.to_day - t.from_day}` : ''),
            duration: formatDuration(t.duration),
            class: t.class_type?.[0] || 'SL',
            price: price,
            occupancy: occupancy
          }],
          totalDuration: formatDuration(t.duration),
          totalCost: price,
          journeyScore: 100 - occupancy + (i === 0 ? 20 : 0), // Base score off occupancy
          crowdScore: occupancy > 70 ? 'HIGH' : occupancy > 40 ? 'MEDIUM' : 'LOW',
          exchanges: 0,
          tags: ['Direct', t.train_type || 'Express'],
          reasoning: `Direct connection via ${t.train_name}. No changes required. Expected crowd: ${occupancy}%.`
        };
        routes.push(route);
      }
    } 

    // AI Fallback / Alternative Connective Route
    // Provide alternative if no direct trains, or just to provide one AI option
    try {
      if (process.env.GEMINI_API_KEY) {
        console.log(`[ROUTE PLANNER] Asking Gemini for connecting routes for ${from} to ${to}...`);
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
        
        const prompt = `
          You are an expert Indian Railways transit planner.
          The user wants to travel from "${from}" to "${to}".
          ${trains.length === 0 ? "There are NO direct trains available on this route." : "Suggest a smart connecting route as an alternative."}
          
          Suggest exactly ONE logical connecting train route that involves exactly 1 train change (exchange) at a major junction.
          Make up realistic train names, train numbers, and timings that make logical sense.
          
          Return ONLY a valid JSON object matching this exact structure:
          {
            "id": "ai-1",
            "type": "ALTERNATIVE",
            "label": "AI Connecting Route",
            "aiRecommended": ${trains.length === 0 ? "true" : "false"},
            "trains": [
              {
                "name": "Train 1 Name",
                "number": "12345",
                "from": "${from}",
                "to": "Junction City",
                "dep": "10:00",
                "arr": "15:00",
                "duration": "5h 0m",
                "class": "3A",
                "price": 600,
                "occupancy": 45
              },
              {
                "name": "Train 2 Name",
                "number": "67890",
                "from": "Junction City",
                "to": "${to}",
                "dep": "16:30",
                "arr": "22:00",
                "duration": "5h 30m",
                "class": "3A",
                "price": 500,
                "occupancy": 30
              }
            ],
            "totalDuration": "12h 0m",
            "totalCost": 1100,
            "journeyScore": 85,
            "crowdScore": "LOW",
            "exchanges": 1,
            "tags": ["AI Pick", "Smart Connection"],
            "reasoning": "A brief explanation of why this connecting route is suggested (e.g., lower crowd, faster connection, only option available)."
          }
        `;

        const aiRes = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        })
        
        const responseText = aiRes.text || "";
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          const aiRoute = JSON.parse(jsonMatch[0]);
          routes.push(aiRoute);
        }
      }
    } catch (aiErr) {
      console.error("[ROUTE PLANNER] Gemini fallback failed:", aiErr);
    }

    res.json({ success: true, data: routes })
  } catch (error) {
    console.error('[ROUTE PLANNER] Error:', error)
    res.status(500).json({ error: 'Failed to fetch routes' })
  }
})
