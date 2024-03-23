import { Router } from 'express';
import { authentication } from '../controllers/auth/authentication.controllers';
import { authenticationMiddleware } from '../middlewares/authentication.middlewares';
import { logout } from '../controllers/auth/logout.controllers';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';

const authRouter = Router();

authRouter.post('/', authenticationMiddleware, authentication);
authRouter.delete('/logout', authorizationMiddleware, logout);

export { authRouter };
