import { PrismaClient } from '@prisma/client';
import { IElectronicIncomePayload } from '../interfaces/electronicIncomePayload.interface';

export const createElectronicIncome = async (
	{ financialEntity, operationType, totalAmount, debitNote }: IElectronicIncomePayload,
	userId: string
) => {
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
