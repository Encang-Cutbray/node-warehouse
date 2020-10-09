import { Model } from "sequelize";
export default function userModel(sequelize: any, DataTypes: any) {
	class User extends Model {
		static associate(models: any) {
			console.log(models);
			
		}
	}
	User.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "User"
		}
	);
	return User;
};
