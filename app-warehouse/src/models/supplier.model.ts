import { Model } from "sequelize";
export default function supplierModel(sequelize: any, DataTypes: any) {
	class Supplier extends Model {
		static associate(models: any) {
			models.Supplier.belongsTo(models.User, {
				foreignKey: 'created_by',
				as: 'user'
			})
		}
	}
	Supplier.init(
		{
			name: DataTypes.STRING,
			phone: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				validate: { isEmail: true }
			},
			logo: DataTypes.STRING,
			address: DataTypes.STRING,
			created_at: DataTypes.DATE,
			created_by: DataTypes.BIGINT,
			updated_at: DataTypes.DATE,
			updated_by: DataTypes.BIGINT,
			deleted_at: DataTypes.DATE,
			deleted_by: DataTypes.BIGINT,
		},
		{
			sequelize,
			modelName: 'Supplier',
			tableName: 'suppliers',
			timestamps: false,
			// underscored: true,
			deletedAt: 'deleted_at',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			paranoid: true,
		}
	);
	return Supplier;
};
