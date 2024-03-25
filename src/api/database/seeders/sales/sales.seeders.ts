import { PrismaClient } from '@prisma/client';
import sales from './sale.json';

const prisma = new PrismaClient();

const createSale = async () => {
	try {
		const salePromises = sales.map(async (sale) => {
			const {
				operationType,
				movementType,
				debitNote,
				description,
				financialEntity,
				totalAmount,
				userEmail,
			} = sale;

			let finantialId;
			if (financialEntity) {
				finantialId = await getFinancialEntityByName(financialEntity);
				if (!finantialId) {
					console.log(`No se encontró la entidad financiera: ${financialEntity}`);
					return;
				}
			}

			let movementTypeId;
			if (movementType) {
				movementTypeId = await getMovementTypeByName(movementType);
				if (!movementTypeId) {
					console.log(`No se encontró el tipo de movimiento: ${movementType}`);
					return; // Salir del mapa si no se encontró el tipo de movimiento
				}
			}

			let operationTypeId;
			if (operationType) {
				operationTypeId = await getOperationType(operationType);
				if (!operationTypeId) {
					console.log(`No se encontró el tipo de operación: ${operationType}`);
					return; // Salir del mapa si no se encontró el tipo de operación
				}
			}

			const userId = await getUserByEmail(userEmail);

			const saleData: any = {
				User: { connect: { id: userId } },
				MovementType: { connect: { id: movementTypeId } },
				totalAmount,
				description,
				debitNote,
			};

			if (finantialId) {
				saleData.FinancialEntity = { connect: { id: finantialId } };
			}

			if (operationTypeId) {
				saleData.OperationType = { connect: { id: operationTypeId } };
			}

			await prisma.sale.create({
				data: saleData,
			});
		});
		await Promise.all(salePromises);
	} catch (error) {
		console.log('Error: registerSale seeder...', error);
	}
};

const getOperationType = async (operationTypeName: string): Promise<string | undefined> => {
	try {
		const { id } = await prisma.operationType.findFirstOrThrow({
			where: {
				OR: [{ nameEs: operationTypeName }, { nameEn: operationTypeName }],
			},
		});
		return id;
	} catch (error) {
		console.log('Error: getFinancialEntityByName in seeder registerSale...');
		return;
	}
};

const getMovementTypeByName = async (movementTypeName: string): Promise<string | undefined> => {
	try {
		const { id } = await prisma.movementType.findFirstOrThrow({
			where: {
				OR: [{ nameEs: movementTypeName }, { nameEn: movementTypeName }],
			},
			select: { id: true },
		});
		return id;
	} catch (error) {
		console.log('Error: getFinancialEntityByName in seeder registerSale...');
		return;
	}
};
const getUserByEmail = async (email: string): Promise<string | undefined> => {
	try {
		const { id } = await prisma.user.findFirstOrThrow({
			where: {
				email,
			},
		});
		return id;
	} catch (error) {
		console.log('Error: getFinancialEntityByName in seeder registerSale...');
		return;
	}
};

const getFinancialEntityByName = async (
	finantialEntityName: string
): Promise<string | undefined> => {
	try {
		const { id } = await prisma.financialEntity.findFirstOrThrow({
			where: { name: finantialEntityName },
			select: { id: true },
		});
		return id;
	} catch (error) {
		console.log('Error: getFinancialEntityByName in seeder registerSale...');
		return;
	}
};

createSale();
