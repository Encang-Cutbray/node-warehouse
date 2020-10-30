const path = require('path');
module.exports = {
	vueOptions: "2.4.2",
	pagesPath: path.resolve(__dirname, 'views-vue'),
	head: {
		styles: [
			{ style: '/css/style.css' },
			{ style: '/css/style-custome.css' }
		],
		scripts: [
			{ src: '/js/jquery.js' },
			{ src: '/js/main.js' }
		]
	},
	data: {
		config: {
			isAuth: false,
			userLogin: null,
			leftNavMenu: [],
		},

	}
}

