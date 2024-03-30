import { CashIncome, PrismaClient } from '@prisma/client';
import { ICashIncomePayload } from '../interfaces/inCashIncomePayload.interface';

export const createIncashIncome = async (
	{ totalAmount, debitNote }: ICashIncomePayload,
	userId: string
): Promise<CashIncome> => {
	try {
		const prisma = new PrismaClient();
		return await prisma.cashIncome.create({
			data: {
				debitNote,
				totalAmount,
				User: { connect: { id: userId } },
			},
		});
	} catch (error) {
		throw error;
	}
};
