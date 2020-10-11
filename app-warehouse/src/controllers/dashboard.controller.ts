import { Request, Response, NextFunction } from 'express';

export function getDashbord(req: Request, res: Response, next: NextFunction) {
	res.render('samples/sample-page');
}
