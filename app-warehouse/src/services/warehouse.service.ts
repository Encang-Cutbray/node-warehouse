import Model from '../models'
import { dateNow } from '../utils/dates.util';
import { deleteFile } from '../utils/upload.utils'
type newWarehouse = { code: string, name: string, logo?: string | null, description: string, userId: Number }
interface userAble {
	[id: string]: any
}
export async function getUserWarehouse() {
	try {
		return await Model.User.findAll({
			attributes: ['id', ['full_name', 'value']],
		})
	} catch (error) {
		throw error
	}
}

export async function getWarehouseById(warehouseId: Number) {
	try {
		return await Model.Warehouse.findOne({
			where: { id: warehouseId, is_active: true },
			attributes: [
				'id', 'name', 'code', 'logo', 'description', 'is_active',
			],
			include: [{
				model: Model.WarehouseUser,
				as: 'WarehouseUsers',
				where: { is_active: true },
				attributes: [
					'id', 'user_id', 'warehouse_id', 'is_active',
				],
				include: [{
					model: Model.User,
					as: 'User',
					attributes: [
						'id', 'full_name',
					],
				}]
			}]
		})
	} catch (error) {
		throw error
	}
}

export async function saveWarehouse(newWarehouse: newWarehouse, userWarehouse: userAble[] = []) {
	const t = await Model.sequelize.transaction();
	try {
		// Create new warehouse
		const warehouse = await Model.Warehouse.create({
			code: newWarehouse.code,
			name: newWarehouse.name,
			logo: newWarehouse.logo || null,
			description: newWarehouse.description,
			is_active: true,
			created_at: dateNow(),
			created_by: newWarehouse.userId
		},
			{
				transaction: t
			})

		// save user warehouse
		for (let index = 0; index < userWarehouse.length; index++) {
			await warehouse.createWarehouseUser({
				user_id: userWarehouse[index].id,
				created_at: dateNow(),
				created_by: warehouse.created_by
			},
				{
					transaction: t
				})
		}

		await t.commit();
		return warehouse;
	} catch (error) {
		console.log(error);
		await t.rollback();
		throw error
	}
}
