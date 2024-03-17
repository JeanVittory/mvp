import { Router } from 'express';
import { testController } from '../controllers/test.controle';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';

const testRouter = Router();

testRouter.get('/', authorizationMiddleware, testController);

export { testRouter };
