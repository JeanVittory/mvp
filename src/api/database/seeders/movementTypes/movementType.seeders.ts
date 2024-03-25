import { PrismaClient } from '@prisma/client';
import movementTypes from './movementType.json';
const prisma = new PrismaClient();

const createMovementTypes = async () => {
	try {
		await prisma.movementType.createMany({
			data: [...movementTypes],
		});
	} catch (error) {
		console.log('Error: registerSale seeder...');
	}
};

createMovementTypes();
