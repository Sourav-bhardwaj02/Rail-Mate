import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log full error server-side
  console.error('[ERROR]', err.stack || err.message)

  // Never expose internal details to client
  const status = (err as any).status || 500
  res.status(status).json({
    error: status < 500 ? err.message : 'Something went wrong. Please try again.',
  })
}

export class AppError extends Error {
  constructor(public message: string, public status: number) {
    super(message)
    this.name = 'AppError'
  }
}
