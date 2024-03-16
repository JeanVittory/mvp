import { ApiError } from '../../config/errors/apiError.config';
import { authenticationUserService } from './user.service';
import { signJwtToken } from '../utils/signJwtToken.utils';
import bcrypt from 'bcrypt';
import { IAccessToken } from '../interfaces/accessToken.interface';

export const authenticationService = async (
	email: string,
	password: string
): Promise<IAccessToken> => {
	try {
		const { userEmail, userName, userPassword } = await authenticationUserService(email);
		const isAuth = await bcrypt.compare(password, userPassword as string);
		if (!isAuth) throw ApiError.Unauthorized();
		const token = signJwtToken({ userEmail, userName });
		return token;
	} catch (error) {
		if (error instanceof ApiError) throw ApiError.Unauthorized();
		throw error;
	}
};
