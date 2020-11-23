import expressVue = require('express-vue');
import { getMenuUser } from '../services/menu.service'
import { Request, Response, NextFunction } from 'express';

import { app } from '../app'
import Model from '../models/index'
import { includes } from 'lodash';
const expressVueConfig = require('../../expressvue.config')

// Get active url 
function splitUrl(url: string) {
	var urlParser = url.split("/");
	var fixedUrl = null
	const pageQuery = "?";
	if (urlParser[1].includes(pageQuery)) {
		fixedUrl = urlParser[1].split("?")[0];
		return `/${fixedUrl}`
	}
	fixedUrl = urlParser[1];
	return `/${fixedUrl}`
}

export function auth(req: Request, res: Response, next: NextFunction) {
	const auth = req.session!.isLoggedIn || false

	if (!auth) {
		return res.redirect('/login')
	}

	expressVue.use(app, expressVueConfig).then(async () => {

		let urlActive = splitUrl(req.originalUrl)
		let userLogin = req.session!.userLogin
		let menus = await getMenuUser(userLogin.id)

		let config = {
			isAuth: true,
			userLogin: userLogin,
			APP_NAME: process.env.APP_NAME || 'Node Warehouse',
			urlActive: urlActive,
			csrfToken: req.csrfToken(),
			leftNavMenu: JSON.stringify(menus),
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
