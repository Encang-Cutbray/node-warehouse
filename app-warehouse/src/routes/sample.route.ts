import express from 'express';
import { auth } from '../middlewares/auth.middleware'

const router = express.Router();

router.get('/sample', auth, (req: any, res, next) => {
	const data = {
		otherData: 'Data from backend'
	};
	res.renderVue('pages/sample/sample.vue', data, {});

});

export default router;
