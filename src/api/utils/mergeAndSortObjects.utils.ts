import {
	IElectronicIncome,
	IInCashIncomeResponse,
	IOutflowResponse,
} from '../interfaces/getAllTransactions.interface';

export const mergeAndSortObjects = (...arrays: any[]) => {
	const mergedArray: [IElectronicIncome, IInCashIncomeResponse, IOutflowResponse] = arrays.reduce(
		(acc, arr) => acc.concat(arr),
		[]
	);
	const sortedArray = mergedArray.sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);
	return sortedArray;
};
