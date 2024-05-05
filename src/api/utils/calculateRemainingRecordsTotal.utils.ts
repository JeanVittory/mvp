export const calculateRemainingRecordsTotal = (totals: number[]) => {
	return totals.reduce((acc, current) => {
		return acc + current;
	}, 0);
};
