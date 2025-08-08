import express from 'express';
import { createRoutes } from './routes.js';
import { DbStorage } from './storage.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(express.json());

  // Create storage instance
  const storage = new DbStorage();

  // API routes
  app.use(createRoutes(storage));

  // Development mode - integrate Vite
  if (process.env.NODE_ENV !== 'production') {
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
        root: path.join(__dirname, '../client'),
        resolve: {
          alias: {
            '@': path.join(__dirname, '../client'),
          },
        },
      });
      
      app.use(vite.ssrFixStacktrace);
      app.use(vite.middlewares);
    } catch (error) {
      console.warn('Vite server setup failed, serving static files:', error);
      // Fallback: serve static files if Vite fails
      app.use(express.static(path.join(__dirname, '../client')));
      app.get('*', (req, res) => {
        if (req.path.startsWith('/api')) return;
        res.sendFile(path.join(__dirname, '../client/index.html'));
      });
    }
  } else {
    // Production mode - serve static files
    app.use(express.static(path.join(__dirname, '../dist')));
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) return;
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend available at http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
  });
}

startServer().catch(console.error);