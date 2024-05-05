import { Decimal } from '@prisma/client/runtime/library';

export interface IOutflow {
	totalAmount: Decimal;
	description: string;
	createdAt: Date;
}

export interface IOutflowWithType extends IOutflow {
	type: string;
}

export interface IOutflowPaginationResponse {
	items: IOutflowWithType[];
	totalCount: number;
}
