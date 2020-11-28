import { Request, Response, NextFunction } from 'express';
import Model from '../models/index'
export const isAuthorize = (...permissions: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { userLogin } = res.locals
		let permission = await Model.PermissionUser.count({
			where: { user_id: userLogin.id, is_active: true || 1 },
			include: [{
				model: Model.PermissionMenu,
				as: 'PermissionMenu',
				where: {
					is_active: true || 1,
					name: {
						[Model.Sequelize.Op.in]: [permissions],
					}
				},
			}]
		})
		if(permission != permissions.length){
			return res.redirect('/403')
		}
		next();
	}
};
