import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

export const cleanSessions = cron.schedule('0 0 1 * * *', async () => {
	try {
		const prisma = new PrismaClient();
		const now = new Date();
		const everyMonth = 30 * 24 * 60 * 60 * 1000;
		const limitDate = new Date(now.getTime() - everyMonth);
		await prisma.session.deleteMany({
			where: {
				createdAt: {
					lt: limitDate,
				},
			},
		});
	} catch (error) {
		console.log('🚀 ~ cleanSessionsCron ~ error:', error);
	}
});
