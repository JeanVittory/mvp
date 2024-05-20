import { ApiError } from '../../../config/errors/apiError.config';
import { getUserByEmail } from '../users/user.service';
import { signJwtToken } from '../../utils/signJwtToken.utils';
import bcrypt from 'bcrypt';
import { createSession, getSessionById } from '../sessions/sessions.service';
import { ACCESS_TOKEN_EXP_TIME, REFRESH_TOKEN_EXP_TIME } from '../../constants';
import { verifyJWT } from '../../utils/verifyJwtToken.utils';

export const authenticationService = async (email: string, password: string) => {
	try {
		const { id: userId, userEmail, userName, userPassword } = await getUserByEmail(email);
		const isAuth = await bcrypt.compare(password, userPassword as string);
		if (!isAuth) throw ApiError.Unauthorized();
		const { id: sessionId } = await createSession(userEmail, userName);
		const ACCESS_TOKEN = signJwtToken(
			{ userEmail, userName, sessionId, userId },
			ACCESS_TOKEN_EXP_TIME
		);
		const REFRESH_TOKEN = signJwtToken(
			{ userEmail, userName, sessionId, userId },
			REFRESH_TOKEN_EXP_TIME
		);
		return { ACCESS_TOKEN, REFRESH_TOKEN };
	} catch (error) {
		if (error instanceof ApiError) throw ApiError.Unauthorized();
		throw error;
	}
};

export const refreshTokenService = async (REFRESH_TOKEN: string) => {
	try {
		const { payload } = verifyJWT(REFRESH_TOKEN as string);
		if (!payload) throw ApiError.Unauthorized();
		const session = await getSessionById(payload.sessionId);
		if (!session) throw ApiError.Unauthorized();
		const { id, userEmail, userName } = await getUserByEmail(session.email);
		const newAccessTokenPayload = {
			userEmail,
			userName,
			sessionId: session.id,
			userId: id,
		};
		const ACCESS_TOKEN = signJwtToken(newAccessTokenPayload, REFRESH_TOKEN_EXP_TIME);
		return { ACCESS_TOKEN };
	} catch (error) {
		if (error instanceof ApiError) throw ApiError.Unauthorized();
		throw error;
	}
};
