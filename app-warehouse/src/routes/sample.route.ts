import express from 'express';
import { auth } from '../middlewares/auth.middleware'

const router = express.Router();

router.get('/sample', auth, (req: any, res, next) => {
	const data = {
		otherData: 'Something Elses dsdssds'
	};
	res.renderVue('pages/main.vue', data, {});

});

export default router;
