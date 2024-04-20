import { CashIncome, PrismaClient } from '@prisma/client';
import { ICashIncomePayload } from '../interfaces/inCashIncomePayload.interface';
import { IIncashIncomeWithType } from '../interfaces/inCashIncomesByUserId.interface';
import { CASH_PAYMENT } from '../constants';
import {
	IIncashIncomeFilterPayloadToPrisma,
	ITransactionFilter,
} from '../interfaces/transactionFilterParameters.interface';

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
	userId: string,
	page: number,
	pageSize: number
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
			skip: (page - 1) * pageSize,
			take: pageSize,
		});
		return result.map((item) => ({ ...item, type: CASH_PAYMENT }));
	} catch (error) {
		throw error;
	}
};

export const getInCashIncomesFiltered = async (
	userId: string,
	page: number,
	pageSize: number,
	{ dateStart, dateEnd, amount }: ITransactionFilter
) => {
	try {
		const filter: IIncashIncomeFilterPayloadToPrisma = { userId };

		if (!dateStart && !dateEnd && !amount) {
			return await fetchFilteredCashIncomes(filter, page, pageSize);
		}

		if (dateStart && dateEnd) {
			filter.createdAt = { gte: new Date(dateStart), lte: new Date(dateEnd) };
		}

		if (amount) {
			filter.totalAmount = amount;
		}

		return await fetchFilteredCashIncomes(filter, page, pageSize);
	} catch (error) {
		throw error;
	}
};

const fetchFilteredCashIncomes = async (
	filter: IIncashIncomeFilterPayloadToPrisma,
	page: number,
	pageSize: number
) => {
	try {
		const prisma = new PrismaClient();

		const result = await prisma.cashIncome.findMany({
			where: filter,
			select: {
				totalAmount: true,
				debitNote: true,
				createdAt: true,
			},
			skip: (page - 1) * pageSize,
			take: pageSize,
			orderBy: { createdAt: 'desc' },
		});
		return result.map((item) => ({ ...item, type: CASH_PAYMENT }));
	} catch (error) {
		throw error;
	}
};
