import { ElectronicSale } from '@prisma/client';
import { IElectronicIncomePayload } from '../../interfaces/electronicIncomePayload.interface';
import { IElectronicIncomeWithType } from '../../interfaces/electronicIncomesByUserId.interface';
import { ELECTRONIC_PAYMENT } from '../../constants';
import {
	IElectronicIncomeFilterPayloadToPrisma,
	ITransactionFilter,
} from '../../interfaces/transactionFilterParameters.interface';
import { createElectronicTransaction } from './allTransactions.service';
import { getMovementTypeByName } from '../movementTypes/movementType.service';
import { prisma } from '../../../config/turso/turso.config';

export const createElectronicIncome = async (
	{ financialEntity, operationType, totalAmount, debitNote }: IElectronicIncomePayload,
	userId: string
): Promise<ElectronicSale> => {
	try {
		const electronicSaleCreated = await prisma.electronicSale.create({
			data: {
				debitNote,
				totalAmount,
				User: { connect: { id: userId } },
				OperationType: { connect: { id: operationType.id } },
				FinancialEntity: { connect: { id: financialEntity.id } },
			},
		});
		const movementTypeId = await getMovementTypeByName(ELECTRONIC_PAYMENT);
		await createElectronicTransaction(electronicSaleCreated.id, movementTypeId);
		return electronicSaleCreated;
	} catch (error) {
		throw error;
	}
};

export const getElectronicIncomesByUserId = async (
	userId: string,
	page: number,
	pageSize: number
): Promise<IElectronicIncomeWithType[]> => {
	try {
		const result = await prisma.allTransactions.findMany({
			where: {
				ElectronicSale: { userId },
			},
			select: {
				ElectronicSale: {
					select: {
						totalAmount: true,
						OperationType: { select: { nameEn: true, nameEs: true } },
						FinancialEntity: { select: { name: true } },
						debitNote: true,
						createdAt: true,
					},
				},
			},
			skip: (page - 1) * pageSize,
			take: pageSize,
		});

		return result.map((item) => ({
			...item.ElectronicSale,
			type: ELECTRONIC_PAYMENT,
		})) as IElectronicIncomeWithType[];
	} catch (error) {
		throw error;
	}
};

export const getElectronicIncomesIdslistFiltered = async (
	userId: string,
	{ startDate, endDate, amount, finantialEntity, operationType }: ITransactionFilter
) => {
	try {
		const filter: IElectronicIncomeFilterPayloadToPrisma = { userId };

		if (!startDate && !endDate && !amount && !finantialEntity && operationType) {
			return await fetchFilteredElectronicIncomes(filter);
		}

		if (startDate && endDate) {
			filter.createdAt = { gte: new Date(startDate), lte: new Date(endDate) };
		}

		if (amount) {
			filter.totalAmount = amount;
		}

		if (finantialEntity) {
			filter.FinancialEntity = { name: { in: finantialEntity } };
		}

		if (operationType) {
			filter.OperationType = {
				OR: [{ nameEn: { in: operationType } }, { nameEs: { in: operationType } }],
			};
		}

		return await fetchFilteredElectronicIncomes(filter);
	} catch (error) {
		throw error;
	}
};

const fetchFilteredElectronicIncomes = async (filter: IElectronicIncomeFilterPayloadToPrisma) => {
	try {
		const result = await prisma.electronicSale.findMany({
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

export const getTotalElectronicIncomesRecordsByUserId = async (userId: string) => {
	try {
		return await prisma.electronicSale.count({ where: { userId } });
	} catch (error) {
		throw error;
	}
};
