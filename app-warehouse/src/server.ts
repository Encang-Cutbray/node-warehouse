import path from 'path'

import { app, sessionStore } from './app'
import { handle404 } from './controllers/error.controller'
import { errorHandler } from './middlewares/error.middleware';

import errorRoute from './routes/error.route';
import authRoute from './routes/auth.route';
import dashboardRoute from './routes/dashboard.route';
import sampleRoute from './routes/sample.route';

import expressVue = require('express-vue');

const expressVueConfig = require('../expressvue.config');

expressVue.use(app, expressVueConfig).then(() => {

	app.use(authRoute);
	app.use(dashboardRoute)
	app.use(errorRoute)
	app.use(sampleRoute)

	app.use(handle404)

	app.use(errorHandler)
	app.listen(process.env.APP_PORT, function () {
		// Generate session table	
		sessionStore.sync()
	})

});

// Setup route
// app.use(authRoute);
// app.use(dashboardRoute)
// app.use(errorRoute)

// app.use(handle404)

// Handler error
// app.use(errorHandler)

// app.listen(process.env.APP_PORT, function () {
// 	// Generate session table	
// 	sessionStore.sync()
// })
