import { ElectronicSale, PrismaClient } from '@prisma/client';
import { IElectronicIncomePayload } from '../interfaces/electronicIncomePayload.interface';
import { IElectronicIncomeWithType } from '../interfaces/electronicIncomesByUserId.interface';
import { ELECTRONIC_PAYMENT } from '../constants';

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
	userId: string
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
		});
		return result.map((item) => ({ ...item, type: ELECTRONIC_PAYMENT }));
	} catch (error) {
		throw error;
	}
};
