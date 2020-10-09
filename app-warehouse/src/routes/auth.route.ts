import express from 'express';
import { check } from 'express-validator'
import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegister);
router.post('/register', [
	check('name').notEmpty(),
	check('email').isEmail(),
	check('password').notEmpty()
], authController.postRegister);

export default router;
