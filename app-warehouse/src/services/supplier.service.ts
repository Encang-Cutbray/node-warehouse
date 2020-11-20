import Model from '../models'
import { dateNow } from '../utils/dates.util';
import { deleteFile } from '../utils/upload.utils'
type newSupplier = { phone: string, supplierName: string, email: string, address: string, logo?: string | null, userId: Number }

export async function updateSupplierById(id: any, dataUpdate: newSupplier) {
	try {
		const supplier = await findSupplierById(id)
		// Delete supplier logo 
		if (dataUpdate.logo) {
			await deleteFile(supplier.logo)
		}
		supplier.name = dataUpdate.supplierName
		supplier.phone = dataUpdate.phone
		supplier.email = dataUpdate.email
		supplier.address = dataUpdate.address
		supplier.logo = dataUpdate.logo ? dataUpdate.logo : supplier.logo
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
			logo: newSupplier.logo,
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

export async function getAllSupplier(page: number, perPage: number = 5, ...search: any) {
	const t = await Model.sequelize.transaction();

	const offset = page == 1 ? 0 : (page - 1) * perPage;
	try {
		const supplier = await Model.Supplier.findAndCountAll({
			where: searchSupplier(search[0]),
			limit: perPage,
			offset: offset,
			attributes: ['id', 'name', 'phone', 'email', 'address']
		}, { transaction: t })
		await t.commit();
		return supplier
	} catch (error) {
		await t.rollback();
		throw error
	}
}

function searchSupplier(search: any = {}) {
	var whereStatement: any = {};
	if (search.name) {
		whereStatement.name = {
			[Model.Sequelize.Op.or]: {
				[Model.Sequelize.Op.like]: `%${search.name}%`
			},
		}
	}

	if (search.phone) {
		whereStatement.phone = {
			[Model.Sequelize.Op.or]: {
				[Model.Sequelize.Op.like]: `%${search.phone}%`
			},
		}
	}

	if (search.email) {
		whereStatement.email = {
			[Model.Sequelize.Op.or]: {
				[Model.Sequelize.Op.like]: `%${search.email}%`
			},
		}
	}
	return whereStatement
}
