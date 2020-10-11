import { Request, Response, NextFunction } from 'express';
export const shareApp = (req: Request, res: Response, next: NextFunction) => {
	res.locals.urlActive = req.originalUrl
	next()
}

