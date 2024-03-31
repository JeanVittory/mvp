import { Express } from 'express';
import { authRouter } from '../api/routes/auth.route';
import { transactionRouter } from '../api/routes/transactions.route';

export const routesConfiguration = (app: Express) => {
	app.use('/api/auth', authRouter);
	app.use('/api/transaction', transactionRouter);
};
