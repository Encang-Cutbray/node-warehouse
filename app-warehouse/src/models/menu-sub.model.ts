import { Model } from "sequelize";
export default function menuSubModel(sequelize: any, DataTypes: any) {
	class MenuSub extends Model {
		static associate(models: any) {
			models.MenuSub.hasMany(models.PermissionMenu, {
				foreignKey: 'menu_sub_id',
				as: 'permissionMenuSubs'
			})
		}
	}
	MenuSub.init(
		{
			menu_id: DataTypes.BIGINT,
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
			sequelize,
			underscored: true,
			modelName: 'MenuSub',
			timestamps: true,
			tableName: 'menu_subs',
			paranoid: true,
			deletedAt: 'deleted_at',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		}
	);
	return MenuSub;
};
