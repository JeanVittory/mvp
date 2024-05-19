import express from 'express';
import { Request, Response, NextFunction, urlencoded } from 'express';
import { routesConfiguration } from './router.config';
import { errorHandler } from './errors/errorHandler.config';
import { cleanSessions } from '../api/services/cron/cron.service';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cors());
cleanSessions.start();
routesConfiguration(app);
app.use(errorHandler);
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
	res.status(500).send(`Internal Server Error: ${err}`);
});
