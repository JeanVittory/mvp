import { Router } from 'express';
import { authentication } from '../controllers/auth/authentication.controllers';
import { authenticationMiddleware } from '../middlewares/authentication.middlewares';
import { logout } from '../controllers/auth/logout.controllers';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';
import { refreshTokenMiddleware } from '../middlewares/refreshToken.middleware';
import { refreshToken } from '../controllers/auth/refreshToken.controller';

const authRouter = Router();

/**
 * Post track
 * @openapi
 * /api/auth:
 *   post:
 *     tags:
 *       - auth
 *     summary: Authentication service.
 *     description: This endpoint allows you to log in into the application using an existing email and password.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/login"
 *     responses:
 *       '200':
 *         description: Log in succesfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ACCESS_TOKEN:
 *                   $ref: "#/components/schemas/jwtToken"
 *                   description: JWT Token. Include in Authorization header as Bearer Token.
 *                 REFRESH_TOKEN:
 *                   $ref: "#/components/schemas/jwtRefreshToken"
 *                   description: Refresh Token. Include in x-refresh-token header.
 *       '401':
 *          description: Unauthorized.
 *       '500':
 *         description: Unknown error.
 */
authRouter.post('/', authenticationMiddleware, authentication);
authRouter.post('/refresh-token', refreshTokenMiddleware, refreshToken);
authRouter.delete('/logout', authorizationMiddleware, logout);

export { authRouter };
