import { Outflow, PrismaClient } from '@prisma/client';
import { IOutflowPayload } from '../interfaces/outflowPayload.interface';

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
