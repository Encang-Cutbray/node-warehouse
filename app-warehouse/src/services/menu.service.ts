import Model from '../models'
export async function getPermissionMaster() {
	try {
		return await Model.Permission.findAll({
			raw: true,
			attributes: ['id', 'name'],
			where: { is_active: true },
		})
	} catch (error) {
		throw error

	}
}

export async function getMenuPermission() {
	try {
		return await Model.Menu.scope('activeMenu')
			.findAll({
				attributes: ['id', 'name', 'code', 'is_active'],
				include: [
					{
						model: Model.MenuSub,
						as: 'menuSubs',
						required: false,
						where: { is_active: true },
						attributes: ['id', 'code', 'name', 'url', 'is_active'],
						include: [{
							required: false,
							model: Model.PermissionMenu,
							where: { is_active: true },
							as: 'permissionMenuSubs',
							attributes: ['id', 'menu_id', 'menu_sub_id', 'permission_id', 'name'],
						}]
					},
					{
						model: Model.PermissionMenu,
						required: false,
						where: { is_active: true },
						as: 'permissionMenus',
						attributes: ['id', 'menu_id', 'menu_sub_id', 'permission_id', 'name'],
					}],
			})
	} catch (error) {
		throw error
	}
}
