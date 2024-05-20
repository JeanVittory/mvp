import { serialize } from 'cookie';

export const serializer = (TOKEN: string, key: string, maxAge: number) => {
	const ACCESS_TOKEN_SERIALIZED = serialize(key, TOKEN, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge,
		path: '/',
	});
	return ACCESS_TOKEN_SERIALIZED;
};
