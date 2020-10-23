const path = require('path');
let dataExternal = {}

module.exports = {
	setData: function (data = {}) {
		// console.log(this.data);
		dataExternal = data
		this.data = dataExternal
		// console.log(this.data);
		return this
	},
	getData: function () { 
		return this.data
	},
	vueOptions: "2.4.2",
	pagesPath: path.resolve(__dirname, 'views-vue'),
	head: {
		styles: [
			{ style: '/css/style.css' }
		],
		scripts: [
			{
				src: '/js/jquery.js'
			},
			{
				src: '/js/main.js'
			}
		]
	},
	data: dataExternal,
	// data: {
	// 	isAuth: true,
	// 	foo: true,
	// 	bar: 'yes',
	// 	qux: {
	// 		id: 123,
	// 		baz: 'anything you wish, you can have any kind of object in the data object, it will be global and on every route'
	// 	}
	// }
}

