import { Request, Response, NextFunction } from 'express';
import expressVue = require('express-vue');

const expressVueConfig = require('../../expressvue.config')
import { app, sessionStore } from '../app'

export function auth(req: Request, res: Response, next: NextFunction) {
	const auth = req.session!.isLoggedIn || false
	if (!auth) {
		return res.redirect('/login')
	}
	res.locals.isAuth = auth
	res.locals.userLogin = req.session!.userLogin
	expressVueConfig.setData({
		isAuth: res.locals.isAuth,
		userLogin: res.locals.userLogin
	})
	expressVue.use(app, expressVueConfig).then(() => next())
}

export function guest(req: Request, res: Response, next: NextFunction) {
	const auth = req.session!.isLoggedIn || false
	res.locals.isAuth = auth
	if(auth){
		return res.redirect('/sample')
	}
	next()
}
