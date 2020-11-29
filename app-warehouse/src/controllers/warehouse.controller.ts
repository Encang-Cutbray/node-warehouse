import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'

import * as warehouseService from '../services/warehouse.service'
export async function getWarehouse(req: Request, res: Response, next: NextFunction) {
	const data = {
	};
	res.renderVue('pages/warehouse/WarehouseIndex.vue', data, {});
}
export async function createWarehouse(req: Request, res: Response, next: NextFunction) {
	const errorMessage = req.flash('error')
	const populate = req.flash('populate')
	if (errorMessage.length) {
		console.log(errorMessage, populate);
	}

	const userWarehouse = await warehouseService.getUserWarehouse()
	const data = {
		userWarehouse: userWarehouse
	};
	res.renderVue('pages/warehouse/Warehouse.vue', data, {});
}
export async function postWarehouse(req: Request, res: Response, next: NextFunction) {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			throw errors.array()[0]
		}
		const userId = req.session!.userLogin.id
		const logo = req.file ? req.file.path : null
		const { code, name, description, users } = req.body;
		const warehouse = await warehouseService.saveWarehouse({
			code, name, description, logo, userId
		}, JSON.parse(users))
		return res.status(201).redirect(`/warehouse/${warehouse.id}/review`)
	} catch (error) {
		console.log(error);
		req.flash('error', error)
		req.flash('populate', req.body)
		return res.status(422).redirect('back')
	}
}
export async function reviewWarehouse(req: Request, res: Response, next: NextFunction) {
	try {
		const userWarehouse = await warehouseService.getUserWarehouse()
		const warehouse = await warehouseService.getWarehouseById(+req.params.warehouseId)
		const data = {
			userWarehouse: userWarehouse,
			warehouse: JSON.stringify(warehouse)
		};
		res.renderVue('pages/warehouse/Warehouse.vue', data, {});
	} catch (error) {
		return res.status(403).redirect('/403')
	}

}
export async function updateWarehouse(req: Request, res: Response, next: NextFunction) {
	return res.status(201).json({ body: req.body, file: req.file })
}
