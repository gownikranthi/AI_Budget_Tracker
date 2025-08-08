import express from 'express';
import cors from 'cors';
import { createRoutes } from './routes.js';
import { DbStorage } from './storage.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Create storage instance
const storage = new DbStorage();

// API routes
app.use('/api', createRoutes(storage));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS allowed origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});