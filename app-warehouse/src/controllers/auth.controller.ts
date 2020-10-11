import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'
import * as userService from '../services/user.service'

export const getLogin = (req: Request, res: Response, next: NextFunction) => {
	const errorMessage = req.flash('error')
	const populate = req.flash('populate')
	res.render('pages/auth/login', {
		path: '/login',
		title: 'Node Warehouse - login',
		errorMessage: errorMessage.length ? errorMessage : null,
		populate: populate.length ? populate[0] : null
	});
}


export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			throw errors.array()[0]
		}
		const { email, password } = req.body
		const user = await userService.loginUser({ email, password })
		req.session!.userLogin = user
		req.session!.isLoggedIn = true
		return req.session!.save(error => {
			res.redirect('/')
		})
	} catch (error) {
		req.flash('error', error)
		req.flash('populate', req.body)
		return res.status(422).redirect('/login')
	}
}
export const getRegister = (req: Request, res: Response, next: NextFunction) => {
	const errorMessage = req.flash('error')
	const populate = req.flash('populate')
	return res.render('pages/auth/register', {
		path: '/register',
		title: 'Node Warehouse - registration',
		errorMessage: errorMessage.length ? errorMessage : null,
		populate: populate.length ? populate[0] : null
	});
}


export const postRegister = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			throw errors.array()[0]
		}
		const { name, email, password } = req.body
		await userService.registerNewUser({ name, email, password })
		return res.redirect('/login')
	} catch (error) {
		req.flash('error', error)
		req.flash('populate', req.body)
		return res.status(422).redirect('/register')
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
