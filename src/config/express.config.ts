import express from 'express';
import { Request, Response, NextFunction, urlencoded } from 'express';
import { routesConfiguration } from './router.config';
import { errorHandler } from './errors/errorHandler.config';
import cookieParser from 'cookie-parser';

export const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: false }));
routesConfiguration();
app.use(errorHandler);
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction): void => {
	res.status(500).send('Internal Server Error');
});
