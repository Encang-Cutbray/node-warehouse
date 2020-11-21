import { Model } from "sequelize";
export default function permission(sequelize: any, DataTypes: any) {
	class Permission extends Model {
		static associate(models: any) {
			models.Permission.hasMany(models.PermissionMenu, {
				foreignKey: 'permission_id',
				as: 'PermissionMenus'
			})
		}
	}
	Permission.init(
		{
			code: DataTypes.STRING,
			name: DataTypes.STRING,
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
			modelName: 'Permission',
			tableName: 'permissions',
			timestamps: true,
			underscored: true,
			deletedAt: 'deleted_at',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			paranoid: true,
		}
	);
	return Permission;
};
