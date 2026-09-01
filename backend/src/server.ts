import 'dotenv/config';
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
    origin:
      process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : true,
    credentials: true,
  }),
);

app.use(express.json());

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

// 404 handler
app.use((_req, res) =>
  res.status(404).json({ success: false, message: 'Route not found' }),
);

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

// Only run locally - Vercel serverless will use the exported app
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = Number(process.env.PORT ?? 5000);

  connectDB()
    .then(() =>
      app.listen(PORT, () =>
        console.log(`🚀  4B Foods API running on http://localhost:${PORT}`),
      ),
    )
    .catch((err) => {
      console.error('DB connection failed:', err);
      process.exit(1);
    });
}
