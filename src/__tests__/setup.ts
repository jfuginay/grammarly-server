import { config } from 'dotenv';

// Load test environment variables
config({ path: '.env.test' });

// Set default test environment variables if not present
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/grammarly_test?schema=public';
process.env.REDIS_URL = 'redis://localhost:6379'; 