import { Request, Response, NextFunction } from 'express';
export const shareApp = (req: Request, res: Response, next: NextFunction) => {
	res.locals.APP_NAME = process.env.APP_NAME || 'Node Warehouse'
	res.locals.urlActive = req.originalUrl
	next()
}
export const csrfToken = (req: Request, res: Response, next: NextFunction) => {
	res.locals.csrfToken = req.csrfToken();
	next();
};
