import { PrismaClient } from '@prisma/client';

export const getMovementTypeByName = async (movementType: string): Promise<string> => {
	try {
		const prisma = new PrismaClient();

		const { id: movementTypeId } = await prisma.movementType.findFirstOrThrow({
			where: {
				nameEn: movementType,
			},
			select: {
				id: true,
			},
		});
		return movementTypeId;
	} catch (error) {
		throw error;
	}
};
