import express from 'express';
import { registerRoutes } from '../server/routes.js';
import { getPool } from '../server/db.js';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
registerRoutes(app);

// Add middleware to close DB connections after request completes
app.use((req, res, next) => {
  const originalEnd = res.end;
  res.end = function(...args) {
    // Close the pool when the response is sent
    const pool = getPool();
    if (pool) {
      pool.end().catch(err => console.error('Error closing pool:', err));
    }
    return originalEnd.apply(this, args);
  };
  next();
});

export default app;
