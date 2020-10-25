module.exports = async (queryInterface, ...tableName) => {
	await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
	for (let index = 0; index < tableName.length; index++) {
		await queryInterface.bulkDelete(tableName[index], null, { truncate: true, restartIdentity: true });
	}
	await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
};

