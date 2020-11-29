import { Model } from "sequelize";
export default function warehouse(sequelize: any, DataTypes: any) {
	class Warehouse extends Model {
		static associate(models: any) {
			models.Warehouse.hasMany(models.WarehouseUser, {
				foreignKey: 'warehouse_id',
				as: 'WarehouseUser'
			})
		}
	};
	Warehouse.init({
		name: DataTypes.STRING,
		code: DataTypes.STRING,
		logo: DataTypes.STRING,
		description: DataTypes.TEXT,
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
		modelName: 'Warehouse',
		underscored: true,
		deletedAt: 'deleted_at',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		paranoid: true,
	});
	return Warehouse;
};
