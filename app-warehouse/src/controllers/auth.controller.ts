import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import { registerNewUser } from '../services/user.service'

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
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const errorMessage = errors.array()[0].msg
			throw Error(errorMessage)
		}
		await registerNewUser(req.body)
		return res.redirect('/login')
	} catch (error) {
		const err = new Error(error)
		next(err)
	}

}
