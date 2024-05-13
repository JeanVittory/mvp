import financialEntities from './financialEntity.json';
import { prisma } from '../../../../config/turso/turso.config';

const createFinancialEntities = async () => {
	try {
		const promises = financialEntities.map(async (finantialEntity) => {
			await prisma.financialEntity.create({
				data: finantialEntity,
			});
		});

		Promise.all(promises);
	} catch (error) {
		console.log('Error: registerSale seeder...');
	}
};

createFinancialEntities();
