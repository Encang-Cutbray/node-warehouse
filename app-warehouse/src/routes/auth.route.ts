import express from 'express'
import * as authController from '../controllers/auth.controller'
import {expressSession} from '../middlewares/session.middleware'

const router = express.Router();

router.use(expressSession)
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

export default router
