import { app, sessionStore } from './app'
import errorRoute from './routes/error.route';
import authRoute from './routes/auth.route';
import dashboardRoute from './routes/dashboard.route';
import { errorHandler } from './middlewares/error.middleware';

// Setup route
app.use(authRoute);
app.use(dashboardRoute)
app.use(errorRoute)

// Handler error
app.use(errorHandler)

app.listen(process.env.APP_PORT, function () {
	// Generate session table	
	sessionStore.sync()
})
