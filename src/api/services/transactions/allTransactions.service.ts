import { PrismaClient } from '@prisma/client';
import { IIds } from '../../interfaces/id.interface';

export const createElectronicTransaction = async (
	transactionId: string,
	movementTypeId: string
) => {
	try {
		const prisma = new PrismaClient();
		await prisma.allTransactions.create({
			data: {
				MovementType: { connect: { id: movementTypeId } },
				ElectronicSale: { connect: { id: transactionId } },
			},
		});
	} catch (error) {
		throw error;
	}
};

export const createInCashTransaction = async (transactionId: string, movementTypeId: string) => {
	try {
		const prisma = new PrismaClient();
		await prisma.allTransactions.create({
			data: {
				MovementType: { connect: { id: movementTypeId } },
				CashIncome: { connect: { id: transactionId } },
			},
		});
	} catch (error) {
		throw error;
	}
};
export const createOutflowTransaction = async (transactionId: string, movementTypeId: string) => {
	try {
		const prisma = new PrismaClient();
		await prisma.allTransactions.create({
			data: {
				MovementType: { connect: { id: movementTypeId } },
				Outflow: { connect: { id: transactionId } },
			},
		});
	} catch (error) {
		throw error;
	}
};

export const getTransactionsFiltered = async (
	listOfIdsFiltered: IIds[],
	page: number,
	pageSize: number
) => {
	console.log('🚀 ~ listOfIdsFiltered:', listOfIdsFiltered);
	try {
		const prisma = new PrismaClient();
		const startIndex = (page - 1) * pageSize;
		const transactionsResult = await Promise.all(
			listOfIdsFiltered.slice(startIndex, startIndex + pageSize).map(async ({ id }) => {
				return await prisma.allTransactions.findFirst({
					where: {
						OR: [{ electronicSaleId: id }, { cashIncomeId: id }, { outflowId: id }],
					},
					select: {
						ElectronicSale: {
							select: {
								totalAmount: true,
								debitNote: true,
								FinancialEntity: { select: { name: true } },
								OperationType: { select: { nameEn: true, nameEs: true } },
								createdAt: true,
							},
						},
						CashIncome: {
							select: { totalAmount: true, debitNote: true, createdAt: true },
						},
						Outflow: { select: { totalAmount: true, description: true, createdAt: true } },
						MovementType: { select: { nameEn: true, nameEs: true } },
					},
					orderBy: {
						createdAt: 'desc',
					},
				});
			})
		);
		console.log('🚀 ~ transactionsResult:', transactionsResult);
		let responseWithNotNulls: any[] = [];
		transactionsResult.forEach((item) => {
			let previous = { ...item };
			if (item?.ElectronicSale === null) {
				const { ElectronicSale, ...rest } = previous;
				previous = { ...rest };
			}
			if (item?.CashIncome === null) {
				const { CashIncome, ...rest } = previous;
				previous = { ...rest };
			}
			if (item?.Outflow === null) {
				const { Outflow, ...rest } = previous;
				previous = { ...rest };
			}
			responseWithNotNulls.push(previous);
		});
		prisma.$disconnect();
		return { transactions: responseWithNotNulls, xTotalCount: listOfIdsFiltered.length };
	} catch (error) {
		throw error;
	}
};
