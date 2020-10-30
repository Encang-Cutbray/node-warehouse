import express from 'express';
import { check } from 'express-validator'
import { auth, guest } from '../middlewares/auth.middleware'
import * as supplierController from '../controllers/supplier.controller';

const router = express.Router();

const validations = [
	check('supplierName', 'Supplier name is required').notEmpty(),
	check('phone', 'Phone is required').notEmpty(),
	check('email', 'email is required').isEmail(),
	check('address', 'address is required').notEmpty()
];
router.get('/supplier', auth, supplierController.getSupplier);
router.get('/supplier/create', auth, supplierController.createSupplier);
router.post('/supplier/post', auth, validations, supplierController.postSupplier);
router.get('/supplier/:supplierId/review', auth, supplierController.reviewSupplier);
router.post('/supplier/:supplierId/update', auth, validations, supplierController.updateSupplier);

export default router;
