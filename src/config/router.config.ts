import { app } from './express.config';
import { authRouter } from '../api/routes/auth.route';
import { testRouter } from '../api/routes/test';

export const routesConfiguration = () => {
	app.use('/api/auth', authRouter);
	app.use('/api/test', testRouter);
};
