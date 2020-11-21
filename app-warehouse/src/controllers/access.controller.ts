import { Request, Response, NextFunction } from 'express';
import * as accessService from '../services/access.service'
import * as menuService from '../services/menu.service'
import * as userService from '../services/user.service'

export const getAccess = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userService.getUser()
		return res.renderVue('pages/access/AccessIndex.vue', { users });
	} catch (error) {
		return res.status(500).redirect('/500')
	}
}
export const reviewAccesUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.params.userId
		const user = await userService.findUserById(+userId)
		if (!user) {
			throw 'User not found';
		}
		const permissions = await menuService.getPermissionMaster()
		const menuAccess = await menuService.getMenuPermission()
		const data = {
			access: JSON.stringify(menuAccess),
			permissions,
			user: user.dataValues
		}
		return res.renderVue('pages/access/Access.vue', data);
	} catch (error) {
		return res.status(500).redirect('/500')
	}
}

export const saveAccess = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.params.userId
		const user = await userService.findUserById(+userId)
		if (!user) {
			throw 'User not found';
		}
		return res.json(req.body)
	} catch (error) {
		console.log(error);

		return res.status(500).redirect('/500')
	}
}

export const postAccess = (req: Request, res: Response, next: NextFunction) => { }

export const editAccess = (req: Request, res: Response, next: NextFunction) => {
	return res.renderVue('pages/access/Access.vue', {});
}

export const updateAccess = (req: Request, res: Response, next: NextFunction) => { }
