import { Request, Response, NextFunction } from 'express';

export async function isAuth(req: Request, res: Response, next: NextFunction) {
	const auth = req.session!.isLoggedIn || false
	res.locals.isAuth = auth
	if (auth) {
		res.locals.userLogin = req.session!.userLogin
		return next()
	}
	return res.redirect('/login')
}
