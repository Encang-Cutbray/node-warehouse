const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path')

const app = express()
const authRoute = require('./routes/auth.route')

// Setup templete engine, using handlebar 
var hbs = expHbs.create({
	extname: '.hbs',
	partialsDir: `${__dirname}/views/partials`,
	helpers: {
		originalUrl: function () { return 'FOO!'; },
		bar: function () { return 'BAR!'; },
		isActiveURL: function (req, url) { return (req.originalUrl == url) ? true : null; }
	}
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './src/views')

// Static assets
app.use(express.static(path.join(__dirname, 'assets')));

// Setup route
app.use(authRoute);


app.get('/', (req, res, next) => {
	res.render('home');
})


module.exports = app
