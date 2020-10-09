import { Model } from "sequelize";
export default function userModel(sequelize: any, DataTypes: any) {
	class User extends Model {
		static associate(models: any) {
			console.log(models);
		}
	}
	User.init(
		{
			full_name: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				validate: { isEmail: true }
			},
			password: DataTypes.STRING,
			created_at: DataTypes.DATE,
			updated_at: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "User",
			timestamps: false,
			tableName: 'users'
		}
	);
	return User;
};
