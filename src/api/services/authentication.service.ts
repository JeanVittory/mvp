import { ApiError } from '../../config/errors/apiError.config';
import { authenticationUserService } from './user.service';
import { signJwtToken } from '../utils/signJwtToken.utils';
import bcrypt from 'bcrypt';
import { createSession } from './sessions.service';
import { ACCESS_TOKEN_EXP_TIME, REFRESH_TOKEN_EXP_TIME } from '../constants';
//import { IAuthenticationResponse } from '../interfaces/authenticationSuccess.interface';
export const authenticationService = async (email: string, password: string) => {
	try {
		const { userEmail, userName, userPassword } = await authenticationUserService(email);
		const isAuth = await bcrypt.compare(password, userPassword as string);
		if (!isAuth) throw ApiError.Unauthorized();
		const { id } = await createSession(userEmail, userName);
		const ACCESS_TOKEN = signJwtToken({ userEmail, userName, id }, ACCESS_TOKEN_EXP_TIME);
		const REFRESH_TOKEN = signJwtToken({ userEmail, userName, id }, REFRESH_TOKEN_EXP_TIME);
		return { ACCESS_TOKEN, REFRESH_TOKEN };
	} catch (error) {
		if (error instanceof ApiError) throw ApiError.Unauthorized();
		throw error;
	}
};
