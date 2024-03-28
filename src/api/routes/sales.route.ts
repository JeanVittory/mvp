import { Router } from 'express';
import { registerOutflows } from '../controllers/sales/registerOutflows.controllers';
import { validateOutflowMiddleware } from '../middlewares/validateOutflow.middleware';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';

const salesRouter = Router();

salesRouter.post('/outflows', authorizationMiddleware, validateOutflowMiddleware, registerOutflows);

export { salesRouter };
