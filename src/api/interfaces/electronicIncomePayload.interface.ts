export interface IElectronicIncomePayload {
	totalAmount: number;
	debitNote: number;
	financialEntity: {
		id: string;
		name: string;
	};
	movementType: {
		id: string;
		name: string;
	};
	operationType: {
		id: string;
		name: string;
	};
}
