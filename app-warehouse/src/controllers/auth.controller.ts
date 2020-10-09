import { Request, Response, NextFunction } from 'express';
import { registerNewuser } from '../services/user.service'

export const getLogin = (req: Request, res: Response, next: NextFunction) =>
	res.render('auth/login', {
		path: '/login',
		title: 'Node Warehouse - login'
	});

export const postLogin = (req: Request, res: Response, next: NextFunction) =>
	res.json(req.body);

export const getRegister = (req: Request, res: Response, next: NextFunction) =>
	res.render('auth/register', {
		path: '/register',
		title: 'Node Warehouse - registration'
	});

export const postRegister = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await registerNewuser(req.body)
		return res.redirect('/login')
	} catch (error) {
		console.log(error);
	}

}
