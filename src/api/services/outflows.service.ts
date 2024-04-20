import { Outflow, PrismaClient } from '@prisma/client';
import { IOutflowPayload } from '../interfaces/outflowPayload.interface';
import { IOutflowWithType } from '../interfaces/outflowsByUserId.interface';
import { OUTCOME } from '../constants';
import {
	IOutflowsFilterPayloadToPrisma,
	ITransactionFilter,
} from '../interfaces/transactionFilterParameters.interface';

export const createOutflow = async (
	{ description, totalAmount }: IOutflowPayload,
	userId: string
): Promise<Outflow> => {
	try {
		const prisma = new PrismaClient();
		return await prisma.outflow.create({
			data: {
				User: { connect: { id: userId } },
				description,
				totalAmount,
			},
		});
	} catch (error) {
		throw error;
	}
};

export const getOutflowsByUserId = async (
	userId: string,
	page: number,
	pageSize: number
): Promise<IOutflowWithType[]> => {
	try {
		const prisma = new PrismaClient();
		const result = await prisma.outflow.findMany({
			where: {
				userId,
			},
			select: {
				totalAmount: true,
				description: true,
				createdAt: true,
			},
			skip: (page - 1) * pageSize,
			take: pageSize,
		});
		return result.map((item) => ({ ...item, type: OUTCOME }));
	} catch (error) {
		throw error;
	}
};

export const getOutflowsFiltered = async (
	userId: string,
	page: number,
	pageSize: number,
	{ dateStart, dateEnd, amount }: ITransactionFilter
) => {
	try {
		const filter: IOutflowsFilterPayloadToPrisma = { userId };

		if (!dateStart && !dateEnd && !amount) {
			return await fetchFilteredOutflowsIncomes(filter, page, pageSize);
		}

		if (dateStart && dateEnd) {
			filter.createdAt = { gte: new Date(dateStart), lte: new Date(dateEnd) };
		}

		if (amount) {
			filter.totalAmount = amount;
		}

		return await fetchFilteredOutflowsIncomes(filter, page, pageSize);
	} catch (error) {
		throw error;
	}
};

const fetchFilteredOutflowsIncomes = async (
	filter: IOutflowsFilterPayloadToPrisma,
	page: number,
	pageSize: number
) => {
	try {
		const prisma = new PrismaClient();

		const result = await prisma.outflow.findMany({
			where: filter,
			select: {
				totalAmount: true,
				description: true,
				createdAt: true,
			},
			skip: (page - 1) * pageSize,
			take: pageSize,
			orderBy: { createdAt: 'desc' },
		});
		return result.map((item) => ({ ...item, type: OUTCOME }));
	} catch (error) {
		throw error;
	}
};
