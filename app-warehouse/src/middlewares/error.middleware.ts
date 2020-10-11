import { Request, Response, NextFunction } from 'express';
import { Error } from 'sequelize/types';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
	console.log(error);
	res.redirect('/500')
}
