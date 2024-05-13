import { config } from 'dotenv';

config();

export default {
	PORT: process.env.APP_PORT || 4545,
	SECRET_JWT: process.env.SECRET_JWT as string,
	TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL as string,
	TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN as string,
};
