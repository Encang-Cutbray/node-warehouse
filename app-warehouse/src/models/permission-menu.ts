import { Model } from "sequelize";

export default function permissionMenu(sequelize: any, DataTypes: any) {
	class PermissionMenu extends Model {
		static associate(models: any) {
			models.PermissionMenu.belongsTo(models.Menu, {
				foreignKey: 'menu_id',
				as: 'Menu'
			})
			models.PermissionMenu.belongsTo(models.MenuSub, {
				foreignKey: 'menu_sub_id',
				as: 'MenuSub'
			})
			models.PermissionMenu.belongsTo(models.Permission, {
				foreignKey: 'permission_id',
				as: 'Permission'
			})
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
			scopes: {
				activePermission: {
					where: {
						is_active: true
					}
				},
				withMenu: {
					include: [
						{
							model: sequelize.models.Menu, as: 'Menu',
							required: false,
							where: { is_active: true },
							attributes: ['id', 'code', 'name', 'url', 'is_active']
						},
						{
							model: sequelize.models.MenuSub, as: 'MenuSub',
							required: false,
							where: { is_active: true },
							attributes: ['id', 'code', 'name', 'url', 'is_active']
						}
					]
				},
			},
			sequelize,
			modelName: 'PermissionMenu',
			tableName: 'permission_menus',
			timestamps: false,
			underscored: true,
			deletedAt: 'deleted_at',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			paranoid: true,
		},
	);
	return PermissionMenu;
};
