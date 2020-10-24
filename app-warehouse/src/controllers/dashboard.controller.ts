import { Request, Response, NextFunction } from 'express';
import Model from '../models/index'


export async function getDashboard(req: Request, res: Response, next: NextFunction) {
	try {
		var menu = await Model.Menu.findAll({
			attributes: ['id', 'code', 'name', 'url', 'is_active'],
			include: [
				{
					model: Model.MenuSub, as: 'menuSubs',
					required: false,
					where: { is_active: true },
					attributes: ['id', 'code', 'name', 'url', 'is_active']
				}
			]
		})
		return res.json(menu)
	} catch (error) {
		return res.json(error)
	}


	// const supplier = await Model.Supplier.findOne({ where: { email: 'ss' }, include: { model: Model.User, as : 'user'}})
	// const user = await Model.User.findOne(
	// 	{
	// 		where: { email: 'encang@email.com' },
	// 		include: [{ model: Model.Supplier, as: 'supplier' }]
	// 	})

	// return res.json({ user, supplier})
	res.render('pages/dashboard/index', {
		title: 'Warehouse dashboard'
	});
}
