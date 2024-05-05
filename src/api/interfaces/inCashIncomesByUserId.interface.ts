import { Decimal } from '@prisma/client/runtime/library';

export interface IIncashIncome {
	totalAmount: Decimal;
	debitNote: Decimal;
	createdAt: Date;
}

export interface IIncashIncomeWithType extends IIncashIncome {
	type: string;
}

export interface IIncashIncomePaginationResponse {
	items: IIncashIncomeWithType[];
	totalCount: number;
}
