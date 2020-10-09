import app from './app'
import errorRoute from './routes/error.route';
import authRoute from './routes/auth.route';
import { errorHandler } from './middlewares/error.middleware';

// Setup route
app.use(authRoute);
app.use(errorRoute)

// Sample page
app.get('/', async (req, res, next) => {
	res.render('samples/sample-page');
});

app.use(errorHandler)

app.listen(3400)
