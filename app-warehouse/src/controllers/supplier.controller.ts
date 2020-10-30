import { Request, Response, NextFunction } from 'express';

export async function getSupplier(req: Request, res: Response, next: NextFunction) {

	res.renderVue('pages/supplier/SupplierIndex.vue', null);
}
export async function createSupplier(req: Request, res: Response, next: NextFunction) {
	res.renderVue('pages/supplier/Supplier.vue', null);
}
export async function postSupplier(req: Request, res: Response, next: NextFunction) {
	return res.json(req.body)
}
export async function reviewsSupplier(req: Request, res: Response, next: NextFunction) {
}
export async function updateSupplier(req: Request, res: Response, next: NextFunction) {
}

