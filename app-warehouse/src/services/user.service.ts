import bcrypt from 'bcrypt'
import Model from '../models'

export const registerNewUser = async (user: any) => {
	const t = await Model.sequelize.transaction();
	const { name, email, password } = user
	try {
		const hasPassword = await hashPassword(password)
		const newUser = await Model.User.create({
			full_name: name,
			email: email,
			password: hasPassword,
		}, { transaction: t })
		await t.commit();
		return newUser
	} catch (error) {
		await t.rollback();
		throw Error(error)
	}
}

export async function hashPassword(password: string) {
	const saltRounds = +process.env.SALT_ROUNDS!;
	return await bcrypt.hash(password, saltRounds)
}

export async function comparePassword(password: string, hashPassword: string) {
	return await bcrypt.compare(password, hashPassword)
}
