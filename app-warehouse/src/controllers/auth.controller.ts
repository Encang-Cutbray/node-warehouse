import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import * as userService from '../services/user.service'

export const getLogin = (req: Request, res: Response, next: NextFunction) =>
	res.render('pages/auth/login', {
		path: '/login',
		title: 'Node Warehouse - login'
	});

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body
		const user = await userService.loginUser({ email, password })
		req.session!.userLogin = user
		req.session!.isLoggedIn = true
		return req.session!.save(error => {
			res.redirect('/')
		})
	} catch (error) {
		console.log(error);
	}


}
export const getRegister = (req: Request, res: Response, next: NextFunction) =>
	res.render('pages/auth/register', {
		path: '/register',
		title: 'Node Warehouse - registration'
	});

export const postRegister = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			throw errors.array()[0]
		}
		await userService.registerNewUser(req.body)
		return res.redirect('/login')
	} catch (error) {
		console.log(error);
	}
}

export const getLogout = (req: Request, res: Response, next: NextFunction) => {
	req.session!.destroy(function (err) {
		res.redirect('/login')
	})
}

export const getForgotPassword = (req: Request, res: Response, next: NextFunction) =>
	res.render('pages/auth/forgot-password', {
		path: '/forgot-password',
		title: 'Node Warehouse - Forgot password'
	})

export const postForgotPassword = (req: Request, res: Response, next: NextFunction) =>
	res.json({ status: 'on development' })
