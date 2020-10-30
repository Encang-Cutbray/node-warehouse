import Model from '../models'
import { dateNow } from '../utils/dates.util';
type newSupplier = { phone: string, supplierName: string, email: string, address: string, userId: Number }

export async function updateSupplierById(id: any, dataUpdate: newSupplier) {
	try {
		const supplier = await findSupplierById(id)
		supplier.name = dataUpdate.supplierName
		supplier.phone = dataUpdate.phone
		supplier.email = dataUpdate.email
		supplier.address = dataUpdate.address
		supplier.updated_at = dateNow()
		supplier.updated_by = dataUpdate.userId
		return await supplier.save()
	} catch (error) {
		throw error
	}
}

export async function findSupplierById(id: any) {
	try {
		const supplier = await Model.Supplier.findByPk(id)
		return supplier
	} catch (error) {
		throw error
	}
}
export async function createSupplier(newSupplier: newSupplier) {
	const t = await Model.sequelize.transaction();
	try {
		const supplier = await Model.Supplier.create({
			name: newSupplier.supplierName,
			phone: newSupplier.phone,
			email: newSupplier.email,
			address: newSupplier.address,
			created_at: dateNow(),
			created_by: newSupplier.userId,

		}, { transaction: t })
		await t.commit();
		return supplier
	} catch (error) {
		await t.rollback();
		throw error
	}
}

export async function getAllSupplier() {
	const t = await Model.sequelize.transaction();
	try {
		const supplier = await Model.Supplier.findAndCountAll({
			offset: 0, limit: 10,
			attributes: ['id', 'name', 'phone', 'email', 'address']
		}, { transaction: t })
		await t.commit();		
		return supplier
	} catch (error) {
		await t.rollback();
		throw error
	}
}
