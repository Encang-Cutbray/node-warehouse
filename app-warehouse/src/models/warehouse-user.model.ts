import { Model } from "sequelize";
export default function warehouseUser(sequelize: any, DataTypes: any) {
	class WarehouseUser extends Model {
		static associate(models: any) {
			models.WarehouseUser.belongsTo(models.Warehouse, {
				foreignKey: 'warehouse_id',
				as: 'Warehouse'
			})
			models.WarehouseUser.belongsTo(models.User, {
				foreignKey: 'user_id',
				as: 'User'
			})
		}
	};
	WarehouseUser.init({
		user_id: DataTypes.BIGINT,
		warehouse_id: DataTypes.BIGINT,
		is_active: DataTypes.BOOLEAN,
		created_at: DataTypes.DATE,
		created_by: DataTypes.BIGINT,
		updated_at: DataTypes.DATE,
		updated_by: DataTypes.BIGINT,
		deleted_at: DataTypes.DATE,
		deleted_by: DataTypes.BIGINT,
	}, {
		scopes: {
			active: {
				where: {
					is_active: true
				}
			}
		},
		sequelize,
		modelName: 'WarehouseUser',
		underscored: true,
		deletedAt: 'deleted_at',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		paranoid: true,
	});
	return WarehouseUser;
};
