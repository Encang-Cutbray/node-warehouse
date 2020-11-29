import express from 'express';
import multer from 'multer'

import { multerStorage, fileType } from '../utils/upload.utils'

import { auth } from '../middlewares/auth.middleware'
import { isAuthorize } from '../middlewares/authorize.middleware'
import { check, body } from 'express-validator'

import * as warehouseController from '../controllers/warehouse.controller';

const router = express.Router();
const upload = multer({
	storage: multerStorage('warehouse'),
	fileFilter: fileType
})
const validations = [
	check('logo', 'Please upload logo warehouse')
		.custom((value, { req }) => {
			return true;
		}),
	body('code', 'Warehouse code is required').trim().notEmpty(),
	body('name', 'Warehouse name is required').trim().notEmpty(),
	body('users', 'users required').trim().notEmpty(),
	body('description').trim()
];
router.get('/warehouse', auth, isAuthorize('warehouse.read'), warehouseController.getWarehouse);
router.get('/warehouse/create', auth, isAuthorize('warehouse.read', 'warehouse.create'), warehouseController.createWarehouse);

router.post('/warehouse/post',
	auth,
	isAuthorize('warehouse.read', 'warehouse.create'),
	upload.single('logo'),
	validations,
	warehouseController.postWarehouse);

router.get('/warehouse/:warehouseId/review', auth, isAuthorize('warehouse.read'), warehouseController.reviewWarehouse);

router.post('/warehouse/:warehouseId/update',
	auth,
	isAuthorize('warehouse.read', 'warehouse.update'),
	upload.single('logo'),
	validations,
	warehouseController.updateWarehouse);

export default router;
