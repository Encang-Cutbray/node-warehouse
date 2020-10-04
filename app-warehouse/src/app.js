const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path')

const app = express()

// Setup templete engine, using handlebar 
app.engine('.hbs', expHbs({
	extname: '.hbs',
	// partialsDir: `${__dirname}/views/partials`,
}));
app.set('view engine', '.hbs');
app.set('views', './src/views')
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', async (req, res, next) => {
	res.render('home');
})
module.exports = app