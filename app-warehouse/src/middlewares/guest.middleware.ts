import { Request, Response, NextFunction } from 'express';

export async function guest(req: Request, res: Response, next: NextFunction) {
	const auth = req.session!.isLoggedIn || false
	res.locals.isAuth = auth
	if (!res.locals.isAuth) {
		return next()
	}
	return res.redirect('/')
}
