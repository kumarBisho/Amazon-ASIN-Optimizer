// express app

import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import optimizeRoute from "./routes/optimize.route";
import productRoute from './routes/product.route';
import historyRoute from './routes/history.route';

// const allowedOrigins = [
//   "http://localhost:5173/", // your frontend Render URL
// ];

const app = express();
app.use(helmet());

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST"],
//   credentials: true
// }));

app.use(cors({ origin: "*" }));

app.use(express.json({ limit: '1mb' }));

app.use('/api/optimize', optimizeRoute);
app.use('/api/product', productRoute);
app.use('/api/history', historyRoute);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

export default app;