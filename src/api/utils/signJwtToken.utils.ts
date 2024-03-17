import env from '../../config/dotenv.config';
import JWT from 'jsonwebtoken';
import { IJwtPayloadToSignToken } from '../interfaces/signJwtPayload.interface';
import { IRefreshTokenPayload } from '../interfaces/signJwtRefreshTokenPayload.interface';

//const EXP_TIME_TOKEN = Math.floor(Date.now() / 1000) + 60 * 60;

export const signJwtToken = (
	payload: IJwtPayloadToSignToken | IRefreshTokenPayload,
	exp: string
): string => {
	return JWT.sign({ payload }, env.SECRET_JWT, {
		expiresIn: exp,
	});
};
