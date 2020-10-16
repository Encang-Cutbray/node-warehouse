import fs from 'fs';
import path from 'path';
import dotEnv from 'dotenv'
import Sequelize from 'sequelize';

const env = dotEnv.config().parsed!
const basename = path.basename(__filename);
const connection = require('../../database/connection')[env.APP_MODE]
const db: any = {};

let sequelize: Sequelize.Sequelize;

if (env.APP_MODE == 'production') {
	sequelize = new Sequelize.Sequelize(
		connection.database,
		connection.username,
		connection.password,
		{
			port: connection.port,
			dialect: connection.dialect as Sequelize.Dialect,
			dialectOptions: {
				bigNumberStrings: true
			}
		}
	);
} else {
	sequelize = new Sequelize.Sequelize(
		connection.database,
		connection.username,
		connection.password,
		{
			port: connection.port,
			dialect: connection.dialect as Sequelize.Dialect,
			dialectOptions: {
				bigNumberStrings: true
			}
		}
	);
}

fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		);
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file)).default(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize.Sequelize;

export default db;
