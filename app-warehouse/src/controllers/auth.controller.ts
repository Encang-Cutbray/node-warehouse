import { Request, Response, NextFunction } from 'express';

export const getLogin = (req: Request, res: Response, next: NextFunction) => {	
	return res.render('auth/login', {
		path: '/login',
		title: 'Node Warehouse - login'
	})
}
export const postLogin = (req: Request, res: Response, next: NextFunction) => {
	console.log(res.json('postLogin'));
}

export const getRegister = (req: Request, res: Response, next: NextFunction) => {
	return res.render('auth/register', {
		path: '/register',
		title: 'Node Warehouse - registration'
	})
}

export const postRegister = (req: Request, res: Response, next: NextFunction) => {
	console.log(res.json('postRegister'));
}

