import "./config/db"; 

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import { errorHandler } from "./middleware/errorHandler";

// Missing Person Routes
import uploadRoutes from "./routes/upload.routes";
import reportRoutes from "./routes/report.routes";
import matchRoutes from "./routes/match.routes";
import geminiRoutes from "./routes/gemini.routes";
import searchRoutes from "./routes/search.routes";
import cameraRoutes from "./routes/camera.routes";
import profileRoutes from "./routes/profile.routes";

// RailMate Routes
import { routeRoutes } from "./routes/routes";
import { crowdRoutes } from "./routes/crowd";
import { sosRoutes } from "./routes/sos";
import { authRoutes } from "./routes/auth";
import { stationRoutes } from "./routes/stations";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const CORS_ORIGINS = (
  process.env.CORS_ORIGINS ||
  "http://localhost:5173"
).split(",");


// ======================
// Security
// ======================

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
    },
    frameguard: {
      action: "deny",
    },
    noSniff: true,
    referrerPolicy: {
      policy: "strict-origin-when-cross-origin",
    },
  })
);


// ======================
// CORS
// ======================

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.startsWith("http://localhost") ||
        CORS_ORIGINS.includes(origin)
      ) {
        return callback(null, true);
      }

      callback(
        new Error(
          `CORS: Origin ${origin} not allowed`
        )
      );
    },
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],
  })
);


// ======================
// Body Parser
// ======================

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);


// ======================
// Rate Limiters
// ======================

const generalLimiter = rateLimit({
  windowMs:
    Number(
      process.env.RATE_LIMIT_WINDOW_MS
    ) || 60_000,

  max:
    Number(
      process.env.RATE_LIMIT_MAX
    ) || 60,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    error:
      "Too many requests. Please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    error:
      "Too many auth attempts. Please try again in 15 minutes.",
  },
});

const aiLimiter = rateLimit({
  windowMs: 60_000,

  max: 10,

  standardHeaders: true,

  message: {
    error:
      "AI rate limit exceeded. Please slow down.",
  },
});

app.use("/api", generalLimiter);


// ======================
// Root
// ======================

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message:
      "RailMate + Missing Person Backend Running",
  });
});


// ======================
// Missing Person Routes
// ======================

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/matches",
  matchRoutes
);

app.use(
  "/api/gemini",
  geminiRoutes
);

app.use(
  "/api/search",
  searchRoutes
);

app.use(
  "/api/camera",
  cameraRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);


// ======================
// RailMate Routes
// ======================

app.use(
  "/api/auth",
  authLimiter,
  authRoutes
);

app.use(
  "/api/routes",
  aiLimiter,
  routeRoutes
);

app.use(
  "/api/crowd",
  crowdRoutes
);

app.use(
  "/api/sos",
  sosRoutes
);

app.use(
  "/api/stations",
  stationRoutes
);


// ======================
// Health Check
// ======================

app.get(
  "/api/health",
  (_req, res) => {
    res.json({
      status: "ok",
      timestamp:
        new Date().toISOString(),
      service:
        "RailMate + Missing Person API",
    });
  }
);


// ======================
// 404
// ======================

app.use((_req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
  });
});


// ======================
// Error Handler
// ======================

app.use(errorHandler);


// ======================
// Start Server
// ======================

app.listen(PORT, () => {
  console.log(
    `🚀 Backend running on http://localhost:${PORT}`
  );
});

export default app;