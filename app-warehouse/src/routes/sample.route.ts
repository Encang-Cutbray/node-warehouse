import express from 'express';
import { auth } from '../middlewares/auth.middleware'

const expressVueConfig = require('../../expressvue.config');

const router = express.Router();

router.get('/sample', auth, (req: any, res, next) => {
	// const data = {
	// 	otherData: 'Something Elses dsdssds'
	// };
	console.log(req.vueOptions);
	req.vueOptions = {
		data: {kopi: 'ABC'},
		head: {
			title: 'Page Title',
				metas: [
					{ property: 'og:title', content: 'Page Title' },
					{ name: 'twitter:title', content: 'Page Title' },
				]
		}
	}

	res.renderVue('pages/main.vue', res.locals, req.vueOptions);

});

export default router;
