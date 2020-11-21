import Model from '../models'

export async function getAccessMenu() {
	try {
		const access = await Model.PermissionMenu.scope('activePermission')
			.findAll({
				raw: true,
			})
		return access
	} catch (error) {
		throw error
	}
}
