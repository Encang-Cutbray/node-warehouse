import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotEnv from 'dotenv';

const db: any = {};
const configure = dotEnv.config().parsed;

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.json')[env];

let sequelize: Sequelize.Sequelize;

// Setup connection ih here
if (configure!.ENV == 'production') {
	sequelize = new Sequelize.Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
} else {
	sequelize = new Sequelize.Sequelize(
		configure!.DB_DATABASE,
		configure!.DB_USER,
		configure!.DB_PASSWORD,
		{
			port: +configure!.DB_PORT,
			dialect: configure!.DB_DIALECT as Sequelize.Dialect,
			host: configure!.DB_HOST
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
		const models = import(path.join(__dirname, file));
		models
			.then(result => {
				return result.default;
			})
			.then(kopi => {
				var model = kopi(sequelize, Sequelize.DataTypes);
				db[model.name] = model;
			})
			.catch();
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize.Sequelize;

export default db;
