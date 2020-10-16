'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.createTable('suppliers', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: 'name_unique',
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: true
			},
			logo: {
				type: Sequelize.STRING,
				allowNull: true
			},
			address: {
				type: Sequelize.TEXT,
				allowNull: true
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

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('suppliers')

	}
};
