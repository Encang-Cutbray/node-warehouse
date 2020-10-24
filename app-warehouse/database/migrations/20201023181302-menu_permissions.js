'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('menu_permissions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT
			},
			menu_id: {
				type: Sequelize.BIGINT,
				allowNull: true,
				references: { model: 'menus', key: 'id' }
			},
			menu_sub_id: {
				type: Sequelize.BIGINT,
				allowNull: true,
				references: { model: 'menu_subs', key: 'id' }
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
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
			}
		})
	},

  down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('menu_permissions')
  }
};
