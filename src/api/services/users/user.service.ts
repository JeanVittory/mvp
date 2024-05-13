import { ApiError } from '../../../config/errors/apiError.config';
import { prisma } from '../../../config/turso/turso.config';

export const getUserByEmail = async (email: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				userName: true,
				password: { select: { pass: true } },
			},
		});
		if (!user) throw ApiError.NotFound();
		const pass = user.password?.pass || null;
		const userWithPassword = {
			id: user.id,
			userEmail: user.email,
			userName: user.userName,
			userPassword: pass,
		};
		return userWithPassword;
	} catch (error) {
		throw error;
	}
};
