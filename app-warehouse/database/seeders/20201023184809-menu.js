'use strict';
const Model = require('../../dist/models/index').default


module.exports = {
	up: async (queryInterface, Sequelize) => {
		try {
			console.log(Sequelize.Menu);
			await Model.sequelize.transaction(async function (t) {
				var menu = await Model.Menu.create({
					code: 'Primary Menu',
					name: 'Primary Menu',
					url: 'Primary Menu',
				}, { transaction: t })
				for (let index = 0; index < 10; index++) {
					await menu.createMenuSub({
						code: 'Primary Menu',
						name: 'Primary Menu',
						url: 'Primary Menu',
					}, { transaction: t })
				}
			})
		} catch (error) {
			console.log(error);
		}
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('menu_subs', null, {});
		return queryInterface.bulkDelete('menus', null, {});
	}
};
