import { PrismaClient } from '@prisma/client';
import financialEntities from './financialEntity.json';
const prisma = new PrismaClient();

const createFinancialEntities = async () => {
	try {
		await prisma.financialEntity.createMany({
			data: [...financialEntities],
		});
	} catch (error) {
		console.log('Error: registerSale seeder...');
	}
};

createFinancialEntities();
