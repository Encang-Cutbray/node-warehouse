import app from './app'
import authRoute from './routes/auth.route';

// Setup route
app.use(authRoute);

// Sample page
app.get('/', async (req, res, next) => {
	res.render('samples/sample-page');
});
app.listen(3400)
