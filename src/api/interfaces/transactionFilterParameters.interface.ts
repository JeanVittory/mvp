export interface ITransactionFilter {
	dateStart?: string;
	dateEnd?: string;
	operationType?: string;
	finantialEntity?: string;
	amount?: number;
	movementType?: string;
}

export interface IIncashIncomeFilterPayloadToPrisma {
	userId?: string;
	createdAt?: { gte: Date; lte: Date };
	totalAmount?: number;
}

export interface IElectronicIncomeFilterPayloadToPrisma {
	userId?: string;
	createdAt?: { gte: Date; lte: Date };
	totalAmount?: number;
	FinancialEntity?: any;
	OperationType?: any;
}

export interface IOutflowsFilterPayloadToPrisma {
	userId?: string;
	createdAt?: { gte: Date; lte: Date };
	totalAmount?: number;
}
