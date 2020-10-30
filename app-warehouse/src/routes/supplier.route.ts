import express from 'express';
import { check, body } from 'express-validator'
import { auth, guest } from '../middlewares/auth.middleware'
import * as supplierController from '../controllers/supplier.controller';

const router = express.Router();

const validations = [
	body('supplierName', 'Supplier name is required').trim().not().isEmpty(),
	check('phone', 'Phone is required').trim().not().isEmpty(),
	check('email', 'email is invalid').trim().isEmail(),
	check('address', 'address is required').trim().notEmpty()
];
router.get('/supplier', auth, supplierController.getSupplier);
router.get('/supplier/create', auth, supplierController.createSupplier);
router.post('/supplier/post', auth, validations, supplierController.postSupplier);
router.get('/supplier/:supplierId/review', auth, supplierController.reviewSupplier);
router.post('/supplier/:supplierId/update', auth, validations, supplierController.updateSupplier);

export default router;
