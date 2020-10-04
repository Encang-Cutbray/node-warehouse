exports.getLogin = (req, res, next) => {
	return res.render('auth/login', {
		path: (req.originalUrl === '/login') ? true : false,
		kopi: 'Hitam',
		// helpers: {
		// 	originalUrl: function () { return '/login' },
		// 	isActiveURL: function () {
		// 		const result = (req.originalUrl == '/login') ? true : false;
		// 		console.log(result);
		// 		return result
		// 	}
		// }
	})
};

exports.postLogin = (req, res, next) => {
	res.json('Post Login')
};

exports.getRegister = (req, res, next) => {
	return res.render('auth/register', {
		// helpers: {
		// 	originalUrl: function () { return '/register' },
		// 	isActiveURL: function () {
		// 		const result = (req.originalUrl == '/register') ? true : false;
		// 		console.log(result);
		// 		return result
		// 	}
		// },
	})

};

exports.postRegister = (req, res, next) => {
	res.json('Post Register')
};
