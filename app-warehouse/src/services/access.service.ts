import Model from '../models'

export async function getAccessMenu() {
	try {
		const t = await Model.sequelize.transaction();
		return await Model.PermissionMenu.scope('activePermission').findAll({
			raw: true,
		}, { transaction: t })
	} catch (error) {
		throw error
	}
}
