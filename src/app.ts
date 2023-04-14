import express, { Application } from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import AppLogger from './core/eventLogger';
import productRoutes from './api/product/product.route';

let logger = new AppLogger();
const app: Application = express();

let scope = "app.ts";
process.on("uncaughtException", (e) => {
  logger.logError(scope, e.toString());
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(cors());
app.use(helmet()); //Adds extra headers to protect the routes
app.use(hpp()); //To prevent HTTP Parameter Pollution.
app.use(express.urlencoded({ limit: '10mb', extended: false, parameterLimit: 10000 }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', productRoutes);

export default app;
