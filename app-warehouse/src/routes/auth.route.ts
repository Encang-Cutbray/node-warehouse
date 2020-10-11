import express from 'express';
import { check } from 'express-validator'
import * as authController from '../controllers/auth.controller';
import { auth, guest } from '../middlewares/auth.middleware'
const router = express.Router();

router.get('/login', guest, authController.getLogin);
router.post('/login', guest, authController.postLogin);

router.get('/register', guest, authController.getRegister);
router.post('/register', guest, [
	check('name').notEmpty(),
	check('email').isEmail(),
	check('password').notEmpty()
], authController.postRegister);

router.get('/logout', auth, authController.getLogout);


export default router;
