import { ElectronicSale, PrismaClient } from '@prisma/client';
import { IElectronicIncomePayload } from '../interfaces/electronicIncomePayload.interface';
import { IElectronicIncomeWithType } from '../interfaces/electronicIncomesByUserId.interface';
import { ELECTRONIC_PAYMENT } from '../constants';
import { ITransactionFilter } from '../interfaces/transactionFilterParameters.interface';

export const createElectronicIncome = async (
	{ financialEntity, operationType, totalAmount, debitNote }: IElectronicIncomePayload,
	userId: string
): Promise<ElectronicSale> => {
	try {
		const prisma = new PrismaClient();
		return await prisma.electronicSale.create({
			data: {
				debitNote,
				totalAmount,
				User: { connect: { id: userId } },
				OperationType: { connect: { id: operationType.id } },
				FinancialEntity: { connect: { id: financialEntity.id } },
			},
		});
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
		const prisma = new PrismaClient();
		const result = await prisma.electronicSale.findMany({
			where: {
				userId,
			},
			select: {
				totalAmount: true,
				OperationType: { select: { nameEn: true, nameEs: true } },
				FinancialEntity: { select: { name: true } },
				debitNote: true,
				createdAt: true,
			},
			skip: (page - 1) * pageSize,
			take: pageSize,
		});
		return result.map((item) => ({ ...item, type: ELECTRONIC_PAYMENT }));
	} catch (error) {
		throw error;
	}
};

export const getElectronicIncomesFiltered = async (
	userId: string,
	page: number,
	pageSize: number,
	{ dateStart, dateEnd, amount, finantialEntity, operationType }: ITransactionFilter
) => {
	try {
		const prisma = new PrismaClient();

		const filter: any = { userId };

		if (dateStart && dateEnd) {
			filter.createdAt = { gte: new Date(dateStart), lte: new Date(dateEnd) };
		}

		if (amount) {
			filter.totalAmount = amount;
		}

		if (finantialEntity) {
			filter.FinantialEntity = { name: finantialEntity };
		}

		if (operationType) {
			filter.OperationType = {
				OR: [{ nameEn: { contains: operationType } }, { nameEs: { contains: operationType } }],
			};
		}

		const result = await prisma.electronicSale.findMany({
			where: filter,
			select: {
				totalAmount: true,
				OperationType: { select: { nameEn: true, nameEs: true } },
				FinancialEntity: { select: { name: true } },
				debitNote: true,
				createdAt: true,
			},
			skip: (page - 1) * pageSize,
			take: pageSize,
			orderBy: { createdAt: 'desc' },
		});
		return result.map((item) => ({ ...item, type: ELECTRONIC_PAYMENT }));
	} catch (error) {
		throw error;
	}
};
