import bcrypt from 'bcrypt'
import Model from '../models'

export const registerNewuser = async (user: any) => {

	const t = await Model.sequelize.transaction();
	const { name, email, password } = user
	const saltRounds = +process.env.SALT_ROUNDS!;
	try {
		const hasPassword = await bcrypt.hash(password, saltRounds)
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
