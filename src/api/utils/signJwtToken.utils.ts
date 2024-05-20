import env from '../../config/dotenv.config';
import JWT from 'jsonwebtoken';
import { IJwtPayloadToSignToken } from '../interfaces/signJwtPayload.interface';
import { IRefreshTokenPayload } from '../interfaces/signJwtRefreshTokenPayload.interface';

export const signJwtToken = (
	payload: IJwtPayloadToSignToken | IRefreshTokenPayload,
	exp: string
): string => {
	return JWT.sign({ payload }, env.SECRET_JWT, {
		expiresIn: exp,
	});
};
