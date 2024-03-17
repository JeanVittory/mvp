export interface IDecodedToken {
	userEmail: string;
	userName: string;
	sessionId: string;
	iat: number; // Fecha de emisión (issued at)
}

export interface IVerifiedToken {
	payload: IDecodedToken;
	expired: boolean;
}
