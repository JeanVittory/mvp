import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../config/errors/apiError.config';

export const getUserByEmail = async (email: string) => {
	try {
		const prisma = new PrismaClient();
		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				email: true,
				userName: true,
				password: { select: { pass: true } },
			},
		});
		if (!user) throw ApiError.NotFound();
		const pass = user.password?.pass || null;
		const userWithPassword = {
			userEmail: user.email,
			userName: user.userName,
			userPassword: pass,
		};
		return userWithPassword;
	} catch (error) {
		throw error;
	}
};
