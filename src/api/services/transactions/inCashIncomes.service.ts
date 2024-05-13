import { CashIncome } from '@prisma/client';
import { ICashIncomePayload } from '../../interfaces/inCashIncomePayload.interface';
import { IIncashIncomeWithType } from '../../interfaces/inCashIncomesByUserId.interface';
import { CASH_PAYMENT } from '../../constants';
import {
	IIncashIncomeFilterPayloadToPrisma,
	ITransactionFilter,
} from '../../interfaces/transactionFilterParameters.interface';
import { getMovementTypeByName } from '../movementTypes/movementType.service';
import { createInCashTransaction } from './allTransactions.service';
import { prisma } from '../../../config/turso/turso.config';

export const createIncashIncome = async (
	{ totalAmount, debitNote }: ICashIncomePayload,
	userId: string
): Promise<CashIncome> => {
	try {
		const cashIncomeCreated = await prisma.cashIncome.create({
			data: {
				debitNote,
				totalAmount,
				User: { connect: { id: userId } },
			},
		});
		const movementTypeId = await getMovementTypeByName(CASH_PAYMENT);
		await createInCashTransaction(cashIncomeCreated.id, movementTypeId);
		return cashIncomeCreated;
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
		const result = await prisma.allTransactions.findMany({
			where: {
				CashIncome: {
					userId,
				},
			},
			select: {
				CashIncome: {
					select: {
						totalAmount: true,
						debitNote: true,
						createdAt: true,
					},
				},
			},
			skip: (page - 1) * pageSize,
			take: pageSize,
		});
		return result.map((item) => ({
			...item.CashIncome,
			type: CASH_PAYMENT,
		})) as IIncashIncomeWithType[];
	} catch (error) {
		throw error;
	}
};

export const getInCashIncomesIdsListFiltered = async (
	userId: string,
	{ startDate, endDate, amount }: ITransactionFilter
) => {
	try {
		const filter: IIncashIncomeFilterPayloadToPrisma = { userId };

		if (!startDate && !endDate && !amount) {
			return await fetchFilteredCashIncomes(filter);
		}

		if (startDate && endDate) {
			filter.createdAt = { gte: new Date(startDate), lte: new Date(endDate) };
		}

		if (amount) {
			filter.totalAmount = amount;
		}

		return await fetchFilteredCashIncomes(filter);
	} catch (error) {
		throw error;
	}
};

const fetchFilteredCashIncomes = async (filter: IIncashIncomeFilterPayloadToPrisma) => {
	try {
		const result = await prisma.cashIncome.findMany({
			where: filter,
			select: {
				id: true,
			},
			orderBy: { createdAt: 'desc' },
		});
		return result.map((item) => ({ ...item }));
	} catch (error) {
		throw error;
	}
};

export const getTotalInCashRecordsByUserId = async (userId: string) => {
	try {
		return await prisma.cashIncome.count({ where: { userId } });
	} catch (error) {
		throw error;
	}
};
