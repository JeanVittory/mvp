import { Router } from 'express';
import { authentication } from '../controllers/auth/auth.controllers';
import { authenticationValidator } from '../middlewares/auth.middlewares';

const authRouter = Router();

authRouter.get('/', authenticationValidator, authentication);

export { authRouter };
