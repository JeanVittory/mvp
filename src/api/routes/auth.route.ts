import { Router } from 'express';
import { authentication } from '../controllers/auth/auth.controllers';
import { authenticationMiddleware } from '../middlewares/authentication.middlewares';
import { logout } from '../controllers/auth/logout.auth';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';

const authRouter = Router();

authRouter.get('/', authenticationMiddleware, authentication);
authRouter.delete('/logout', authorizationMiddleware, logout);

export { authRouter };
