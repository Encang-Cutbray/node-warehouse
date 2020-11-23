import bcrypt from 'bcrypt'
import Model from '../models'
import { dateNow } from '../utils/dates.util';

type userLogin = { email: string, password: string }
type registerNewUser = { name: string, email: string, password: string }

export async function registerNewUser(user: registerNewUser) {
	const t = await Model.sequelize.transaction();
	try {
		const userExists = await Model.User.findOne({ where: { email: user.email } })
		if (userExists) {
			throw 'Email is exists'
		}
		const hasPassword = await hashPassword(user.password)
		const newUser = await Model.User.create({
			full_name: user.name,
			email: user.email,
			password: hasPassword,
			created_at: dateNow()
		}, { transaction: t })
		await t.commit();
		return newUser
	} catch (error) {
		await t.rollback();
		throw error
	}
}

export async function loginUser(login: userLogin) {
	try {
		const user = await Model.User.findOne({
			where: { email: login.email },
			attributes: ['id', 'full_name', 'email', 'password']
		})

		if (!user) {
			throw 'User not found'
		}

		const isMatch = await comparePassword(login.password, user.password)

		if (!isMatch) {
			throw 'User not found'
		}

		return user;

	} catch (error) {
		throw error;
	}
}

export async function getUser() {
	try {
		let User = await Model.User.findAll({
			raw: true,
			attributes: ['id', 'full_name', 'email']
		})
		return User
	} catch (error) {
		throw error;
	}
}

export async function getPermissionUser(user: typeof Model) {
	try {
		return await user.getPermissionUsers({
			raw: true,
			where: { is_active: true },
			attributes: ['id', 'menu_permissions_id', 'user_id']
		})
	} catch (error) {
		throw error;
	}
}

export async function findUserById(id: number) {
	try {
		let User = await Model.User.findOne({
			where: { id: id },
			attributes: ['id', 'full_name', 'email']
		})
		return User
	} catch (error) {
		throw error;
	}
}

export async function savePermissionUser(user: typeof Model, permission: any) {
	const t = await Model.sequelize.transaction();
	try {
		for (let index = 0; index < permission.length; index++) {
			let permissionUser = await Model.PermissionUser.findOne({
				where: { menu_permissions_id: permission[index].id, user_id: user.id }
			})
			if (permissionUser) {
				await permissionUser.update({
					is_active: permission[index].checked,
					updated_at: dateNow(),
					updated_by: user.id
				}, { transaction: t })
			}
			else {
				await Model.PermissionUser.create({
					menu_permissions_id: permission[index].id,
					user_id: user.id,
					is_active: permission[index].checked,
					created_at: dateNow(),
					created_by: user.id
				}, { transaction: t })
			}
		}

		await t.commit();
		await Model.PermissionUser.destroy({
			where: { is_active: false, user_id: user.id, }
		})

		return await user.getPermissionUsers()

	} catch (error) {
		await t.rollback();
		console.log(error);
		throw error
	}
}



export async function hashPassword(password: string) {
	const saltRounds = process.env!.SALT_ROUNDS as string;
	return await bcrypt.hash(password, parseInt(saltRounds))
}

export async function comparePassword(password: string, hashPassword: string) {
	return await bcrypt.compare(password, hashPassword)
}
