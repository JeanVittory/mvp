import env from '../../config/dotenv.config';
import JWT from 'jsonwebtoken';
import { IJwtPayloadToSignToken } from '../interfaces/signJwtPayload.interface';
import { IAccessToken } from '../interfaces/accessToken.interface';

const EXP_TIME_TOKEN = Math.floor(Date.now() / 1000) + 60 * 60;

export const signJwtToken = (payload: IJwtPayloadToSignToken): IAccessToken => {
	const ACCESS_TOKEN = JWT.sign(payload, env.SECRET_JWT, { expiresIn: EXP_TIME_TOKEN });
	return { ACCESS_TOKEN };
};
