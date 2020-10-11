import express from 'express';
import { check } from 'express-validator'
import * as authController from '../controllers/auth.controller';
import { auth, guest } from '../middlewares/auth.middleware'
const router = express.Router();

router.get('/login', guest, authController.getLogin);

router.post('/login', guest, [
	check('email', 'email is required').isEmail(),
	check('password', 'password is required').notEmpty()
], authController.postLogin);

router.get('/register', guest, authController.getRegister);

router.post('/register', guest, [
	check('name', 'name is required').notEmpty(),
	check('email', 'email is invalid').isEmail(),
	check('password', 'password is required').notEmpty(),
	check('confirm', 'confirm password not match').custom((value, { req }) => {
		if (req.body.password !== value) {
			return false
		}
		return true
	})
], authController.postRegister);

router.get('/forgot-password', guest, authController.getForgotPassword);

router.post('/forgot-password', guest, [
	check('email', 'email is invalid').isEmail()
], authController.postForgotPassword);

router.get('/logout', auth, authController.getLogout);

export default router;
