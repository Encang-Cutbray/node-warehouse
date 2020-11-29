import Model from '../models'
export async function getUserWarehouse() {
	try {
		return await Model.User.findAll({
			attributes: ['id', ['full_name', 'value']],
		})
	} catch (error) {
		throw error
	}
}
