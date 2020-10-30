import { Request, Response, NextFunction } from 'express';
import Model from '../models/index'
import expressVue = require('express-vue');

const expressVueConfig = require('../../expressvue.config')
import { app } from '../app'

export function auth(req: Request, res: Response, next: NextFunction) {
	const auth = req.session!.isLoggedIn || false

	if (!auth) {
		return res.redirect('/login')
	}

	expressVue.use(app, expressVueConfig).then(async () => {
		var menu = await Model.Menu.scope('activeMenu', 'getSubMenu').findAll({
			attributes: ['id', 'code', 'name', 'url', 'is_active'],
		})
		let config = {
			isAuth: true,
			userLogin: req.session!.userLogin,
			APP_NAME: process.env.APP_NAME || 'Node Warehouse',
			urlActive: req.originalUrl,
			csrfToken: req.csrfToken(),
			leftNavMenu: JSON.stringify(menu),
		}
		res.locals = { ...config }
		expressVueConfig.data.config = { ...config }
		next()
	})
}

export function guest(req: Request, res: Response, next: NextFunction) {
	const auth = req.session!.isLoggedIn || false
	res.locals.isAuth = auth
	if (auth) {
		return res.redirect('/sample')
	}
	next()
}
