import { Request, Response, NextFunction } from 'express';
import {dateNow} from '../utils/dates.util'

export function getDashboard(req: Request, res: Response, next: NextFunction) {
	console.log(dateNow());
	res.render('pages/dashboard/index', {
		title: 'Warehouse dashboard'
	});
}
