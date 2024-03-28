import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../config/errors/apiError.config';

export const createSession = async (email: string, userName: string) => {
	try {
		const prisma = new PrismaClient();
		return await prisma.session.create({
			data: {
				email,
				userName,
			},
			select: {
				id: true,
			},
		});
	} catch (error) {
		throw error;
	}
};

export const getSessionById = async (sessionId: string) => {
	try {
		const prisma = new PrismaClient();
		return await prisma.session.findFirst({ where: { AND: { id: sessionId, valid: true } } });
	} catch (error) {
		throw error;
	}
};

export const deleteSessionById = async (sessionId: string) => {
	try {
		const prisma = new PrismaClient();
		return await prisma.session.delete({ where: { id: sessionId }, select: { id: true } });
	} catch (error: any) {
		if (error.code === 'P2025') throw ApiError.Unauthorized();
		throw error;
	}
};
