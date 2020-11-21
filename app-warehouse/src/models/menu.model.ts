import { Model } from "sequelize";
export default function menuModel(sequelize: any, DataTypes: any) {
	class Menu extends Model {
		static associate(models: any) {
			models.Menu.hasMany(models.MenuSub, {
				foreignKey: 'menu_id',
				as: 'menuSubs'
			})
			models.Menu.hasMany(models.PermissionMenu, {
				foreignKey: 'menu_id',
				as: 'permissionMenus'
			})
		}
	}
	Menu.init(
		{
			code: DataTypes.STRING,
			name: DataTypes.STRING,
			url: DataTypes.STRING,
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
				activeMenu: {
					where: {
						is_active: true
					}
				},
				getSubMenu: {
					include: [
						{
							model: sequelize.models.MenuSub, as: 'menuSubs',
							required: false,
							where: { is_active: true },
							attributes: ['id', 'code', 'name', 'url', 'is_active'], 
						}
					]
				},
				withPermission: {
					include: [
						{
							model: sequelize.models.PermissionMenu, as: 'permissionMenus',
							required: false,
							where: { is_active: true },
							attributes: ['id', 'code', 'name', 'is_active']
						}
					]
				},
			},
			sequelize,
			underscored: true,
			modelName: 'Menu',
			timestamps: true,
			tableName: 'menus',
			deletedAt: 'deleted_at',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			paranoid: true,
		}
	);	
	return Menu;
};
