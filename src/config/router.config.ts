import { Express } from 'express';
import { authRouter } from '../api/routes/auth.route';
import { transactionRouter } from '../api/routes/transactions.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from '../docs/swagger';

export const routesConfiguration = (app: Express) => {
	app.use('/api/auth', authRouter);
	app.use('/api/transaction', transactionRouter);
	app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
};
