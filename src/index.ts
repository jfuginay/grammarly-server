import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import { errorHandler } from './presentation/middleware/error-handler';
import { rateLimiter } from './presentation/middleware/rate-limiter';
import { authRoutes } from './presentation/routes/auth.routes';
import { documentRoutes } from './presentation/routes/document.routes';
import { grammarRoutes } from './presentation/routes/grammar.routes';
import { healthCheck } from './presentation/controllers/health.controller';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true,
}));
app.use(express.json());
app.use(rateLimiter);

// Routes
app.get('/health', healthCheck);
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/grammar', grammarRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
}); 