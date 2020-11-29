import { Request, Response, NextFunction } from 'express';
import { getUserWarehouse } from '../services/warehouse.service'
export async function getWarehouse(req: Request, res: Response, next: NextFunction) {
	const data = {
	};
	res.renderVue('pages/warehouse/WarehouseIndex.vue', data, {});
}
export async function createWarehouse(req: Request, res: Response, next: NextFunction) {
	const userWarehouse = await getUserWarehouse()
	const data = {
		userWarehouse: userWarehouse
	};
	res.renderVue('pages/warehouse/Warehouse.vue', data, {});
}
export async function postWarehouse(req: Request, res: Response, next: NextFunction) {
	return res.json(req.body)
}
export async function reviewsWarehouse(req: Request, res: Response, next: NextFunction) {
	const data = {
	};
	res.renderVue('pages/warehouse/Warehouse.vue', data, {});
}
export async function updateWarehouse(req: Request, res: Response, next: NextFunction) {
}
