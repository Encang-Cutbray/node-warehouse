import { Request, Response, NextFunction } from 'express';
export const csrfToken = (req: Request, res: Response, next: NextFunction) => {
	res.locals.csrfToken = req.csrfToken();
	next();
};
