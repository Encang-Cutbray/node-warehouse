'use strict';
const Model = require('../../dist/models/index').default
const resetForeignKey = require('../reset-foreign-key')
const leftNav = require('../left-nav')

module.exports = {
	up: async (queryInterface, Sequelize) => {
		try {
			await resetForeignKey(queryInterface, 'menu_subs', 'menus')
			
			await Model.sequelize.transaction(async function (t) {
				for (let index = 0; index < leftNav.menu.length; index++) {

					let menu = leftNav.menu[index]

					var nav = await Model.Menu.create({
						code: menu.code.toLowerCase(),
						name: menu.name,
						url: menu.url,
					}, { transaction: t })

					if (menu.subMenu != undefined) {
						for (let i = 0; i < menu.subMenu.length; i++) {
							await nav.createMenuSub({
								code: menu.subMenu[i].code.toLowerCase(),
								name: menu.subMenu[i].name,
								url: menu.subMenu[i].url,
							}, { transaction: t })
						}
					}

				}
			})
		} catch (error) {
			await resetForeignKey(queryInterface, 'menu_subs', 'menus')
		}
	},

	down: async (queryInterface, Sequelize) => {
		await resetForeignKey(queryInterface, 'menu_subs', 'menus')
	}
};
