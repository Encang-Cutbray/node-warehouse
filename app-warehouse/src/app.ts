import express from 'express'
import path from 'path'
import authRoute from './routes/auth.route'

const app = express()
const customeView = path.resolve(__dirname, '..', 'views')

app.set('views', customeView);
app.set('view engine', 'ejs');

// Static assets
app.use(express.static(path.join(__dirname, '..','assets')));

// Setup route
app.use(authRoute);


app.get('/', (req, res, next) => {
	console.log('eee');
	res.render('layouts/sample');
})


export default app
