import { Request, Response, NextFunction } from 'express';

export function getDashboard(req: Request, res: Response, next: NextFunction) {
	res.render('pages/dashboard/index', {
		title: 'Warehouse dashboard'
	});
}
