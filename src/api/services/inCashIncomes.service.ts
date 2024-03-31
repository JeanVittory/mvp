import { CashIncome, PrismaClient } from '@prisma/client';
import { ICashIncomePayload } from '../interfaces/inCashIncomePayload.interface';
import { IIncashIncomeWithType } from '../interfaces/inCashIncomesByUserId.interface';
import { CASH_PAYMENT } from '../constants';

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

export const getIncashIncomesByUserId = async (
	userId: string
): Promise<IIncashIncomeWithType[]> => {
	try {
		const prisma = new PrismaClient();
		const result = await prisma.cashIncome.findMany({
			where: {
				userId,
			},
			select: {
				totalAmount: true,
				debitNote: true,
				createdAt: true,
			},
		});
		return result.map((item) => ({ ...item, type: CASH_PAYMENT }));
	} catch (error) {
		throw error;
	}
};
