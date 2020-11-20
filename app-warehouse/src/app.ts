import path from 'path';
import csurf from 'csurf';
import dotEnv from 'dotenv'
import express from 'express';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import session from 'express-session';
import methodOverride from 'method-override';
import SessionSequelize from 'connect-session-sequelize';
import paginate from 'express-paginate'

import { shareApp, csrfToken } from './middlewares/share.middleware';
import database from './models/index'

const app = express();

// dotenv config
dotEnv.config()

// session config
const SequelizeStore: any = SessionSequelize(session.Store)
database.sequelize.options['logging'] = false
const sessionStore: any = new SequelizeStore({
	db: database.sequelize,
	// checkExpirationInterval: 15 * 60 * 1000,
	// expiration: 7 * 24 * 60 * 60 * 1000
});

// Static assets
app.use(express.static(path.join(__dirname, '..', 'assets')));

// views path
app.set('views', path.resolve(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// package middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	resave: false,
	saveUninitialized: false,
	name: process.env.SESSION_NAME,
	secret: process.env.SESSION_SECRET as string,
	store: sessionStore
}))
app.use(flash())
app.use(csurf());

app.use(paginate.middleware(10, 50));

// Custome middlewares
app.use(csrfToken);
app.use(shareApp);
app.use(methodOverride('X-HTTP-Method-Override'));

// app.use(methodOverride(function (req, res) {
// 	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
// 		var method = req.body._method
// 		delete req.body._method
// 		return method
// 	}
// }))


export {
	app, sessionStore, paginate
};
