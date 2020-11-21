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
		const t = await Model.sequelize.transaction();
		let User = await Model.User.findAll({ raw: true, attributes: ['id', 'full_name', 'email'] },
			{ transaction: t })
		await t.commit();
		return User
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

export async function hashPassword(password: string) {
	const saltRounds = process.env!.SALT_ROUNDS as string;
	return await bcrypt.hash(password, parseInt(saltRounds))
}

export async function comparePassword(password: string, hashPassword: string) {
	return await bcrypt.compare(password, hashPassword)
}
