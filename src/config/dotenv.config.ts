import { config } from 'dotenv';
config();

export default {
	PORT: process.env.APP_PORT || 4545,
	SECRET_JWT: process.env.SECRET_JWT as string,
};
