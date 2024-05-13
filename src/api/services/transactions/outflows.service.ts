import { Outflow } from '@prisma/client';
import { IOutflowPayload } from '../../interfaces/outflowPayload.interface';
import { IOutflowWithType } from '../../interfaces/outflowsByUserId.interface';
import { OUTCOME } from '../../constants';
import {
	IOutflowsFilterPayloadToPrisma,
	ITransactionFilter,
} from '../../interfaces/transactionFilterParameters.interface';
import { getMovementTypeByName } from '../movementTypes/movementType.service';
import { createOutflowTransaction } from './allTransactions.service';
import { prisma } from '../../../config/turso/turso.config';

export const createOutflow = async (
	{ description, totalAmount }: IOutflowPayload,
	userId: string
): Promise<Outflow> => {
	try {
		const outflowCreated = await prisma.outflow.create({
			data: {
				User: { connect: { id: userId } },
				description,
				totalAmount,
			},
		});
		const movementTypeId = await getMovementTypeByName(OUTCOME);
		await createOutflowTransaction(outflowCreated.id, movementTypeId);
		return outflowCreated;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getOutflowsByUserId = async (
	userId: string,
	page: number,
	pageSize: number
): Promise<IOutflowWithType[]> => {
	try {
		const result = await prisma.allTransactions.findMany({
			where: {
				Outflow: {
					userId,
				},
			},
			select: {
				Outflow: {
					select: {
						totalAmount: true,
						createdAt: true,
						description: true,
					},
				},
			},
			skip: (page - 1) * pageSize,
			take: pageSize,
		});
		return result.map((item) => ({ ...item.Outflow, type: OUTCOME })) as IOutflowWithType[];
	} catch (error) {
		throw error;
	}
};

export const getOutflowsIdsListFiltered = async (
	userId: string,
	{ startDate, endDate, amount }: ITransactionFilter
) => {
	try {
		const filter: IOutflowsFilterPayloadToPrisma = { userId };

		if (!startDate && !endDate && !amount) {
			return await fetchFilteredOutflowsIncomes(filter);
		}

		if (startDate && endDate) {
			filter.createdAt = { gte: new Date(startDate), lte: new Date(endDate) };
		}

		if (amount) {
			filter.totalAmount = amount;
		}

		return await fetchFilteredOutflowsIncomes(filter);
	} catch (error) {
		throw error;
	}
};

const fetchFilteredOutflowsIncomes = async (filter: IOutflowsFilterPayloadToPrisma) => {
	try {
		const result = await prisma.outflow.findMany({
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

export const getTotalOutflowsRecordsByUserId = async (userId: string) => {
	try {
		return await prisma.outflow.count({ where: { userId } });
	} catch (error) {
		throw error;
	}
};
