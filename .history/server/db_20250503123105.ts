// import { Pool, neonConfig } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-serverless';
// import ws from "ws";
// import * as schema from "@shared/schema";

// neonConfig.webSocketConstructor = ws;

// if (!process.env.DATABASE_URL) {
//   throw new Error(
//     "DATABASE_URL must be set. Did you forget to provision a database?",
//   );
// }

// export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// export const db = drizzle({ client: pool, schema });


import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure Neon to use WebSockets for serverless environments
neonConfig.webSocketConstructor = ws;

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// For serverless environments, we need to create a new connection for each request
// rather than reusing a pool across requests
let _pool: Pool | null = null;

export function getPool() {
  if (!_pool) {
    _pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      // Add these options for better serverless performance
      max: 1,
      ssl: true,
      keepAlive: false,
      idleTimeoutMillis: 0
    });
  }
  return _pool;
}

export function getDb() {
  return drizzle({ client: getPool(), schema });
}

// For backwards compatibility
export const pool = getPool();
export const db = getDb();