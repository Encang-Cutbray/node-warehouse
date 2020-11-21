import Model from '../models'
import _ from 'lodash'

export async function getAccessMenu() {
	try {
		const access = await Model.PermissionMenu.scope('activePermission', 'withMenu')
			.findAll({
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
