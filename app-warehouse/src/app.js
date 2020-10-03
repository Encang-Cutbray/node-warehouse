const express = require('express');
const expHbs = require('express-handlebars');

const app = express()

// Setup templete engine, using handlebar 
app.engine('.hbs', expHbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './src/views')

	
app.get('/', async (req, res, next) => {
	res.render('home');
})
module.exports = app
