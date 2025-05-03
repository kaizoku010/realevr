import express from 'express';
import { registerRoutes } from '../server/routes.js';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
registerRoutes(app);

export default app;