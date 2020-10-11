import { Request, Response, NextFunction } from 'express';

export function getDashbord(req: Request, res: Response, next: NextFunction) {
	console.log(req.session!.userLogin!);
	res.render('samples/sample-page');
}
