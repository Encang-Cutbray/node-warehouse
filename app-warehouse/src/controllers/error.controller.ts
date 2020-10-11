import { Request, Response, NextFunction } from 'express';


export function handle403(req: Request, res: Response, next: NextFunction) {
	return res.status(403).render('pages/errors/403', {
		title: 403
	})
}

export function handle404(req: Request, res: Response, next: NextFunction) {
	return res.status(404).render('pages/errors/404', {
		title: 404
	})

}
export function handle500(req: Request, res: Response, next: NextFunction) {
	return res.status(500).render('pages/errors/500', {
		title: 500
	})
}
