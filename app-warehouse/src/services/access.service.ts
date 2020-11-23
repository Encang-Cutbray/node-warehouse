import Model from '../models'
import _ from 'lodash'

export async function getAccessMenu() {
	try {
		const access = await Model.PermissionMenu.scope('activePermission')
			.findAll({
				attributes: ['id', 'menu_id', 'menu_sub_id', 'permission_id', 'name'],
				where: { is_active: true },
				groupBy: ['id', 'menu_id', 'menu_sub_id', 'permission_id', 'name'],
				order: [
					['menu_id', 'ASC'],
					['menu_sub_id', 'ASC'],
					['permission_id', 'ASC'],
				],
				include: [{
					model: Model.Permission,
					as: 'Permission',
					where: { is_active: true },
					attributes: ['id', 'code', 'name', 'is_active']
				}]
			})
		return access
	} catch (error) {
		throw error
	}
}


