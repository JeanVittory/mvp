export interface IOutflowResponse {
	totalAmount: number;
	description: string;
	createdAt: Date;
}

export interface IInCashIncomeResponse {
	totalAmount: number;
	debitNote: number;
	createdAt: Date;
}

export interface IElectronicIncome {
	totalAmount: number;
	OperationType: { nameEn: string; nameEs: string };
	FinancialEntity: { name: string };
	debitNote: number;
	createdAt: Date;
}
