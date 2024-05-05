import { Decimal } from '@prisma/client/runtime/library';

export interface IElectronicIncome {
	totalAmount: Decimal;
	debitNote: Decimal | null;
	createdAt: Date;
	OperationType: IOperationType;
	FinancialEntity: IFinancialEntity;
}

interface IOperationType {
	nameEn: string;
	nameEs: string;
}

interface IFinancialEntity {
	name: string;
}

export interface IElectronicIncomeWithType extends IElectronicIncome {
	type: string;
}

export interface IElectronicIncomePaginationResponse {
	items: IElectronicIncomeWithType[];
	totalCount: number;
}
