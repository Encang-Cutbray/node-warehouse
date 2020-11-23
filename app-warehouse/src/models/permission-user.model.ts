import { Model } from "sequelize";
export default function permissionUser(sequelize: any, DataTypes: any) {
	class PermissionUser extends Model {
		static associate(models: any) {
			models.PermissionUser.belongsTo(models.PermissionMenu, {
				foreignKey: 'menu_permissions_id',
				as: 'PermissionMenu'
			})
			models.PermissionUser.belongsTo(models.User, {
				foreignKey: 'user_id',
				as: 'User'
			})
		}
	}
	PermissionUser.init(
		{
			menu_permissions_id: DataTypes.BIGINT,
			user_id: DataTypes.BIGINT,
			is_active: DataTypes.BOOLEAN,
			created_at: DataTypes.DATE,
			created_by: DataTypes.BIGINT,
			updated_at: DataTypes.DATE,
			updated_by: DataTypes.BIGINT,
			deleted_at: DataTypes.DATE,
			deleted_by: DataTypes.BIGINT,
		},
		{
			sequelize,
			modelName: 'PermissionUser',
			tableName: 'permission_users',
			timestamps: false,
			underscored: true,
			deletedAt: 'deleted_at',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			paranoid: true,
		}
	);
	return PermissionUser;
};
