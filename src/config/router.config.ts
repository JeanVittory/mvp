import { Express } from 'express';
import { authRouter } from '../api/routes/auth.route';

export const routesConfiguration = (app: Express) => {
	app.use('/api/auth', authRouter);
};
