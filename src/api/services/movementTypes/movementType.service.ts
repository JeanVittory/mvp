import { prisma } from '../../../config/turso/turso.config';

export const getMovementTypeByName = async (movementType: string): Promise<string> => {
	try {
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
