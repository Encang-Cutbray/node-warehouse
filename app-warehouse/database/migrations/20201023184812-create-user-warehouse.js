'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable('warehouse_users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT
			},
			user_id: {
				type: Sequelize.BIGINT,
				references: { model: 'users', key: 'id' }
			},
			warehouse_id: {
				type: Sequelize.BIGINT,
				allowNull: true,
				references: { model: 'warehouses', key: 'id' }
			},
			is_active: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: 1
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: true
			},
			created_by: {
				type: Sequelize.BIGINT,
				allowNull: true,
				references: { model: 'users', key: 'id' }
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: true
			},
			updated_by: {
				type: Sequelize.BIGINT,
				allowNull: true,
				references: { model: 'users', key: 'id' }
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true
			},
			deleted_by: {
				type: Sequelize.BIGINT,
				allowNull: true,
				references: { model: 'users', key: 'id' }
			},
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('warehouse_users')
	}
}
