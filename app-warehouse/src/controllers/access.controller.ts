import { Request, Response, NextFunction } from 'express';
import * as accessService from '../services/access.service'
import { validationResult } from 'express-validator'

export const getAccess = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const access = await accessService.getAccessMenu()
		console.log(access);
		return res.renderVue('pages/access/AccessIndex.vue', {});
	} catch (error) {
		return res.status(500).redirect('/500')
	}
}

export const createAccess = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const access = await accessService.getAccessMenu()
		return res.renderVue('pages/access/Access.vue', { access});
	} catch (error) {
		return res.status(500).redirect('/500')
	}
}

export const postAccess = (req: Request, res: Response, next: NextFunction) => { }

export const editAccess = (req: Request, res: Response, next: NextFunction) => {
	return res.renderVue('pages/access/Access.vue', {});
}

export const updateAccess = (req: Request, res: Response, next: NextFunction) => { }
