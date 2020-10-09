import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.route';
import models from './models/index';
import { csrfToken } from './middlewares/csrf.middleware';
import { expressSession } from './middlewares/session.middleware';

const app = express();

// Static assets
app.use(express.static(path.join(__dirname, '..', 'assets')));

// views path
app.set('views', path.resolve(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// package middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csurf({ cookie: true }));

// Custome middlewares
app.use(csrfToken);
app.use(expressSession);

// Setup route
app.use(authRoute);

// Sample page
app.get('/', async (req, res, next) => {
	const user = await models.User.findAll();
	console.log(user);
	
	res.render('samples/sample-page');
});

export default app;
