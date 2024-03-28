export interface IOutflowPayload {
	description: string;
	totalAmount: number;
	movementType: IMovementType;
}

interface IMovementType {
	id: string;
	name: string;
}
