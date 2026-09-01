import app from '../src/server';
import { connectDB } from '../src/config/db';

// Store connection promise to reuse across serverless invocations
let db_connection: Promise<void> | null = null;

/**
 * Vercel serverless handler
 * Connects to DB once and reuses the connection across requests
 */
async function handler(req: any, res: any): Promise<void> {
  // Connect to DB on first request (Mongoose caches connection in driver)
  if (!db_connection) {
    db_connection = connectDB().catch((err: Error) => {
      console.error('DB connection failed:', err);
      db_connection = null; // Reset on error for retry
      throw err;
    });
  }

  try {
    await db_connection;
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(503).json({
      success: false,
      message: 'Database connection failed',
    });
    return;
  }

  // Pass request to Express app
  app(req, res);
}

export default handler;
