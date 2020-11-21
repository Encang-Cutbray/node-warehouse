import express from 'express';
import { auth } from '../middlewares/auth.middleware'
import * as accessController from '../controllers/access.controller';

const router = express.Router();

router.get('/access', auth, accessController.getAccess);
router.get('/access/create', auth, accessController.createAccess);

router.post('/access', auth, accessController.postAccess);
router.post('/access/:accessId', auth, accessController.updateAccess);
router.get('/access/:userId/review', auth, accessController.reviewAccesUser);
router.get('/access/:accessId/edit', auth, accessController.editAccess);

export default router;
