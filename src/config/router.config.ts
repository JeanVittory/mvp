import { Express } from 'express';
import { authRouter } from '../api/routes/auth.route';
import { salesRouter } from '../api/routes/sales.route';

export const routesConfiguration = (app: Express) => {
	app.use('/api/auth', authRouter);
	app.use('/api/sales', salesRouter);
};
