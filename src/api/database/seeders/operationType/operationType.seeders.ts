import operationTypes from './operationType.json';
import { prisma } from '../../../../config/turso/turso.config';

const createOperationTypes = async () => {
	try {
		const promises = operationTypes.map(async (operationType) => {
			await prisma.operationType.create({
				data: operationType,
			});
		});

		Promise.all(promises);
	} catch (error) {
		console.log('Error: createOperationTypes seeder...');
	}
};

createOperationTypes();
