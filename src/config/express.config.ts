import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { routesConfiguration } from './router.config';
import { errorHandler } from './errors/errorHandler.config';

export const app = express();

app.use(express.json());
routesConfiguration();
app.use(errorHandler);
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction): void => {
	res.status(500).send('Internal Server Error');
});
