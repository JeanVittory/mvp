import { PrismaClient } from '@prisma/client';
import operationTypes from './operationType.json';
const prisma = new PrismaClient();

const createOperationTypes = async () => {
	try {
		await prisma.operationType.createMany({
			data: [...operationTypes],
		});
	} catch (error) {
		console.log('Error: createOperationTypes seeder...');
	}
};

createOperationTypes();
