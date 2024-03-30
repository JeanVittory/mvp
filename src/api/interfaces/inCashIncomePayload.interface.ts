export interface ICashIncomePayload {
	totalAmount: number;
	debitNote: number;
	movementType: {
		id: string;
		name: string;
	};
}
