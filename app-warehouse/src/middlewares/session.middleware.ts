import { Request, Response, NextFunction } from 'express';
export const expressSession = (req: Request, res: Response, next: NextFunction) => {
	res.locals.urlActive = req.originalUrl
	res.locals.isAuth = false
	console.log(req.originalUrl);
	next()
}

