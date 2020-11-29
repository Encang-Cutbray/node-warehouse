'use strict';


module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('warehouses', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT
			},
			code: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			logo: {
				allowNull: true,
				type: Sequelize.STRING
			},
			description: {
				allowNull: true,
				type: Sequelize.TEXT
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
		return queryInterface.dropTable('warehouses')
	}
}
