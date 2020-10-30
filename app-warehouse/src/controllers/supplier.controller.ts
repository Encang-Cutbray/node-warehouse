import { Request, Response, NextFunction } from 'express';

export async function getSupplier(req: Request, res: Response, next: NextFunction) {
	const data = {
		otherData: 'Something Elses dsdssds'
	};
	res.renderVue('pages/supplier/SupplierIndex.vue', data, {});
}
export async function createSupplier(req: Request, res: Response, next: NextFunction) {
}
export async function postSupplier(req: Request, res: Response, next: NextFunction) {
}
export async function reviewsSupplier(req: Request, res: Response, next: NextFunction) {
}
export async function updateSupplier(req: Request, res: Response, next: NextFunction) {
}

