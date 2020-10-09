import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/database.json")[env];
const db: any = {};

let sequelize: Sequelize.Sequelize;
// if (config.use_env_variable) {
// 	sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
// 	sequelize = new Sequelize(
// 		config.database,
// 		config.username,
// 		config.password,
// 		config
// 	);
// }

sequelize = new Sequelize.Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach(file => {
		const models = import(path.join(__dirname, file));
		models
			.then(result => {
				return result.default
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