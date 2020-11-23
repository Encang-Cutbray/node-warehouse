import { Request, Response, NextFunction } from 'express';
import * as menuService from '../services/menu.service'
import * as userService from '../services/user.service'
import _ from "lodash";



export const getAccess = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userService.getUser()
		return res.renderVue('pages/access/AccessIndex.vue', { users });
	} catch (error) {
		return res.status(500).redirect('/500')
	}
}
export const reviewAccessUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.params.userId
		const user = await userService.findUserById(+userId)
		if (!user) {
			throw 'User not found';
		}
		const permissionUser = await userService.getPermissionUser(user);
		const menuAccess = await menuService.getMenuPermission()
		const data = {
			access: JSON.stringify(menuAccess),
			permissionUser,
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
		const permission = await userService.savePermissionUser(user, req.body.permissionUser);

		return res.status(200).json({ permission, permii: req.body.permissionUser })
	} catch (error) {
		return res.status(500).redirect('/500')
	}
}

export const postAccess = (req: Request, res: Response, next: NextFunction) => { }

export const editAccess = (req: Request, res: Response, next: NextFunction) => {
	return res.renderVue('pages/access/Access.vue', {});
}

export const updateAccess = (req: Request, res: Response, next: NextFunction) => { }
