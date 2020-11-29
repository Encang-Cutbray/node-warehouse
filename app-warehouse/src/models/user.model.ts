import { Model } from "sequelize";
export default function userModel(sequelize: any, DataTypes: any) {
	class User extends Model {
		static associate(models: any) {			
			models.User.hasMany(models.Supplier, {
				foreignKey: 'created_by',
				as: 'suppliers'
			})
			models.User.hasMany(models.PermissionUser, {
				foreignKey: 'user_id',
				as: 'permissionUsers'
			})
			models.User.hasMany(models.WarehouseUser, {
				foreignKey: 'user_id',
				as: 'WarehouseUser'
			})
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
			modelName: 'User',
			timestamps: false,
			tableName: 'users'
		}
	);
	return User;
};
