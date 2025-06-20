import { Request, Response } from 'express';

export const healthCheck = (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Service is healthy',
    timestamp: new Date().toISOString(),
  });
}; 