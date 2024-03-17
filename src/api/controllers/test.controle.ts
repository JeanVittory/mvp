import { NextFunction, Request, Response } from 'express';

export const testController = (req: Request, res: Response, _next: NextFunction) => {
	//@ts-ignore
	res.send(req.user);
};
