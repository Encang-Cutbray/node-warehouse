import { Request, Response, NextFunction } from 'express';

export async function getWarehouse(req: Request, res: Response, next: NextFunction) {
	const data = {
		otherData: 'Something Elses dsdssds'
	};
	res.renderVue('pages/warehouse/warehouse.vue', data, {});
}
export async function createWarehouse(req: Request, res: Response, next: NextFunction) {
}
export async function postWarehouse(req: Request, res: Response, next: NextFunction) {
}
export async function reviewsWarehouse(req: Request, res: Response, next: NextFunction) {
}
export async function updateWarehouse(req: Request, res: Response, next: NextFunction) {
}
