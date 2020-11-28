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

export async function getLeftNavUser(userId: number) {
	try {
		return await Model.Menu.scope('activeMenu', 'getSubMenu').findAll({
			attributes: ['id', 'code', 'name', 'url', 'is_active'],
			include: [{
				model: Model.MenuSub, as: 'menuSubs',
				where: { is_active: true },
				attributes: ['id', 'code', 'name', 'url', 'is_active'],
				include: [{
					model: Model.PermissionMenu, as: 'permissionMenuSubs',
					where: { is_active: true, name: { [Model.Sequelize.Op.endsWith]: '.read' } },
					attributes: ['id'],
					include: [{
						model: Model.PermissionUser, as: 'PermissionUsers',
						where: { is_active: true, user_id: userId, },
						attributes: ['id'],
					}]
				}]
			},
			{
				model: Model.PermissionMenu, as: 'permissionMenus',
				attributes: ['id'],
				where: { is_active: true, name: { [Model.Sequelize.Op.endsWith]: '.read' } },
				include: [{
					model: Model.PermissionUser, as: 'PermissionUsers',
					where: { is_active: true, user_id: userId, },
					attributes: ['id'],
				}]
			}]
		})
	} catch (error) {
		throw error
	}

}

export async function getPagePermission(userId: number, page: string) {
	let pageUrl = page.replace('/', '');
	try {
		return await Model.PermissionMenu.findAll({
			where: {
				name: { [Model.Sequelize.Op.like]: `%${pageUrl}%` },
				// name: { [Model.Sequelize.Op.like]: `%.%` },
				is_active: true,
			},
			attributes: ['name'],
			include: [{
				model: Model.PermissionUser, as: 'PermissionUsers',
				attributes: ['id'],
				where: {
					is_active: true,
					user_id: userId
				}
			}]
		});
	} catch (error) {
		throw error
	}
}
