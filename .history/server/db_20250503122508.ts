import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "@shared/schema";
import 'dotenv/config';

// No need for WebSocket config with the HTTP client
// neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

// Use a function that creates a fresh connection for each request
export function getDb() {
  // Use the HTTP client instead of WebSocket Pool for serverless
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql, { schema });
}

// Don't export any global connections or pools
// export const pool = getPool(); // Remove this
// export const db = getDb();    // Remove this