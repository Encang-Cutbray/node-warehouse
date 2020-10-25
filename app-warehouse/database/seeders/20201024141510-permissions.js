'use strict';
const Model = require('../../dist/models/index').default
const resetForeignKey = require('../reset-foreign-key')

const PERMISSION = [
	'Create',
	'Read',
	'Update',
	'Delete',
	'Import',
	'Export',
	'Print',
]

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await resetForeignKey(queryInterface, 'permissions')

		await Model.sequelize.transaction(async function (t) {
			for (let index = 0; index < PERMISSION.length; index++) {
				await Model.Permission.create({
					code: PERMISSION[index].toLowerCase(),
					name: PERMISSION[index],
					is_active: true,
				}, { transaction: t })
			}
		})
	},

	down: async (queryInterface, Sequelize) => {
		await resetForeignKey(queryInterface, 'permissions')
	}
};
