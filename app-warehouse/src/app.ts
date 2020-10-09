import path from 'path';
import csurf from 'csurf';
import flash from 'connect-flash';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { csrfToken } from './middlewares/csrf.middleware';
import { shareApp } from './middlewares/share.middleware';

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
app.use(flash())


// Custome middlewares
app.use(csrfToken);
app.use(shareApp);

export default app;
