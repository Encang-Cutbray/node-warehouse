import { Model } from "sequelize";
export default function permissionMenu(sequelize: any, DataTypes: any) {
	class PermissionMenu extends Model {
		static associate(models: any) {
		}
	}
	PermissionMenu.init(
		{
			menu_id: DataTypes.BIGINT,
			menu_sub_id: DataTypes.BIGINT,
			permission_id: DataTypes.BIGINT,
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
			modelName: 'PermissionMenu',
			tableName: 'permission_menus',
			timestamps: false,
			underscored: true,
			deletedAt: 'deleted_at',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			paranoid: true,
		}
	);
	return PermissionMenu;
};
