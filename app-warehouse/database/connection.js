const fs = require('fs');
const env = require('dotenv').config().parsed
module.exports = {
	development: {
		username: env.DB_USER,
		password: env.DB_PASSWORD,
		database: env.DB_DATABASE,
		host: env.HOST,
		port: env.DB_PORT,
		dialect: env.DB_DIALECT,
		dialectOptions: {
			bigNumberStrings: true
		}
	},
	test: {
		username: env.DB_USER,
		password: env.DB_PASSWORD,
		database: env.DB_DATABASE,
		host: env.HOST,
		port: env.DB_PORT,
		dialect: env.DB_DIALECT,
		dialectOptions: {
			bigNumberStrings: true
		}
	},
	production: {
		username: env.DB_USER,
		password: env.DB_PASSWORD,
		database: env.DB_DATABASE,
		host: env.HOST,
		port: env.DB_PORT,
		dialect: env.DB_DIALECT,
		dialectOptions: {
			bigNumberStrings: true,
			ssl: {
				// ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
			}
		}
	}
};
