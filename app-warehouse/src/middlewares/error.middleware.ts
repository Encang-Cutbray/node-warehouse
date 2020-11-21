import { Request, Response, NextFunction } from 'express';

export interface ErrorException extends Error {
	errno?: number;
	code?: string;
	path?: string;
	syscall?: string;
	stack?: string;
}

export function errorHandler(error: ErrorException, req: Request, res: Response, next: NextFunction) {
	console.log(error);

	if (error.code === 'EBADCSRFTOKEN') {
		return res.status(403).redirect('/403')
	}
	res.redirect('/500')
}
