import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env from root and/or backend folder
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/categories';
import addonRoutes from './routes/addons';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL] : true,
    credentials: true,
  }),
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', brand: '4B Foods API' }),
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/addons', addonRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// API 404 handler (only catches unmatched /api routes)
app.use('/api/*', (_req, res) =>
  res.status(404).json({ success: false, message: 'API route not found' }),
);

// Serve Frontend Static Files (Single-service deployment: Railway, Render, VPS)
const candidatePaths = [
  path.resolve(process.cwd(), 'dist'),
  path.resolve(__dirname, '../../../dist'),
  path.resolve(__dirname, '../../dist'),
];
const frontendDistPath = candidatePaths.find((p) => fs.existsSync(p)) || '';

if (frontendDistPath && fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  // Catch-all for SPA client-side routing (e.g. /admin, /)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
  },
);

// Export app for Vercel serverless and local use
export default app;

// Listen when run as a standalone server (Railway, Render, VPS, or local production)
if (!process.env.VERCEL) {
  const PORT = Number(process.env.PORT ?? 5000);

  connectDB()
    .then(() =>
      app.listen(PORT, '0.0.0.0', () =>
        console.log(`🚀  4B Foods running on port ${PORT} (http://localhost:${PORT})`),
      ),
    )
    .catch((err) => {
      console.error('DB connection failed:', err);
      process.exit(1);
    });
}

