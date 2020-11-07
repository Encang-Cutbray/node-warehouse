import expressVue = require('express-vue');
import methodOverride from 'method-override';

import { app, sessionStore } from './app'
import { handle404 } from './controllers/error.controller'
import { errorHandler } from './middlewares/error.middleware';

import authRoute from './routes/auth.route';
import errorRoute from './routes/error.route';
import sampleRoute from './routes/sample.route';
import dashboardRoute from './routes/dashboard.route';
import supplierRoute from './routes/supplier.route';
import warehouseRoute from './routes/warehouse.route';

const expressVueConfig = require('../expressvue.config');

expressVue.use(app, expressVueConfig).then(() => {

	app.use(methodOverride(function (req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			var method = req.body._method
			delete req.body._method
			return method
		}
	}))

	app.use(authRoute);
	app.use(dashboardRoute)
	app.use(supplierRoute)
	app.use(warehouseRoute)

	app.use(sampleRoute)

	app.use(errorRoute)
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
