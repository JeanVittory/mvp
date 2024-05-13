import movementTypes from './movementType.json';
import { prisma } from '../../../../config/turso/turso.config';

const createMovementTypes = async () => {
	try {
		const promises = movementTypes.map(async (movementType) => {
			await prisma.movementType.create({
				data: movementType,
			});
		});
		await Promise.all(promises);
	} catch (error) {
		console.log('Error: registerSale seeder...');
	}
};

createMovementTypes();
