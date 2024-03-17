import env from '../../config/dotenv.config';
import JWT from 'jsonwebtoken';
import { IDecodedToken } from '../interfaces/decodedToken.interface';

export const verifyJWT = (token: string) => {
	try {
		const decoded = JWT.verify(token, env.SECRET_JWT) as IDecodedToken;
		return { payload: decoded, expired: false };
	} catch (error: any) {
		return { payload: null, expired: error.message.includes('jwt expired') };
	}
};
