'use strict';
const Model = require('../../dist/models/index').default
const resetForeignKey = require('../reset-foreign-key')

module.exports = {
	up: async (queryInterface, Sequelize) => {

		try {
			await Model.sequelize.transaction(async function (t) {
				
				let permission = await Model.Permission.findAll({ transaction: t });
				let menu = await Model.Menu.findAll({ transaction: t });
				await resetForeignKey(queryInterface, 'permission_menus')
				
				for (let i = 0; i < permission.length; i++) {
					for (let j = 0; j < menu.length; j++) {
						let countMenuSubs = await menu[j].countMenuSubs()
						if (countMenuSubs) {
							let menuSubs = await menu[j].getMenuSubs()

							for (let k = 0; k < menuSubs.length; k++) {
								await menuSubs[k].createPermissionMenuSub({
									menu_id: menu[j].dataValues.id,
									permission_id: permission[i].dataValues.id,
									name: `${menuSubs[k].dataValues.code}.${permission[i].dataValues.code}`,
								}, { transaction: t })
							}
						} else {
							await menu[j].createPermissionMenu({
								permission_id: permission[i].dataValues.id,
								name: `${menu[j].dataValues.code}.${permission[i].dataValues.code}`,
								is_active: true
							}, { transaction: t })
						}
					}
				}
			})
		} catch (error) {
			console.log(error);
			await resetForeignKey(queryInterface, 'permission_menus')
		}
	},

	down: async (queryInterface, Sequelize) => {
		await resetForeignKey(queryInterface, 'permission_menus')
	}
};
