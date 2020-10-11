import bcrypt from 'bcrypt'
import Model from '../models'

type userLogin = { email: string, password: string }
type registerNewUser = { name: string, email: string, password: string }

export async function registerNewUser(user: registerNewUser) {
	const t = await Model.sequelize.transaction();
	try {
		const hasPassword = await hashPassword(user.password)
		const newUser = await Model.User.create({
			full_name: user.name,
			email: user.email,
			password: hasPassword,
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
		const user = await Model.User.findOne({ where: { email: login.email } })
		const isMatch = await comparePassword(login.password, user.password)
		if (!user || !isMatch) {
			throw 'User not found'
		}
		return user;

	} catch (error) {
		throw error;
	}
}

export async function hashPassword(password: string) {
	const saltRounds = process.env.SALT_ROUNDS as string;
	return await bcrypt.hash(password, saltRounds)
}

export async function comparePassword(password: string, hashPassword: string) {
	return await bcrypt.compare(password, hashPassword)
}
